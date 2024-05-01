import { inject, injectable } from 'tsyringe';
import TimerService from '../services/timer.service';
import CreditService from '../services/credit.service';
import ActionService from '../services/action.service';
import { io } from '../websocket/websocket';
@injectable()
export default class Timers {

	DECREMENT_CREDIT_MESSAGE:string = 'decrement-credit';
	REMOVE_ACTION_MESSAGE:string = 'remove-action';
	REFRESH_CREDIT_MESSAGE:string = 'refresh-credit';

	constructor(
        @inject(TimerService)private timerService:TimerService,
		@inject(CreditService)private creditService:CreditService,
        @inject(ActionService)private actionService:ActionService,
		
	){}

	init = () => {
		setInterval(() => { this.executeNextActionTimer()}, 15 * 1000);//15s
		setInterval(() => { this.refreshCreditTimer()}, 60 * 1000);// }, 10 * 60 * 1000); //10min
	}

	executeNextActionTimer = async ():Promise<void> => {

		let action = await this.timerService.getNextAction()
       
        if (action){
            const removedAction = await this.actionService.delete(action._id) 
			io.emit(this.REMOVE_ACTION_MESSAGE.toString(), JSON.stringify(removedAction) );

			const credit = await this.creditService.getOne({type: removedAction.type})
			const updatedcredit = await this.creditService.decrementCredit(credit)	
			io.emit(this.DECREMENT_CREDIT_MESSAGE.toString(), JSON.stringify(updatedcredit) );
		}
        
	}

    refreshCreditTimer = async (): Promise<void> => {
		const credits = await this.creditService.get()
        const newCredits = await this.timerService.refreshCredits(credits)	
		io.emit(this.REFRESH_CREDIT_MESSAGE.toString(), JSON.stringify(newCredits));
	}
} 