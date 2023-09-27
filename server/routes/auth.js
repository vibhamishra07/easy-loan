import express from "express";
import {signin, signout, signup, getUser} from '../controllers/auth.js'
const router=express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout",  signout);
router.get("/getuser/:id", getUser);
export default router;