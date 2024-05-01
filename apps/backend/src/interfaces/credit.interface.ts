import mongoose from "../database";

export interface CreditI{
    type: mongoose.Schema.Types.ObjectId; 
    value: number
}

export default interface ActionSI extends CreditI, mongoose.Document{}