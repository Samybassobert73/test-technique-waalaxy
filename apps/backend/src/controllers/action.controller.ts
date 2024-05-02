
import { inject, injectable } from "tsyringe";
import BaseController from "./base.controller";
import ActionService from "../services/action.service";
import ActionDTO from "../dto/action.dto";
import { validate } from "class-validator";

@injectable()
export default class ActionController extends BaseController{

    constructor(@inject(ActionService)service: ActionService){
        super(service);
    }

    post = async(req, res) => {
        const { credit } = req.body;

        const actionDto = new ActionDTO();
        actionDto.credit = credit;

        const errors = await validate(actionDto);
        if (errors.length > 0) {
            res.status(400).json({ errors });
            return;
        }
        
        const resource = await this.service.post(req.body)
        res.status(200).json(resource);
    }
}