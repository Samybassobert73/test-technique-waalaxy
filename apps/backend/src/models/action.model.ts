import { Schema, Model, model, Document } from "mongoose";
import { singleton } from "tsyringe";
import mongoose from "../database/database";
import ModelI from "../interfaces/model.interface";
import ActionSI from "../interfaces/action.interface";

@singleton()
export default class ActionModel implements ModelI<ActionSI>{
    schema: Schema<ActionSI> = new mongoose.Schema({
        credit: {
            type: Schema.Types.ObjectId,
            ref: "credits",         
        }
    }, {
        timestamps: true
    })
    model: Model<ActionSI> = model<ActionSI>("actions", this.schema)
}