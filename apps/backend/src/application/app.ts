import express, { NextFunction, Request, Response } from "express";
import indexRouter from "../routes/index.route";

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!")
})
// all the routes here
app.use("/apiv1", indexRouter)

// this is for 404
app.use(function (req:Request, res:Response, next:NextFunction) {
  res.status(404).send(" route not found");
});

export default app;