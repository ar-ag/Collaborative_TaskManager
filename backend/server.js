const express = require('express');
const dotenv = require('dotenv').config({path:'../.env'});
const port = process.env.PORT || 5000;
const helmet = require('helmet');
const connectDB = require('./config/db')
const app = express();

connectDB()

app.use(helmet());
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));

app.listen(port, () => console.log(`server started at port ${port}`))