import ActionSI from "../interfaces/action.interface";
import ActionModel from '../models/action.model'
import { inject, injectable } from "tsyringe";
import BaseRepository from "./base.repository";
import ActionDTO from "../dto/action.dto";
import CreditSI from "../interfaces/credit.interface";

@injectable()
export default class ActionRepository extends BaseRepository<ActionSI, ActionDTO>{

    constructor(@inject(ActionModel)modelI: ActionModel){
        super(modelI)
    }

    find = async (): Promise<ActionSI[]> => {
        return await this.model.find().populate<Pick<CreditSI, 'type'>>('credit', 'type')
    }

    create = async (data:ActionDTO): Promise<ActionSI> => {
        const resource = await this.model.create(data)
        return resource.populate<Pick<CreditSI, 'type'>>('credit', 'type')
    } 

}