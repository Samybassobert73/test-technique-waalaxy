import ActionSI from "../interfaces/action.interface";
import ActionModel from '../models/action.model'
import { inject, injectable } from "tsyringe";
import BaseRepository from "./base.repository";

@injectable()
export default class ActionRepository extends BaseRepository<ActionSI>{

    constructor(@inject(ActionModel)modelI: ActionModel){
        super(modelI)
    }

}