import  CreditPI  from './creditp.interface';

export default interface ActionI{
    _id: string
    credit: CreditPI
    createdAt: Date
    updatedAt: Date
    __v: number
}

