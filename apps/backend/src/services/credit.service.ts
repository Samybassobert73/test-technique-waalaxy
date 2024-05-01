import CreditSI from "../interfaces/credit.interface";
import BaseService from "./base.service"
import CreditModel from '../models/credit.model'
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreditService extends BaseService<CreditSI>{

    constructor(@inject(CreditModel)modelI: CreditModel){
        super(modelI)
    }

}