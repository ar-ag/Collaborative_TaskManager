const express = require('express');
const dotenv = require('dotenv').config({path:'../.env'});
const port = process.env.PORT || 5000;
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();

connectDB()

app.use(helmet());
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(cors())

app.use('/users', require('./routes/userRoutes'))
app.use('/tasks', require('./routes/taskRoutes'))

app.use(errorHandler);

app.listen(port, () => console.log(`server started at port ${port}`))