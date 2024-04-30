import express from "express";

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!")
})

// this is for 404
app.use(function (req, res, next) {
  res.status(404).send(" route not found");
});

export default app