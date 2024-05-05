import { PipelineStage } from "mongoose";
import BaseRepository from "../repository/base.repository";


export default class BaseService<T,U>{

    repository: BaseRepository<T,U>
    constructor(repository: BaseRepository<T,U>){
        this.repository = repository
    }

    post = async (data:U) => {
        return await this.repository.create(data)   
    }

    get = async (filters = {}): Promise<T[]> =>{
        return await this.repository.find(filters) as []
    }

    getOne = async (filters = {}): Promise<T | null> =>{
        return await this.repository.findOne(filters) 
    }

    getById = async (id: string): Promise<T | null> => {
        return await this.repository.findById(id) 
    }

    delete = async (id: string): Promise<T | null> => {
        return await this.repository.findByIdAndDelete(id)
    }

    aggregate = async (filter: PipelineStage[]): Promise<T[]> => {
        return await this.repository.aggregate(filter)  
    }

}