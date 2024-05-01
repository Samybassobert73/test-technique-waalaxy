import TypePI from "./typep.interface"

export default interface CreditI{
    _id: string
    type: TypePI
    value: number
    createdAt: Date
    updatedAt: Date
    __v: number
}