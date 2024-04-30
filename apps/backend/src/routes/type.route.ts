import { Router } from "express";
import TypeController from "../controllers/type.controller";
import { container } from "tsyringe";

const typeRouter = Router()
const typeController = container.resolve(TypeController);

typeRouter.get("/",[], typeController.get)

export default typeRouter