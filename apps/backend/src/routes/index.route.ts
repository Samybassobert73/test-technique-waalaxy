import { Router } from "express";
import typeRouter from "./type.route";

const indexRouter = Router()

indexRouter.use("/type", typeRouter)

export default indexRouter