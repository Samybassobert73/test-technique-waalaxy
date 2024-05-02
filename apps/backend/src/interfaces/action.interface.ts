import mongoose from "../database/database";

export interface ActionI{
    credit: mongoose.Schema.Types.ObjectId; 
}

export default interface ActionSI extends ActionI, mongoose.Document{}