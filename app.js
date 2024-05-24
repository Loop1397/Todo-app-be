const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
// cors 권한 관련
app.use(cors());
// /api로 요청이 올 시 taskApi를 호출
app.use('/api', indexRouter);

const mongoURI = `mongodb://127.0.0.1:27017/todo-demo`;

mongoose.connect(mongoURI, {useNewUrlParser:true}).then(() => {
    console.log("mongoose connected!");
}).catch((err) => {
    console.log("DB connection fail!", err);
});

app.listen(5000, () => {
    console.log("server on port 5000");
});