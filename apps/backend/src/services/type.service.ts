import TypeSI from "../interfaces/type.interface";
import BaseService from "./base.service"
import { inject, injectable } from "tsyringe";
import TypeRepository from "../repository/type.repository";

@injectable()
export default class TypeService extends BaseService{

    constructor(@inject(TypeRepository)repository: TypeRepository){
        super(repository)
    }

}