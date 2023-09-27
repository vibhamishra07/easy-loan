import { createError } from "../error.js";
import mongoose from 'mongoose';
import { User } from "../models/User.js";

export const getUser=async (req, res, next) => {
    try {
      const id=req.params.id;
      const user= await User.findById(id).select("+password");
      res.status(200).json({success: true, user});
    } catch (err) {
      next(err);
    }
};

export const addFullUserProfile=async (req, res, next) => {
    try {
      const id=req.params.id;

      if(id.toString() !== req.user._id.toString()){
        return next(createError(401 , "User not authorized!"))
      }
      const {gender, dob, country, pinCode, address, city, state}=req.body;
      if(!gender ||  !dob ||  !country || !pinCode || !address || !city ||  !state){
        return next(createError(404, "Please fill all the necessary details"))
      }
      const user= await User.findOneAndUpdate({ _id:id },{
        $set:{
        profile:{
          gender,
          dob,
          country,
          pinCode,
          address,
          city,
          state
        }}
      },{ new: true }).select("+password");
      res.status(200).json({success:true, message:"Profile Created Successfully", user});
    } catch (err) {
      next(err);
    }
};


export const requestForLoan=async (req, res, next) => {
    try {
      const id=req.params.id;

      if(id.toString() !== req.user._id.toString()){
        return next(createError(401 , "User not authorized!"))
      }
      const {amount, term, inputFields}=req.body;
      const totalTermsAmountLength=inputFields.length;
      if(!term || !inputFields || !amount || totalTermsAmountLength!=term  ){
        return next(createError(404, "Please fill all the necessary details"))
      }
      let totalTermAmounts=0;
      inputFields.forEach(element => {
        if(!element.termAmount || !element.termRepaymentDate) return next(createError(404, "Please fill all the terms details"))
        totalTermAmounts+=element.termAmount
      });

      if(totalTermAmounts!=amount) return next(createError(404, "Please fill terms amount equals to total amount"))
      const user= await User.findOneAndUpdate({ _id:id },{
        $set:{
        loanRequests:{
          amount,
          term,
          allTerms:inputFields,
          status:"pending"
        }}
      },{ new: true }).select("+password");

      
      res.status(200).json({success:true, message:"Loan Requested Successfully, Wait for Approval", user});
    } catch (err) {
      next(err);
    }
};
