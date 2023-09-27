import express from "express";
import {getUser,addFullUserProfile,requestForLoan} from '../controllers/user.js'
import { verifyToken } from "../middlewares/verifyToken.js";
const router=express.Router();

router.get("/getuser/:id", verifyToken, getUser);
router.put("/add-full-user-profile/:id", verifyToken,  addFullUserProfile);
router.post("/request-for-loan/:id", verifyToken, requestForLoan)

export default router;