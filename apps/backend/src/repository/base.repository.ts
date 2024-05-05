import { PipelineStage } from "mongoose";
import mongoose from "../database/database";
import ModelI from "../interfaces/model.interface";

export default class BaseRepository<T, U>{

    model: mongoose.Model<T>
    constructor(modelI: ModelI<T>){
        this.model = modelI.model
    }

    create = async (data: U): Promise<T> => {
        return await this.model.create(data) 
    }    

    find = async (filters = {}): Promise<T[]> =>{
        return await this.model.find(filters)
    }

    findOne = async (filters = {}): Promise<T | null> => {
        return await this.model.findOne(filters)  
    }

    findById = async (id:string): Promise<T | null> => {
        return await this.model.findById({_id: new mongoose.Types.ObjectId(id)}) 
    }

    findByIdAndDelete = async (id: string): Promise<T | null> => {
        return await this.model.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)})
    }

    aggregate = async (filter: PipelineStage[]): Promise<T[]> => {
        return await this.model.aggregate(filter).exec()  
    }

}