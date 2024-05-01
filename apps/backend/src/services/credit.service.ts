import CreditSI from "../interfaces/credit.interface";
import BaseService from "./base.service"
import { inject, injectable } from "tsyringe";
import CreditRepository from "../repository/credit.repository";

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

}