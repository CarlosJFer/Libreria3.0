const express = require('express');
const morgan =require('morgan');
const mainRouter = require("./routes/main");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use('/api',mainRouter);

module.exports = app;