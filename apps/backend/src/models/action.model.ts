import { Schema, Model, model } from "mongoose";
import { injectable, singleton } from "tsyringe";
import mongoose from "../database/database";
import ModelI from "../interfaces/model.interface";
import ActionSI from "../interfaces/action.interface";

@singleton()
@injectable()
export default class ActionModel implements ModelI{
    schema: Schema<any> = new mongoose.Schema({
        credit: {
            type: Schema.Types.ObjectId,
            ref: "credits",         
        }
    }, {
        timestamps: true
    })
    model: Model<any, {}> = model<ActionSI>("actions", this.schema)
}