import mongoose from "../database/database";

export default interface ModelI<T>{
    schema: mongoose.Schema<T>
    model: mongoose.Model<T, {}>
}