import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loanServices from "./loanServices";


const allLoansString = localStorage.getItem('loans');
const allLoans = allLoansString ? JSON.parse(allLoansString) : [];
const initialState = {
    allLoans : allLoans,   //If user login then it is in saveUser otherwise its value will be null
    isError : false,
    isLoading : false,
    isSuccess: false,
    message : "",
}

const loanSlice = createSlice({
    name : "loan",
    initialState,
    reducers : {
        reset : (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }   
    },
    extraReducers : (builder) => {
        builder
        // Request for loan
        .addCase(getAllLoans.pending, (state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(getAllLoans.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allLoans = action.payload.allLoans
            // state.message = action.payload.message
            state.isError = false
        })
        .addCase(getAllLoans.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        // Update loan status
        .addCase(updateLoanStatus.pending, (state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(updateLoanStatus.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allLoans = action.payload.loan
            state.message = action.payload.message
            state.isError = false
        })
        .addCase(updateLoanStatus.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

       
    }
})



export const getAllLoans=createAsyncThunk("/get-all-loans" , async(id,thunkAPI)=>{
   
    try {
       return await loanServices.getAllLoans(id);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message) 
    }
})

export const updateLoanStatus=createAsyncThunk("/update-loan-status/:id/:loanId" , async(data,thunkAPI)=>{
   
    try {
       return await loanServices.updateLoanStatus(data);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message) 
    }
})


export const {reset} = loanSlice.actions
export default loanSlice.reducer