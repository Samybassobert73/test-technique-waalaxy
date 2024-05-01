import { Schema, Model, model } from "mongoose";
import { injectable, singleton } from "tsyringe";
import mongoose from "../database/database";
import ModelI from "../interfaces/model.interface";
import TypeSI from "../interfaces/type.interface";

@singleton()
@injectable()
export default class TypeModel implements ModelI{
    schema: Schema<any> = new mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    })
    model: Model<any, {}> = model<TypeSI>("types", this.schema)
}