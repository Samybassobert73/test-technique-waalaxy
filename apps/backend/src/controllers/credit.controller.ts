import { inject, injectable } from "tsyringe";
import BaseController from "./base.controller";
import CreditService from "../services/credit.service";
import CreditDTO from "../dto/credit.dto";
import CreditSI from "../interfaces/credit.interface";

@injectable()
export default class CreditController extends BaseController<CreditSI, CreditDTO>{

    constructor(@inject(CreditService)service: CreditService){
        super(service);
    }
}