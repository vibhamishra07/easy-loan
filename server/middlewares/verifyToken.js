import jwt from "jsonwebtoken"
import { createError } from "../error.js";
import { User } from "../models/User.js";

export const verifyToken= async (req, res, next)=>{
    const token=req.cookies.access_token;
    if(!token) return next(createError(401, "You are not authenticated!"));
    
    const decodedUser = jwt.verify(token, process.env.JWTTOKENKEY);
    req.user=await User.findById(decodedUser.id);
    next();
}