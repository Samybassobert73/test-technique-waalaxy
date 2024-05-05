import { Schema, Model, model } from "mongoose";
import { singleton } from "tsyringe";
import mongoose from "../database/database";
import ModelI from "../interfaces/model.interface";
import CreditSI from "../interfaces/credit.interface";

@singleton()
export default class CreditModel implements ModelI<CreditSI>{
    schema: Schema<CreditSI> = new mongoose.Schema({
        type: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    }, {
        timestamps: true
    })
    model: Model<CreditSI> = model<CreditSI>("credits", this.schema)
}