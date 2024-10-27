const express = require("express");
const app = express();
const indexRouter = require("./routes/index");

// 미들웨어 설정
app.use(express.json()); // JSON 요청 파싱

// 라우터 설정
app.use("/", indexRouter);

module.exports = app;
