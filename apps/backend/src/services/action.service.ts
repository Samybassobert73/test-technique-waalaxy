import ActionSI from "../interfaces/action.interface";
import BaseService from "./base.service"
import ActionModel from '../models/action.model'
import { inject, injectable } from "tsyringe";

@injectable()
export default class ActionService extends BaseService<ActionSI>{

    constructor(@inject(ActionModel)modelI: ActionModel){
        super(modelI)
    }

}