const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
PORT = process.env.PORT || 5000
const {logger} = require('./midleware/logger');
const {errorHandler }= require('./midleware/errorHandler')
const cookieParser = require('cookie-parser')
const {corsOptions} = require('./config/corsOptions')
const bodyParser = require('body-parser');
const dbConnection = require('./config/dbConn')
const mongoose =require('mongoose')
const cors = require('cors')
const {logEvents} = require('./midleware/logger')


dbConnection()

app.use(logger);
app.use(cors(corsOptions))

app.use(cookieParser());

app.use(express.json());

app.use(bodyParser.json());


app.use('/', express.static(path.join(__dirname,'front_end', 'public')))
// app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/notesRoutes'))

app.all('*', (req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if (req.accepts('json')){
        res.json({message:"404 Not found"})
    }else{
        res.type('txt').send('A page is not found')
    }
})


app.use(errorHandler);


mongoose.connection.once('open',()=>{
    console.log('Database has been connected');
    app.listen(PORT, ()=>{ console.log(`Connected to port, ${PORT}`);}) 
})


mongoose.connection.on('error', err =>{
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})