import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';

dotenv.config({
    path:".env"
});

const app=express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // for uploading images

//All routes
app.get('/', (req, res)=>{
    res.send("hello world");
})
app.use("/api/auth", authRoute);  // authentication route
app.use("/api/user", userRoute); //user route


//middleware for handling error
app.use((err, req, res, next)=>{
    const status=err.status || 500;
    const message=err.message || "Something went wrong";
    return res.status(status).json({
     succcess:false,
     status,
     message
    })
})

export default app;