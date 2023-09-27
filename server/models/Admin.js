import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";

const AdminSchema = new Schema({
    // loanRequests:[
    //     {
    //         borrowerId:
    //         loanAmount:String,
    //         date:Date.now(),
    //         loanTerm:String,
    //         status:{
    //             enum:["pending", "approved", "rejected"],
    //             default:"pending"
    //         },
    //         loanTermDetails:[
    //             {
    //                 type:String,
    //                 date:String,
    //                 amount:string
    //             }
    //         ]
    //     }
    // ]
}, {timestamps: true});


export const Admin = mongoose.model("admin", AdminSchema);