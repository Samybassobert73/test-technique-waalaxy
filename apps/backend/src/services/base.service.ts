import mongoose from "../database";
import BaseRepository from "../repository/base.repository";


export default class BaseService{

    repository: BaseRepository<any>
    constructor(repository: BaseRepository<any>){
        this.repository = repository
    }

    post = async (data) => {
        const resource = await this.repository.create(data)
        return resource
    }

    get = async (filters = {}): Promise<[]> =>{
        const resource = await this.repository.find(filters) as []
        return resource
    }

    getOne = async (filters = {}): Promise<any> =>{
        const resource = await this.repository.findOne(filters)
        return resource
    }

    getById = async (id: string): Promise<any> => {
        const resource = await this.repository.findById(id) 
        return resource
    }

    delete = async (id: string): Promise<any> => {
        return await this.repository.findByIdAndDelete(id)
    }

}