import { Router } from "express";
import ActionController from "../controllers/action.controller";
import { container } from "tsyringe";

const actionRouter = Router()
const actionController = container.resolve(ActionController);

actionRouter.get("/", actionController.get)
actionRouter.post("/", actionController.post)

export default actionRouter