import mongoose from "../database/database";
import BaseRepository from "../repository/base.repository";


export default class BaseService{

    repository: BaseRepository<any>
    constructor(repository: BaseRepository<any>){
        this.repository = repository
    }

    post = async (data) => {
        return await this.repository.create(data)
         
    }

    get = async (filters = {}): Promise<any[]> =>{
        return await this.repository.find(filters) as []
    }

    getOne = async (filters = {}): Promise<any> =>{
        return await this.repository.findOne(filters)
        
    }

    getById = async (id: string): Promise<any> => {
        return await this.repository.findById(id) 
         
    }

    delete = async (id: string): Promise<any> => {
        return await this.repository.findByIdAndDelete(id)
    }

    postMany = async (data: any[]): Promise<any[]> => {
        return await this.repository.insertMany(data)
    }

}