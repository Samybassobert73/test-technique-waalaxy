import express from "express";
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
app.use(function (req, res, next) {
  res.status(404).send(" route not found");
});

export default app;