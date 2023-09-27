import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";


const saveUser = JSON.parse(localStorage.getItem('user')) // Get user from localStorage

const initialState = {
    user : saveUser ? saveUser : null,   //If user login then it is in saveUser otherwise its value will be null
    isError : false,
    isLoading : false,
    isSuccess: false,
    message : "",
}

const authSlice = createSlice({
    name : "auth",
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
        //Login Reducers
        .addCase(login.pending , (state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(login.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user
            state.message = action.payload.message
            state.isError = false
        })
        .addCase(login.rejected , (state , action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        //Logout reducers
        .addCase(logout.fulfilled , (state, action)=>{
            state.user = null
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message=action.payload.message
        })

        //signup reducers
        .addCase(signup.pending , (state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(signup.fulfilled , (state , action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user
            state.message = action.payload.message
            state.isError = false
        })
        .addCase(signup.rejected , (state , action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        // Full Profile Data
        .addCase(submitFullUserProfile.pending, (state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(submitFullUserProfile.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user
            state.message = action.payload.message
            state.isError = false
        })
        .addCase(submitFullUserProfile.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        // get User
        .addCase(getUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user
            // state.message = action.payload.message
            state.isError = false
        })

        // Request for loan
        .addCase(requestForLoan.pending, (state,action)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(requestForLoan.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user
            state.message = action.payload.message
            state.isError = false
        })
        .addCase(requestForLoan.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

       
    }
})

// services for signup 
export const signup = createAsyncThunk('/signup' , async(userData , thunkAPI)=>{

    try {
        return await authService.signup(userData) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) 
    }

})

//service for login
export const login = createAsyncThunk('/signin' , async(userData , thunkAPI)=>{

    try {
        const resp=await authService.login(userData)
        return resp
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message) 
    }

})



//services for logout
export const logout = createAsyncThunk("/signout" , async(thunkAPI)=>{
   
   try {
    return await authService.logout()
} catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message) 
}
})

export const submitFullUserProfile= createAsyncThunk("/add-full-user-profile" , async(data,thunkAPI)=>{
   
    try {
       return await authService.submitFullUserProfile(data);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message) 
    }
 })

//  Get User
export const getUser= createAsyncThunk("/getUser" , async(id,thunkAPI)=>{
   
    try {
       return await authService.getUser(id);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message) 
    }
})

// request fro loan

export const requestForLoan=createAsyncThunk("/reqforloan" , async(data,thunkAPI)=>{
   
    try {
       return await authService.requestForLoan(data);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       return thunkAPI.rejectWithValue(message) 
    }
})


export const {reset} = authSlice.actions
export default authSlice.reducer