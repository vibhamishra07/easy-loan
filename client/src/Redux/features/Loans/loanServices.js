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


const updateLoanStatus=async (data)=>{
    const response = await axios.put(`${API_URL}/api/user/update-loan-status/${data.id}/${data.loanId}`, {status:data.status})
    if(response.data){
        localStorage.setItem('loans' ,JSON.stringify(response.data.loan)); //storing response data to localstorage
    }
    return response.data
}


const loanServices = {
    getAllLoans,
    updateLoanStatus
}

export default loanServices