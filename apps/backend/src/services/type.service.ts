import TypeSI from "../interfaces/type.interface";
import BaseService from "./base.service"
import TypeModel from '../models/type.model'
import { inject, injectable } from "tsyringe";

@injectable()
export default class TypeService extends BaseService<TypeSI>{

    constructor(@inject(TypeModel)modelI: TypeModel){
        super(modelI)
    }

}