import CreditSI from "../interfaces/credit.interface";
import BaseService from "./base.service"
import { inject, injectable } from "tsyringe";
import CreditRepository from "../repository/credit.repository";
import TypeSI from "../interfaces/type.interface";

@injectable()
export default class CreditService extends BaseService{
    MAX_VALUE:number
    constructor(@inject(CreditRepository)repository: CreditRepository){
        super(repository)
        this.MAX_VALUE = 10;
    }

    generateCreditValue = (): number => {
        const minRange = this.MAX_VALUE * 0.8;
        const maxRange = this.MAX_VALUE;
        let randomNumber = Math.random() * (maxRange - minRange) + minRange;
        randomNumber = Math.round(randomNumber);
        return randomNumber
    }

    decrementCredit = async (credit:CreditSI): Promise<CreditSI> => {
        credit.value -= 1
        await credit.save();
        return credit
    }

    hasCredit = async (credit:CreditSI): Promise<boolean> => {
        if (credit.value > 0){
            return true
        }
        return false
    }

    refreshCredit = async (credit:CreditSI, value:number): Promise<CreditSI> => {
        credit.value = value
        await credit.save();
        return credit
    };

    refreshCredits = async (credits:CreditSI[]):Promise<CreditSI[]> => {
        const updatedCredits = []
        for(const credit of credits){
            const value = this.generateCreditValue()
            const updatedCredit = await this.refreshCredit(credit, value) 
            updatedCredits.push(updatedCredit);
        }
        return updatedCredits
    }

    generateCredits = async (types: TypeSI[]) => {
        const credits = []
        for(const type of types){
        
            const doublons = await this.getOne({type: type._id})
            
            if(!doublons){
                const value = this.generateCreditValue()
                const credit = this.generateCredit(type, value)
                credits.push(credit)
            }
        }
        return credits
    }

    generateCredit = (type, value:number) => {
        const credit = {
            type: type._id,
            value: value
        }
        return credit
    };

}