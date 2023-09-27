import { User } from "../models/User.js";
import { createError } from "../error.js";
import { sendToken } from "../utils/sendToken.js";

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(createError(400, "Please fill all the necessary details!"));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(createError(404, "Invalid Credentials!"));
    else {
      const checkPassword=await user.checkCorrectPassword(password);
      if (!checkPassword)
        return next(createError(404, "Invalid Credentials!"));

      sendToken(res, user, "Login Successfully.", 200);
    }
  } catch (err) {
    next(err);
  }
};

export const signout = async (req, res, next) => {
    res.status(200).cookie("access_token", null, {
      expires: new Date(Date.now()),
    }).json({
      success: true,
      message:"Signed out successfully."
    })
    next();
};



export const signup = async (req, res, next) => {
    try {
      const {fullname, email, password, cpassword , mobileNumber} = req.body;
      if (!fullname || !email || !password || !cpassword || !mobileNumber ) return next(createError(400, "Please fill all the necessary details!"));
      if(!mobileNumber.match(/^\d{10}$/) ) return next(createError(400, "Mobile number should only contain digits and should be of 10 digits!"))

      if (await User.findOne({ email})) return next(createError(409, "User Already Exist!"));
      else{
        if (await User.findOne({ mobileNumber })) return next(createError(409, "Mobile Number Already Exist!"));
        else {
          if(cpassword!==password) return next(createError(409, "Confirm password is not matched with password!"))
          else{
            const newUser = new User({
              fullname,
              mobileNumber,
              email,
              password,
            });
            await newUser.save();
            sendToken(res, newUser, "User created Successfully.", 201);
          }
          
        }
      }
    } catch (err) {
      next(err);
    }
  };


