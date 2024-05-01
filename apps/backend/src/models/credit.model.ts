import { Schema, Model, model } from "mongoose";
import { injectable, singleton } from "tsyringe";
import mongoose from "../database";
import ModelI from "../interfaces/model.interface";
import CreditSI from "../interfaces/credit.interface";

@singleton()
@injectable()
export default class ActionModel implements ModelI{
    schema: Schema<any> = new mongoose.Schema({
        type: {
            type: Schema.Types.ObjectId,
            ref: "types"
        },
        value: {
            type: Number,
            required: true
        }

    }, {
        timestamps: true
    })
    model: Model<any, {}> = model<CreditSI>("credits", this.schema)
}