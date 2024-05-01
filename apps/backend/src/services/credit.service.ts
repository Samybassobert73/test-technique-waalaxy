import CreditSI from "../interfaces/credit.interface";
import BaseService from "./base.service"
import { inject, injectable } from "tsyringe";
import CreditRepository from "../repository/credit.repository";

@injectable()
export default class CreditService extends BaseService{

    constructor(@inject(CreditRepository)repository: CreditRepository){
        super(repository)
    }

}