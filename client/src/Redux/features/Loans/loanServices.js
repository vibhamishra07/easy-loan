import axios from 'axios'

const API_URL = ''  // for serve api


// get all loans associated with user
const getAllLoans=async (id)=>{
    const response = await axios.get(`${API_URL}/api/user/get-all-loans/${id}`)
    if(response.data){
        localStorage.setItem('loans' ,JSON.stringify(response.data.allLoans)); //storing response data to localstorage
    }
    return response.data
}


const updateLoanStatus=async (id)=>{
    const response = await axios.get(`${API_URL}/api/user/get-all-loans/${id}`)
    if(response.data){
        localStorage.setItem('loans' ,JSON.stringify(response.data.allLoans)); //storing response data to localstorage
    }
    return response.data
}


const loanServices = {
    getAllLoans,
    updateLoanStatus
}

export default loanServices