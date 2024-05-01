import { Router } from "express";
import typeRouter from "./type.route";
import actionRouter from "./action.route";
import creditRouter from "./credit.route";

const indexRouter = Router()

indexRouter.use("/type", typeRouter)
indexRouter.use("/action", actionRouter)
indexRouter.use("/credit", creditRouter)
export default indexRouter