import mongoose from "mongoose";
import { Schema } from "mongoose";

const LoanRequestSchema=new Schema({
    borrowerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    amount:String,
    term:Number,
    allTerms:Array,
    date: {
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum:["pending", "approved", "rejected"],
        default:"pending"
    }
})

export const  Loanrequests = mongoose.model("loanRequests", LoanRequestSchema);