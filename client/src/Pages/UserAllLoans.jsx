import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllLoans } from '../Redux/features/Loans/loanSlice';
import { Link } from 'react-router-dom';

function createData(events, dates) {
    return { events, dates };
}
  
const rows = [
    createData("Technical Scripter", "13 October"),
    createData("Gate Mock", "5 November"),
    createData("Bi Wizard", "26 November"),
    createData("Job-A-Thon14", "21 October"),
    createData("GFG Hiring", "15 October"),
    createData("TechnicalScripter", "13 October"),
    createData("Gate Mock Exam", "5 November"),
    createData("Bi Wizard School", "26 November"),
    createData("Job-A-Thon 14", "21 October"),
    createData("GFG Hiring Challenge", "15 October")
];

const UserAllLoans = () => {
    const {user}=useSelector((state)=>state.auth);
    // const {allLoans}=useSelector((state)=>state.loan);
    console.log(user.loanRequests)
    const dispatch=useDispatch();
    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
    const [allLoans, setAllLoans]=useState([]);

    useEffect(() => {
        const fetchData = async () => {
          if (user && !user.isAdmin) {
            console.log(user._id);
            try {
              const response = await dispatch(getAllLoans(user._id)); // Assuming user._id is available
              console.log(response); 
              setAllLoans(response.payload.allLoans);
            } catch (error) {
              console.error("Error fetching loans:", error);
            }
          }else if(user && user.isAdmin){
            console.log(user._id);
            try {
              const response = await dispatch(getAllLoans(user._id)); // Assuming user._id is available
              console.log(response); 
              setAllLoans(response.payload.allLoans);
            } catch (error) {
              console.error("Error fetching loans:", error);
            }
          }
        };
      
        fetchData();
      }, [user, dispatch]);
      

    // {loans && console.log(loans)}
    function handleChangePage(event, newpage) {
        setpg(newpage);
    }
  
    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value,allLoans&& allLoans.length));
        setpg(0);
    }
  return (
    <Box sx={{ alignItems:"center",  display: "flex", flexDirection:"column" , width:"83%", padding:"20px 0 20px 0"}}>
        <Paper>
            <h1 style={{ textAlign: "center", color: "green" , paddingBottom:"10px"}}>All Loans Status</h1>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell>Amount</TableCell>
      <TableCell>Term</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>More Details</TableCell>

    </TableRow>
  </TableHead>
  <TableBody>
    {allLoans.length > 0  &&
      allLoans.map((element, index) => (
        <TableRow key={index}>
          <TableCell>{element.amount}</TableCell>
          <TableCell>{element.term}</TableCell>
          <TableCell>{element.status}</TableCell>
          <TableCell><Link to={`/loan/${element._id}`}>click</Link></TableCell>

        </TableRow>
      ))}
  </TableBody>
</Table>

            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </Box>
  )
}

export default UserAllLoans