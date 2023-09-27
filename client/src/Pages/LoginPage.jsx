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
import { useDispatch } from 'react-redux';
import { login } from '../Redux/features/authSlice';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// fields for login input
const inputFields=[
    {
        id:"email",
        label:"Email Address",
        name: "email",
        autofocus:true,
        autocomplete:"email",
        required:true
    },
    {
        id:"password",
        type:"password",
        label:"Password",
        name: "password",
        autocomplete:"password",
        required:true
    }
]
const LoginPage = () => {
  const dispatch=useDispatch();
  //   functionality for login
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginValue={
        email: data.get('email'),
        password: data.get('password'),
    };
    dispatch(login(loginValue)); // Dispatching Login Fuctionality from redux
  }



  return (
    <>
    <Box sx={{width:"100%", padding:"20px", height:"100vh", maxHeight:"max-content"}}>
    <Box sx={{ flexGrow: 1, height:"100%"}}>
      <Grid container spacing={2} sx={{justifyContent:"center", height:"100%", alignItems:'center'}}>
      <CssBaseline />
        <Grid md={6} sm={10} xs={12}>
          <Item elevation={0}
          sx={{
            mx: {sm:8, xs:4},
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {/* Avatar */}
          <Avatar sx={{ m: 1, bgcolor: '#c76e00' }}>
              <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={"#183B56"}>
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 , width:"100%"}}>
                {/* Input fields  */}
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
                }}}
              >
                Sign In
              </Button>
            </Box>
              
              {/* if not signup then go for signup */}
              <Grid container sx={{justifyContent:"space-between", width:"100%",marginBottom:"10px"}}>
                <Grid item >
                  <Link to="/signup" variant="body2" style={{color:"#183B56"}}>
                    {"Don't have an account? Sign Up"}
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
            display:{sm:"none", xs:"none", md:"block"},
            height:"100%"
        }}/>
      </Grid>
    </Box>
    </Box>
    </>
  )
}

export default LoginPage