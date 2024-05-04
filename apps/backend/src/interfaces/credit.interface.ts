import mongoose from "../database/database";

export interface CreditI{
    type: string; 
    value: number
}

export default interface CreditSI extends CreditI, mongoose.Document{}