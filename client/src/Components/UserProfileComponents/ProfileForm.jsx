import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { submitFullUserProfile } from '../../Redux/features/authSlice';


const date = new Date();

export const ProfileForm = () => {
    const {user}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();
   console.log(user)
  const [values, setValues] = useState({
    dob: (user&& user.profile)?(new Date(user&&user.profile.dob).toLocaleDateString()) : '',
    gender: (user&& user.profile)?user.profile.gender:'',
    city: (user&& user.profile)?user.profile.city : '',
    address: (user&& user.profile)?user.profile.address:'',
    pinCode: (user&& user.profile)?user.profile.pinCode :'',
    state: (user&& user.profile)?user.profile.state :'',
    country: (user&& user.profile)?user.profile.country : ''
  });
  
  const handleChange = (event)=>{
    setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    const id=user._id
    console.log({...values})
    console.log("hello  " + id)
    dispatch(submitFullUserProfile({id, ...values}));
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      style={{paddingTop:"20px", paddingBottom:"20px"}}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
              sx={{padding:"0 5px 0 5px"}}
            >
              <Grid
                xs={12}
                md={6}
              >
                 <TextField
          id="filled-read-only-input"
          fullWidth
          label="Full Name"
          defaultValue={user.fullname}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
          id="filled-read-only-input"
          fullWidth
          label="Email"
          defaultValue={user.email}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
          id="filled-read-only-input"
          fullWidth
          label="Mobile Number"
          defaultValue={user.mobileNumber}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                  value={values.gender}
                  required
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="D.O.B"
                  name="dob"
                  placeholder='dd/mm/yyyy'
                  onChange={handleChange}
                  required
                  value={values.dob}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Pin Code"
                  name="pinCode"
                  onChange={handleChange}
                  required
                  value={values.pinCode}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  onChange={handleChange}
                  required
                  value={values.city}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  onChange={handleChange}
                  required
                  value={values.state}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                />
              </Grid>
             
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};