import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import  Jwt  from "jsonwebtoken";
import validator from "validator";


const fullProfile=new Schema({
    gender:{
        type:String,
        enum: ["male", "female", "others"],
        required:[true, "Please enter your gender"]
    },
    dob:{
        type: Date,
        required:[true, "Please enter your date of birth"],
        trim: true,
        
    },
    country:{
        type:String,
        required:[true, "Please enter your country name"]
    },
    pinCode:{
        type:String,
        required:[true, "Please enter your area pin code"]
    },
    city:{
        type:String,
        required:[true, "Please enter your city name"]
    },
    state:{
        type:String,
        required:[true, "Please enter your state name"]
    },
    address:{
        type:String,
        required:[true, "please enter your address"]
    }

})


const UserSchema = new Schema({
    fullname:{
        type: String,
        required: [true,"Please enter your name."],
    },
    email:{
        type: String,
        required: [true,"Please enter your email."],
        unique: true,
        validate: [validator.isEmail, "Email is not valid"]
    },
    mobileNumber:{
        type: String,
        required: [true,"Please enter your mobile number."],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please enter your password."],
        minLength: [8, "Password must be atleast 8 characters."],
        select: false,
        validate: [validator.isStrongPassword, "Password must be strong"],
    },
    profile:fullProfile,
    loanRequests: [
        {
          type: mongoose.Schema.Types.ObjectId, // Change "Type" to "type"
          ref: 'Loanrequests'
        },
    ],
    isAdmin:{
        type:Boolean,
        default:false
    },

}, {timestamps: true});


UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password, 12);
    next();
})

UserSchema.methods.getJwtToken=function (){
    const token = Jwt.sign({id:this._id}, process.env.JWTTOKENKEY, {
        expiresIn :"15d",
    })
    return token;
}
UserSchema.methods.checkCorrectPassword= async function (checkPassword){
    return  await bcrypt.compare(checkPassword, this.password);
}

export const User = mongoose.model("users", UserSchema);