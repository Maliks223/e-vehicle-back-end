const colors = require('colors'); 
const mongoose = require('mongoose');
require('dotenv').config()
const express = require("express");
const port = process.env.PORT
const connectDB = require('./DataBase/db')
const user = require('./Routes/userRoute')
const post = require('./Routes/postRoute')
const comment = require('./Routes/commentRoute')
var bodyParser = require('body-parser');
// var multer = require('multer');
// var upload = multer();
var cors = require('cors');
const app = express();
app.use(cors());
connectDB();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
// app.use(upload.array());
app.use("/public", express.static("./uploads"));

app.use("/user", user);
app.use("/post", post);
app.use("/comment", comment)

app.listen(port, ()=> console.log(`Server started on port: ${port}`.green.underline))