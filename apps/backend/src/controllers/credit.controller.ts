import { inject, injectable } from "tsyringe";
import BaseController from "./base.controller";
import CreditService from "../services/credit.service";

@injectable()
export default class CreditController extends BaseController{

    service: CreditService
    constructor(@inject(CreditService)service: CreditService){
        super(service);
        this.service = service
    }
}