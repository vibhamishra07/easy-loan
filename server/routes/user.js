import express from "express";
import {getUser,addFullUserProfile,requestForLoan, getAllLoans, getLoanById,updateLoanStatus} from '../controllers/user.js'
import { verifyToken } from "../middlewares/verifyToken.js";
const router=express.Router();

router.get("/getUser/:id", verifyToken, getUser);
router.put("/add-full-user-profile/:id", verifyToken,  addFullUserProfile);
router.post("/request-for-loan/:id", verifyToken, requestForLoan)
router.get("/get-all-loans/:id", verifyToken, getAllLoans);
router.get("/get-loan-by-id/:id/:loanId", verifyToken, getLoanById);
router.put("/update-loan-status/:id/:loanId", verifyToken, updateLoanStatus);




export default router;