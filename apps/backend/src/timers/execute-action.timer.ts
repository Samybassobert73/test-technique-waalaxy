import { inject, injectable } from 'tsyringe';
import CreditService from '../services/credit.service';
import ActionService from '../services/action.service';
import { io } from '../websocket/websocket';
import BaseTimer from './base.timer';
@injectable()
export default class ExecuteActionTimer extends BaseTimer {

	DECREMENT_CREDIT_MESSAGE:string = 'decrement-credit';
	REMOVE_ACTION_MESSAGE:string = 'remove-action';

	private creditService:CreditService;
	private actionService:ActionService;
	constructor(
		@inject(CreditService)creditService:CreditService,
        @inject(ActionService)actionService:ActionService,	
	){
		super();
		this.creditService = creditService;
		this.actionService = actionService;
	}

	execute = async ():Promise<void> => {
		let action = await this.actionService.aggregate([
			{
			  $lookup: {
				from: 'credits',
				localField: 'credit', 
				foreignField: '_id', 
				as: 'credit' 
			  }
			},
			{ $unwind: '$credit' }, 
			{ $match: { 'credit.value': { $gt: 0 } } }, 
			{ $limit: 1 } 
		  ]);

		if (action && action.length > 0){
			const removedAction = await this.actionService.delete(action[0]._id) 
			if (removedAction) {
				io.emit(this.REMOVE_ACTION_MESSAGE.toString(), JSON.stringify(removedAction) );
				const credit = await this.creditService.getById(removedAction.credit.toString())
				if (credit) {
					const updatedcredit = await this.creditService.decrementCredit(credit)	
					io.emit(this.DECREMENT_CREDIT_MESSAGE.toString(), JSON.stringify(updatedcredit) );
				}
			}
		}
        
	}

} 