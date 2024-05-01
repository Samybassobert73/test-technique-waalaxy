import { inject, injectable } from 'tsyringe';
import CreditService from '../services/credit.service';
import ActionService from '../services/action.service';
import ActionSI from '../interfaces/action.interface';
import CreditSI from '../interfaces/credit.interface';

@injectable()
export default class TimerService {
	constructor(
        @inject(CreditService)private creditService:CreditService,
        @inject(ActionService)private actionService:ActionService,
	){}

    getNextAction = async (memo = []): Promise<ActionSI|null> => {
        const nextAction = await this.actionService.getOne({ type: { $nin: memo }});

        if (!nextAction){
			return null
		}

        const credit = await this.creditService.getOne({type: nextAction.type})
        const hasCredit = await this.creditService.hasCredit(credit)

        if (hasCredit){
            return nextAction
        }

        memo.push(nextAction.type)

        return this.getNextAction(memo)
    }

    refreshCredits = async (credits:CreditSI[]):Promise<CreditSI[]> => {
        const updatedCredits = []
        for(const credit of credits){
            const value = this.creditService.generateCreditValue()
            const updatedCredit = await this.creditService.refreshCredit(credit, value) 
            updatedCredits.push(updatedCredit);
        }
        return updatedCredits
    }
    
    


} 