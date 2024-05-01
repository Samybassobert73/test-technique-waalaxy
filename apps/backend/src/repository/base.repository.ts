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

    findOne = async (id: string): Promise<T> => {
        const resource = await this.model.findOne({_id: new mongoose.Types.ObjectId(id)}) as T
        return resource
    }

    deleteOne = (id: string): void => {
        return this.model.deleteOne({_id: new mongoose.Types.ObjectId(id)})
    }

}