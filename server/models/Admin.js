// import mongoose from "mongoose";
// import { Schema } from "mongoose";
// import validator from "validator";


// const AdminSchema = new Schema({
//     loanRequests:[
//         {
//             borrowerLoanId:{
//                 Type:mongoose.Schema.Types.ObjectId,
//                 ref:"loanRequests"
//             },
//             loanAmount:String,
//             date:Date.now(),
//             allLoanTerms:Array,
//             status:{
//                 enum:["pending", "approved", "rejected"],
//                 default:"pending"
//             },
//             borrowerProfile:{
//                 fullname:String,
//                 email:String,
//                 mobileNumber:String,
//                 dob:String,
//                 gender:String,
//                 country:String,
//                 pinCode:String,
//                 city:String,
//                 state:String,
//                 address:String,
//             }
//         }
//     ],
//     totalLoanRequest:{
//         type:Number,
//         default:0
//     },
//     totalPendingRequest:{
//         type:Number,
//         default:0,
//     },
//     totalApprovedRequest:{
//         type:Number,
//         default:0,
//     }
// }, {timestamps: true});


// export const Admin = mongoose.model("admin", AdminSchema);