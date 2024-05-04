import CreditSI from "../interfaces/credit.interface";
import CreditModel from '../models/credit.model'
import { inject, injectable } from "tsyringe";
import BaseRepository from "./base.repository";
import CreditDTO from "../dto/credit.dto";

@injectable()
export default class CreditRepository extends BaseRepository<CreditSI, CreditDTO>{

    constructor(@inject(CreditModel)modelI: CreditModel){
        super(modelI)
    }

}