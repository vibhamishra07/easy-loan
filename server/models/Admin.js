import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";

const AdminSchema = new Schema({
    loanRequests:[
        {
            borrowerLoanId:{
                Type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            loanAmount:String,
            date:Date.now(),
            allLoanTerms:Array,
            status:{
                enum:["pending", "approved", "rejected"],
                default:"pending"
            },
            borrowerProfile:{
                fullname:String,
                email:String,
                mobileNumber:String,
                dob:String,
                gender:String,
                country:String,
                pinCode:String,
                city:String,
                state:String,
                address:String,
            }
        }
    ]
}, {timestamps: true});


export const Admin = mongoose.model("admin", AdminSchema);