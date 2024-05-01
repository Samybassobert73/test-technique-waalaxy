import { inject, injectable } from "tsyringe";
import BaseController from "./base.controller";
import CreditService from "../services/credit.service";

@injectable()
export default class CreditController extends BaseController{

    constructor(@inject(CreditService)service: CreditService){
        super(service);
    }
}