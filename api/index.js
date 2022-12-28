import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv'; 
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'; 
import usersRoute from './routes/users.js'; 
import hotelsRoute from './routes/hotels.js'; 
import roomsRoute from './routes/rooms.js'; 

dotenv.config({ path: 'config.env' });
const port = process.env.PORT || 3000;

app.use(morgan('tiny')); //log request. 
app.use(bodyParser.urlencoded({ extended: true }));

// connection to database 
const connect = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO); 
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch(err){
        console.log(err);
        process.exit(1); 
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!"); 
})
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected!")
})

//middlewares
app.use(express.json()); //this is used to send json objects. 

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute); 

app.use((err, req, res, next)=> {
    const errorStatus = err.status || 500; 
    const errorMessage = err.message || "An unknown error occured"; 
    return res.status(errorStatus).json({
        success: false, 
        status: errorStatus, 
        message: errorMessage, 
        stack: err.stack 
    })
})

app.listen(8080, ()=>{
    connect();
    console.log(`application started on port:${port}`); 
})
