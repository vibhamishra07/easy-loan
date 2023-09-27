import axios from 'axios'

const API_URL = ''  // for serve api


// Api calling for login
const login = async(userData) => {
    const response = await axios.post(`${API_URL}/api/auth/signin/` , userData)
    if(response.data){
     localStorage.setItem('user' ,  JSON.stringify(response.data.user));  // storing data to localstorage
    }
    return response.data
}


// Api calling for logout
const logout = async () =>{ 
    const response = await axios.post(`${API_URL}/api/auth/signout`);
    if(response.status==200){
        localStorage.clear();   // clearing the localstorage data after logout
    }
    return response.data;
}


// Api calling for Signup/createUser
const signup=async(userData)=>{
    const response = await axios.post(`${API_URL}/api/auth/signup/` , userData)
    if(response.data){
     localStorage.setItem('user' ,JSON.stringify(response.data.user)); //storing response data to localstorage
    }
    return response.data
}

//Api calling for fullProfile Submission
const submitFullUserProfile=async (data)=>{
    const response = await axios.put(`${API_URL}/api/user/add-full-user-profile/${data.id}` , data)
    if(response.data){
     localStorage.setItem('user' ,JSON.stringify(response.data.user)); //storing response data to localstorage
    }
    return response.data
}
// get User
const getUser=async (id)=>{
    const response = await axios.get(`${API_URL}/api/user/getUser/${id}`)
    if(response.data){
     localStorage.setItem('user' ,JSON.stringify(response.data.user)); //storing response data to localstorage
    }
    return response.data
}

// request fro loan
const requestForLoan=async (data)=>{
    const response = await axios.post(`${API_URL}/api/user/request-for-loan/${data.id}`, data)
    if(response.data){
     localStorage.setItem('user' ,JSON.stringify(response.data.user)); //storing response data to localstorage
    }
    return response.data
}

const authService = {
    login,
    logout,
    signup,
    submitFullUserProfile,
    getUser,
    requestForLoan
}

export default authService