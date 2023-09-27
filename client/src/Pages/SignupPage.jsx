import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import img3 from '../Assets/images/img3.jpg';
import { Avatar, Button, CssBaseline, Typography } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputBox from '../Components/InputBox';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../Redux/features/authSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Input fields for signup
const inputFields=[
    {
      id:"fullname",
      label:"Full Name",
      name: "fullname",
      autocomplete:"fullname",
  },
    {
        id:"email",
        label:"Email Address",
        name: "email",
        autocomplete:"email",
    },
    {
        id:"mobileNumber",
        label:"Mobile Number",
        name: "mobileNumber",
        autocomplete:"mobileNumber",
    },
    {
        id:"password",
        type:"password",
        label:"Password",
        name: "password",
        autocomplete:"password",
    },
    {
        id:"cpassword",
        type:"password",
        label:"Confirm Password",
        name: "cpassword",
        autocomplete:"cpassword",
    }
]

// Signup function
const SignUpPage = () => {
    const dispatch=useDispatch();

    const handleSubmit = (event) => {
      console.log("submit")
      event.preventDefault();
      const data = new FormData(event.currentTarget);
  
      const signUpValue={
          fullname: data.get('fullname'),
          mobileNumber: data.get('mobileNumber'),
          email: data.get('email'),
          password: data.get('password'),
          cpassword: data.get('cpassword'),
      };
     
      dispatch(signup(signUpValue)); //Dispatching/ calling functionality to signup
  };



  return (
    <>
    <Box sx={{width:"100%", padding:"20px", height:"80vh", maxHeight:"max-content"}}>
    <Box sx={{ flexGrow: 1, height:"100%"}}>
      <Grid container spacing={2} sx={{justifyContent:"center", height:"100%"}}>
      <CssBaseline />
        <Grid md={6} sm={10} xs={12}>
          <Item elevation={0}
          sx={{
            mx: {sm:8, xs:4},
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: '#c76e00' }}>
              <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={"#183B56"}>
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1,width:"100%" }}>
                {
                    inputFields.map((element, index)=>{
                        return <InputBox {...element} key={index}/>
                    })
                }
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , color:"#c76e00", border:"1px solid #c76e00", backgroundColor:"white",
                '&:hover':{
                    backgroundColor:"#c76e00",
                    color:"black",
                    // borderColor:"black"
                }}}
              >
                Sign Up
              </Button>
            </Box>
              
              {/* if already sign up then go fot signin */}
              <Grid container sx={{justifyContent:"space-between", width:"100%",marginBottom:"10px"}}>
                <Grid item >
                  <Link to="/login" variant="body2" style={{color:"#183B56"}}>
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
          </Item>
        </Grid>
        <Grid item sm={false} md={6}  sx={{
            backgroundImage: `url(${img3})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat:"no-repeat",
            display:{sm:"none", xs:"none", md:"block"}
        }}/>
      </Grid>
    </Box>
    </Box>
    </>
  )
}

export default SignUpPage