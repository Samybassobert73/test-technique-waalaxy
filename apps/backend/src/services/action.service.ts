import ActionSI from "../interfaces/action.interface";
import BaseService from "./base.service"
import ActionModel from '../models/action.model'
import { inject, injectable } from "tsyringe";
import ActionRepository from "../repository/action.repository";
import ActionDTO from "../dto/action.dto";

@injectable()
export default class ActionService extends BaseService<ActionSI,ActionDTO>{

    constructor(@inject(ActionRepository)repository: ActionRepository){
        super(repository)
    }
}