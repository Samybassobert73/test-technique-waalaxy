import  TypePI  from './typep.interface';

export default interface ActionI{
    _id: string
    type: TypePI
    createdAt: Date
    updatedAt: Date
    __v: number
}

