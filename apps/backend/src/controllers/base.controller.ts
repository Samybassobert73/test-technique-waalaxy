import { Request, Response } from "express";
import BaseService from "../services/base.service";

export default class BaseController<T, U>{

    service: BaseService<T,U>
    constructor(service: BaseService<T,U>){
        this.service = service
    }

    post = async(req: Request, res: Response): Promise<void> => {
        const resource = await this.service.post(req.body)
        res.status(200).json(resource)
    }

    get = async(req: Request, res: Response): Promise<void> => {
        const resource = await this.service.get()
        res.status(200).json(resource)
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params
        const resource = await this.service.getById(id)
        if(resource === null){
            res.status(400).send({message: "No data found"})
            return
        }
        res.status(200).json(resource)
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params
        const resource = await this.service.delete(id)
        res.status(200).json(resource)
    }

} 