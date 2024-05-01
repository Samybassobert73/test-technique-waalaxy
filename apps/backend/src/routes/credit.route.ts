import { Router } from "express";
import CreditController from "../controllers/credit.controller";
import { container } from "tsyringe";

const creditRouter = Router()
const creditController = container.resolve(CreditController);

creditRouter.get("/", creditController.get)

export default creditRouter