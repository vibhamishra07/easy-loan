import { Box, Button, Fade, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateLoanStatus } from '../Redux/features/Loans/loanSlice';

const ParticularLoan = () => {
   const loan=useSelector((state)=>state.loan);
   
       const data = useParams();
    const { user } = useSelector((state) => state.auth);
    const [loanData, setLoanData] = useState(null);
    const dispatch=useDispatch();
    // const [selectedStatus, setSelectedStatus] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
   
    
    const updateStatus=(status)=>{

        // setSelectedStatus(status);
        handleClose();
        console.log(status)
        dispatch(updateLoanStatus({status:status, id:user._id, loanId:data.id}));
        window.location.reload();
    }
    return (
        <Box sx={{ width: "83%", height: "max-content", padding: "20px 20px 20px 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
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
                                    <TableCell>{loanData.borrowerProfile.fullname}</TableCell>

                                </TableRow>
                                <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{loanData.borrowerProfile.email}</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>MobileNumber</TableCell>
                                <TableCell>{loanData.borrowerProfile.mobileNumber}</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>Gender</TableCell>
                                <TableCell>{loanData.borrowerProfile.gender}</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>{loanData.borrowerProfile.address} {loanData.borrowerProfile.city} {loanData.borrowerProfile.state} {loanData.borrowerProfile.pinCode}</TableCell>

                            </TableRow></>
                            
                                    )
                                }
                                <TableRow>
                                    <TableCell>Term</TableCell>
                                    {user.isAdmin?<TableCell>{loanData.term}</TableCell>:<TableCell>{loanData.term}</TableCell>}

                                </TableRow>
                                <TableRow>
                                    <TableCell>Amount</TableCell>
                                    {user.isAdmin?<TableCell>{loanData.amount}</TableCell>:<TableCell>{loanData.amount}</TableCell>}

                                </TableRow>
                                <TableRow>
                                    <TableCell>Status</TableCell>
                                    {user.isAdmin?<TableCell>{(loan&&loan.allLoans)?loan.allLoans.status:loanData.status}  <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Change Status
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => updateStatus('pending')}>Pending</MenuItem>
        <MenuItem onClick={() => updateStatus('approved')}>Approved</MenuItem>
        <MenuItem onClick={() => updateStatus('rejected')}>Rejected</MenuItem>
      </Menu></TableCell>:
                                    (<TableCell>{loanData.status}  </TableCell>)
                                    }

                                </TableRow>
                                <TableRow>
                                    <TableCell>Requested Date</TableCell>
                                    {user.isAdmin?<TableCell>{new Date(loanData.date).toLocaleDateString()}</TableCell>:
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
                                    (user.isAdmin && loanData.allTerms.map((element, index) => {
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