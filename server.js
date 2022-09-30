const colors = require('colors'); 
const mongoose = require('mongoose');
require('dotenv').config()
const express = require("express");
const port = process.env.port || 5000
const connectDB = require('./DataBase/db')
const user = require('./Routes/userRoute')
const post = require('./Routes/postRoute')
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cors = require('cors');
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(upload.array()); 
app.use(express.static('public'));

app.use("/user", user);
app.use("/post", post);

app.listen(port, ()=> console.log(`Server started on port: ${port}`.green.underline))