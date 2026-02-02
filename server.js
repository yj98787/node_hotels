const express = require("express");
const db = require('./db');
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Welcome!!");
});

const personRoute = require('./routes/person');
app.use('/person',personRoute);
const menuRoute = require('./routes/menuRoute');
app.use('/menu',menuRoute);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server started at port : ${PORT}`);  
});