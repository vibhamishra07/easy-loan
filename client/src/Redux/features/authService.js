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

const authService = {
    login,
    logout,
    signup
}

export default authService