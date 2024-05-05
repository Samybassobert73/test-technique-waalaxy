
import { inject, injectable } from "tsyringe";
import BaseController from "./base.controller";
import ActionService from "../services/action.service";
import ActionDTO from "../dto/action.dto";
import { validate } from "class-validator";
import ActionSI from "../interfaces/action.interface";
import { Request, Response } from "express";
@injectable()
export default class ActionController extends BaseController<ActionSI, ActionDTO>{

    constructor(@inject(ActionService)service: ActionService){
        super(service);
    }

    post = async(req:Request, res:Response): Promise<void> => {
        const { credit } = req.body;

        const actionDto = new ActionDTO(credit);

        const errors = await validate(actionDto);
        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }
        
        const resource = await this.service.post(actionDto)
        res.status(200).json(resource);
    }
}