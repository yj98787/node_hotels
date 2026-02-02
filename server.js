const express = require("express");
const PORT = 3000;
const db = require('./db');
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Welcome!!");
});

const personRoute = require('./routes/person');
app.use('/person',personRoute);
const menuRoute = require('./routes/menuRoute');
app.use('/menu',menuRoute);

app.listen(PORT,()=>{
    console.log(`Server started at port : ${PORT}`);  
});