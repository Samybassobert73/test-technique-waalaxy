
import { inject, injectable } from "tsyringe";
import BaseController from "./base.controller";
import ActionService from "../services/action.service";

@injectable()
export default class ActionController extends BaseController{

    constructor(@inject(ActionService)service: ActionService){
        super(service);
    }
}