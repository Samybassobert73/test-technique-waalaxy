import mongoose from "../database/database";

export interface ActionI{
    type: mongoose.Schema.Types.ObjectId; 
}

export default interface ActionSI extends ActionI, mongoose.Document{}