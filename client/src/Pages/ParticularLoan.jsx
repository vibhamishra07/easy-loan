import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ParticularLoan = () => {

    const data = useParams();
    const { user } = useSelector((state) => state.auth);
    const [loanData, setLoanData] = useState(null);
    const dispatch=useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (user && data.id) {
                try {
                    const response = await axios.get(`/api/user/get-loan-by-id/${user._id}/${data.id}`) // Assuming user._id is available
                    console.log(response)
                    response && setLoanData(response.data.loan);
                } catch (error) {
                    console.error("Error fetching loans:", error);
                }
            }
        };

        fetchData();
    }, [data.id, user, setLoanData])
   

    const updateStatus=()=>{
        dispatch(updateLoanStatus());
    }
    return (
        <Box sx={{ width: "83%", height: "max-content", padding: "20px 10px 20px 10px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Box>
                <h3 style={{paddingBottom:"20px"}}>Loan Details</h3>
                {
                   loanData && <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Key</TableCell>
                                    <TableCell>Values</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    (user.isAdmin && loanData) && (
                                       <> <TableRow>
                                    <TableCell>Borrower's Full Name</TableCell>
                                    <TableCell>{loanData.fullname}</TableCell>

                                </TableRow>
                                <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{loanData.email}</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>MobileNumber</TableCell>
                                <TableCell>{loanData.mobileNumber}</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>Gender</TableCell>
                                <TableCell>{loanData.profile.gender}</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>{loanData.profile.address} {loanData.profile.city} {loanData.profile.state} {loanData.profile.pinCode}</TableCell>

                            </TableRow>
                            </>
                                    )
                                }
                                <TableRow>
                                    <TableCell>Term</TableCell>
                                    {user.isAdmin?<TableCell>{loanData._doc.term}</TableCell>:<TableCell>{loanData.term}</TableCell>}

                                </TableRow>
                                <TableRow>
                                    <TableCell>Amount</TableCell>
                                    {user.isAdmin?<TableCell>{loanData._doc.amount}</TableCell>:<TableCell>{loanData.amount}</TableCell>}

                                </TableRow>
                                <TableRow>
                                    <TableCell>Status</TableCell>
                                    {user.isAdmin?<TableCell>{loanData._doc.status}  <Button onClick={updateStatus}>Change Status</Button></TableCell>:
                                    (<TableCell>{loanData.status}  </TableCell>)
                                    }

                                </TableRow>
                                <TableRow>
                                    <TableCell>Requested Date</TableCell>
                                    {user.isAdmin?<TableCell>{new Date(loanData._doc.date).toLocaleDateString()}</TableCell>:
                                    <TableCell>{new Date(loanData.date).toLocaleDateString()}</TableCell>
                                    }
                                    

                                </TableRow>
                                {
                                    (!user.isAdmin && loanData.allTerms.map((element, index) => {
                                        (loanData && console.log(loanData.profile))
                                        return (<>
                                            <TableRow>
                                                <TableCell>{index + 1} Term Amount: {element.termAmount}</TableCell>
                                                <TableCell>{index + 1} Term Repayment Date: {element.termRepaymentDate}</TableCell>

                                            </TableRow>
                                        </>)
                                    }))
                                }
                                {
                                    (user.isAdmin && loanData._doc.allTerms.map((element, index) => {
                                        (loanData && console.log(loanData.profile))
                                        return (<>
                                            <TableRow>
                                                <TableCell>{index + 1} Term Amount: {element.termAmount}</TableCell>
                                                <TableCell>{index + 1} Term Repayment Date: {element.termRepaymentDate}</TableCell>

                                            </TableRow>
                                        </>)
                                    }))
                                }
                            </TableBody>
                        </Table>

                    </TableContainer>
                }
            </Box>
        </Box>
    )
}

export default ParticularLoan