import express, { json } from "express";
import env from "dotenv";
env.config();

import apiRoutes from "./api-routers/index.mjs";
import "./helpers/db.mjs";

const app = express();
const port = process.env.port || 8080;

app.use(express.static("public"));
app.use(express.json());

import cors from "cors";
app.use(cors({
    origin: "http://localhost:3000",
  })
);

//API
app.use("/api", apiRoutes);

//もし/apiで処理が完了しなかった場合、↓の処理が呼ばれる
app.use(function (req, res) {
  res.status(404).json({ msg: "Page Not Found" });
});

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500), json({ msg: "不正なエラー発生" });
});

app.listen(port, function () {
  console.log(`Server Start: http://localhost:${port}`);
});
