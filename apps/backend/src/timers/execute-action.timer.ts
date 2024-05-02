import { inject, injectable } from 'tsyringe';
import CreditService from '../services/credit.service';
import ActionService from '../services/action.service';
import { io } from '../websocket/websocket';
import ActionSI from '../interfaces/action.interface';
@injectable()
export default class ExecuteActionTimer {

	DECREMENT_CREDIT_MESSAGE:string = 'decrement-credit';
	REMOVE_ACTION_MESSAGE:string = 'remove-action';

	constructor(
		@inject(CreditService)private creditService:CreditService,
        @inject(ActionService)private actionService:ActionService,	
	){}

	init = () => {
		setInterval(() => { this.execute()}, 15 * 1000);//15s
	}
    
    getNextAction = async (memo = []): Promise<ActionSI|null> => {
        const nextAction = await this.actionService.getOne({ type: { $nin: memo }});

        if (!nextAction){
			return null
		}
        const credit = await this.creditService.getById(nextAction.credit)
        const hasCredit = await this.creditService.hasCredit(credit)

        if (hasCredit){
            return nextAction
        }

        memo.push(nextAction.type)

        return this.getNextAction(memo)
    }

	execute = async ():Promise<void> => {
		let action = await this.getNextAction()
       
        if (action){
            const removedAction = await this.actionService.delete(action._id) 
			io.emit(this.REMOVE_ACTION_MESSAGE.toString(), JSON.stringify(removedAction) );

			const credit = await this.creditService.getById(removedAction.credit)
			const updatedcredit = await this.creditService.decrementCredit(credit)	
			io.emit(this.DECREMENT_CREDIT_MESSAGE.toString(), JSON.stringify(updatedcredit) );
		}
        
	}

} 