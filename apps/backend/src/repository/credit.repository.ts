import CreditSI from "../interfaces/credit.interface";
import CreditModel from '../models/credit.model'
import { inject, injectable } from "tsyringe";
import BaseRepository from "./base.repository";

@injectable()
export default class CreditRepository extends BaseRepository<CreditSI>{

    constructor(@inject(CreditModel)modelI: CreditModel){
        super(modelI)
    }

    find = async () => {
        return await this.model.find().populate('type', 'name')
    }

}