import mongoose from "mongoose";
import { Schema } from "mongoose";

const LoanRequestSchema=new Schema({
    borrowerProfile:{
        fullname:String,
        email:String,
        mobileNumber:String,
        address:String,
        city:String,
        state:String,
        pinCode:String,
        dob:String,
        gender:String,
        country:String
    },
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