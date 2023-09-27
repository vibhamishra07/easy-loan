export const sendToken=(res, userr, message, statusCode=200)=>{

    const token=userr.getJwtToken();
    const options={
        expires:new Date(Date.now()+15*24*60*60*1000),
        httpOnly: true,
        secure:true,
        sameSite: true
    }
    const {password, ...user}=userr._doc;
    res.status(statusCode).cookie("access_token", token, options).json({
        success:true,
        message,
        user
    });
}