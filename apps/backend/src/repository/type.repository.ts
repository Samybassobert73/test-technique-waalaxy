import TypeSI from "../interfaces/type.interface";
import TypeModel from '../models/type.model'
import { inject, injectable } from "tsyringe";
import BaseRepository from "./base.repository";

@injectable()
export default class TypeRepository extends BaseRepository<TypeSI>{

    constructor(@inject(TypeModel)modelI: TypeModel){
        super(modelI)
    }

}