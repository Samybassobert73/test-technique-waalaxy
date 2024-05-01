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


    executeNextAction = async (): Promise<{removedAction:ActionSI,updatedcredit:CreditSI}> => {
        let action = await this.getNextAction()
        if (!action){
            return null;
		}
        const removedAction = await this.actionService.delete(action._id) 
        const credit = await this.creditService.getOne({type: removedAction.type})
        const updatedcredit = await this.decrementCredit(credit._id)	
        return {removedAction, updatedcredit}
    }

    getNextAction = async (memo = []): Promise<ActionSI|null> => {
        const nextAction = await this.actionService.getOne({ type: { $nin: memo }});

        if (!nextAction){
			return null
		}

        const hasCredit = await this.hasCredit(nextAction)

        if (hasCredit){
            return nextAction
        }

        memo.push(nextAction.type)

        return this.getNextAction(memo)
    }

    hasCredit = async (action:ActionSI): Promise<boolean> => {
        const credit = await this.creditService.getOne({type: action.type})
        if (credit.value > 0){
            return true
        }
        return false
    }

    decrementCredit = async (id:string): Promise<CreditSI> => {
        const credit = await this.creditService.getById(id);
        credit.value -= 1
        await credit.save();
        return credit
    }

    refreshCredits = async ():Promise<CreditSI[]> => {
        const updatedCredits = []
        const credits = await this.creditService.get()
        for(const credit of credits){
            const value = this.creditService.generateCreditValue()
            const updatedCredit = await this.refreshCredit(credit._id, value) 
            updatedCredits.push(updatedCredit);
        }
        return updatedCredits
    }
    
    refreshCredit = async (id:string, value:number): Promise<CreditSI> => {
        const credit = await this.creditService.getById(id)
        credit.value = value
        await credit.save();
        return credit
    };


} 