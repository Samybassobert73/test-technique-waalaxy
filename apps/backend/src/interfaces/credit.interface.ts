import mongoose from "../database/database";

export interface CreditI{
    type: mongoose.Schema.Types.ObjectId; 
    value: number
}

export default interface CreditSI extends CreditI, mongoose.Document{}