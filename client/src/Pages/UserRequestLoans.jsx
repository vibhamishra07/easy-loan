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
import { requestForLoan, submitFullUserProfile } from '../Redux/features/authSlice';


const date = new Date();

const UserRequestLoans = () => {
    const {user}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const[countTotalAmount, setCountTotalAmount]=useState(0);
  const [values, setValues] = useState({
    amount: '',
    term: 1,
  });

  const [inputFields, setInputFields] = useState([{ termAmount: '', termRepaymentDate: '' }]);

  const handleChangeTermAmountAndRepayments = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const addFields = () => {
    setInputFields([...inputFields, { termAmount: '', termRepaymentDate: '' }]);
  };
  const handleChange = (event)=>{
    setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    const id=user._id
    console.log({...values, inputFields})
    console.log("hello  " + id)
    dispatch(requestForLoan({id, ...values, inputFields}));
  }
  return (

    (user.profile)?(<form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      style={{padding: "20px 70px 20px 70px", width:"83%"}}
    >
      <Card>
        <CardHeader
          subheader="The information cannot be edited"
          title="Request For Loan"
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
                  fullWidth
                  label="Amount"
                  name="amount"
                  onChange={handleChange}
                  value={values.amount}
                  required
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
               <TextField
                  fullWidth
                  label="Term"
                  name="term"
                  onChange={handleChange}
                  value={values.term}
                  required
                />
              </Grid>
              {inputFields.map((input, index) => {
                return <><Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label={`Term ${index + 1} Amount`}
                  name="termAmount"
            placeholder={`Term ${index + 1} Amount`}
            value={input.termAmount}
            onChange={(event) => handleChangeTermAmountAndRepayments(index, event)}
                  required
                />
                </Grid>
                <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label={`Term ${index + 1} Repayment Date`}
                  name="termRepaymentDate"
            placeholder={`dd/mm/yy`}
            value={input.termRepaymentDate}
            onChange={(event) => handleChangeTermAmountAndRepayments(index, event)}
                  required
                />
                </Grid>
                </> 
        
              })}
              <Grid xs={12} md={12}> <Button variant={'contained'} onClick={addFields} >Add More Terms</Button></Grid>
            
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
    </form>):(
      <Box sx={{paddingTop:"40px", width:"83%"}}>Please First Complete Your Profile
      </Box>
    )
  )
}

export default UserRequestLoans