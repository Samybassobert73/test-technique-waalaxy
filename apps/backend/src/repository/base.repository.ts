import mongoose from "../database/database";
import ModelI from "../interfaces/model.interface";

export default class BaseRepository<T>{

    model: mongoose.Model<any, any>
    constructor(modelI: ModelI){
        this.model = modelI.model
    }

    create = async (data: T) => {
        return await this.model.create(data) 
    }    

    find = async (filters = {}): Promise<T[]> =>{
        return await this.model.find(filters) as T[]
    }

    findOne = async (filters = {}): Promise<T> => {
        return await this.model.findOne(filters) as T
        
    }

    findById = async (id: string): Promise<T> => {
        return  await this.model.findById({_id: new mongoose.Types.ObjectId(id)}) as T  
    }

    findByIdAndDelete = async (id: string): Promise<T> => {
        return await this.model.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)})
    }

}