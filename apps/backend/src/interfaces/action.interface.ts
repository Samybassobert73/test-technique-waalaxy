import mongoose from "../database";

export interface ActionI{
    type: mongoose.Schema.Types.ObjectId; 
}

export default interface ActionSI extends ActionI, mongoose.Document{}