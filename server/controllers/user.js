import { createError } from "../error.js";
import { User } from "../models/User.js";
import  {Loanrequests } from "../models/LoanRequest.js";

export const getUser=async (req, res, next) => {
    try {
      const id=req.params.id;
      const user= await User.findById({_id:id}).select("+password");
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
      console.log(id)
      const {amount, term, inputFields}=req.body;
      const totalTermsAmountLength=inputFields.length;
      if(!term || !inputFields || !amount || totalTermsAmountLength!=term  ){
        return next(createError(404, "Please fill all the necessary details"))
      }
      let totalTermAmounts=0;
      inputFields.forEach(element => {
        if(!element.termAmount || !element.termRepaymentDate) return next(createError(404, "Please fill all the terms details"))
        totalTermAmounts+=parseInt(element.termAmount)
      });
      console.log(totalTermAmounts)
      if(totalTermAmounts!=parseInt(amount)) return next(createError(404, "Please fill terms amount equals to total amount"))
      const newLoanRequest= new Loanrequests({
          amount,
          term,
          allTerms:inputFields,
          borrowerId:req.params.id
      })

      await newLoanRequest.save();
      console.log(newLoanRequest._id)
      const user=await User.findByIdAndUpdate({_id:id},{
        $push:{
            loanRequests:newLoanRequest._id
        }
      },{ new: true }).select("+password")

      res.status(200).json({success:true, message:"Loan Requested Successfully, Wait for Approval", user});
    } catch (err) {
      next(err);
    }
};


export const getAllLoans=async (req, res, next) => {
  try {
    const id=req.params.id;

    if(id.toString() !== req.user._id.toString()){
      return next(createError(401 , "User not authorized!"))
    }
    const user=await User.findById({_id:id});
    if(user.isAdmin){
      const allLoans= await Loanrequests.find({});
    if(!allLoans) return next(createError(404, "Don't have any loan requests yet"))
    res.status(200).json({success:true, allLoans});
    }else{
      const allLoans= await Loanrequests.find({borrowerId:id});
      if(!allLoans) return next(createError(404, "Don't have any loan requests yet"))
      res.status(200).json({success:true, allLoans});
    }
    
    
  } catch (err) {
    next(err);
  }
};

export const getLoanById=async (req, res, next) => {
  try {
    const id=req.params.id;
    const loanId=req.params.loanId;
    console.log(id, loanId)
    if(id.toString() !== req.user._id.toString()){
      return next(createError(401 , "User not authorized!"))
    }
    const user=await User.findById({_id:id});
    
    const loan= await Loanrequests.findById({_id:loanId});
    console.log(loan)
    if(!loan) return next(createError(404, "Don't have any loan requests yet"))
    if(user.isAdmin){
      res.status(200).json({success:true, loan:{...loan, profile:user.profile, fullname:user.fullname, email:user.email, mobileNumber:user.mobileNumber}})
    }else{
      res.status(200).json({success:true, loan});
    }
    
  } catch (err) {
    next(err);
  }
};
