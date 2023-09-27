import express from "express";
import dotenv from "dotenv";
dotenv.config({
    path:".env"
});

const app=express();

app.get('/', (req, res)=>{
    res.send("hello world");
})

export default app;