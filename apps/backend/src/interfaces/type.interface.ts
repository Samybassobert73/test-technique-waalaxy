import mongoose from "../database";

export interface TypeI{
    name: string
}

export default interface TypeSI extends TypeI, mongoose.Document{}