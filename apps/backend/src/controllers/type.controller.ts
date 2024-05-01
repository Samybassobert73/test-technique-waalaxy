import { Request, Response } from "express";
import {  inject, injectable } from "tsyringe";
import typeSI from "../interfaces/type.interface";
import TypeService from "../services/type.service";
import BaseController from "./base.controller";

@injectable()
export default class typeController extends BaseController{

    constructor(@inject(TypeService)service: TypeService){
        super(service);
    }
}