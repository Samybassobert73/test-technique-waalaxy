import mongoose from "../database";
import ModelI from "../interfaces/model.interface";

export default class BaseRepository<T>{

    model: mongoose.Model<any, any>
    constructor(modelI: ModelI){
        this.model = modelI.model
    }

    create = async (data: T) => {
        const resource = await this.model.create(data)
        return resource
    }    

    find = async (filters = {}): Promise<T[]> =>{
        const resource = await this.model.find(filters) as T[]
        return resource
    }

    findOne = async (filters = {}): Promise<T> => {
        const resource = await this.model.findOne(filters) as T
        return resource
    }

    findById = async (id: string): Promise<T> => {
        const resource = await this.model.findById({_id: new mongoose.Types.ObjectId(id)}) as T
        return resource
    }

    findByIdAndDelete = async (id: string): Promise<T> => {
        return await this.model.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)})
    }

}