import { Router } from "express";
import typeRouter from "./type.route";
import actionRouter from "./action.route";

const indexRouter = Router()

indexRouter.use("/type", typeRouter)
indexRouter.use("/action", actionRouter)
export default indexRouter