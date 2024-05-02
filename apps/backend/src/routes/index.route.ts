import { Router } from "express";
import actionRouter from "./action.route";
import creditRouter from "./credit.route";

const indexRouter = Router()

indexRouter.use("/action", actionRouter)
indexRouter.use("/credit", creditRouter)
export default indexRouter