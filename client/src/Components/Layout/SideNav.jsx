import { Box, Divider, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    height:"100px !important"
  };
const SideNav = () => {
    
  return (
    <>
    <Box sx={{width:"200px", minheight:'max-content', height:"90.8vh", display:"flex", justifyContent:"space-between", position:"sticky", top:'64px'}}>
     <Box sx={{flex:1, padding:"10px 10px 0 10px"}}>
     <List sx={style} component="nav" aria-label="Nav Items">
      <ListItem button sx={{display:"flex", justifyContent:"center"}}>
       <Link to="/"  style={{textAlign:"center", color:"black", textDecoration:"none",textAlign:"center"}}><ListItemText primary="Profile"/></Link> 
      </ListItem>
      <Divider />
      <ListItem button divider sx={{display:"flex", justifyContent:"center"}}>
      <Link to="/all-loans"  style={{textAlign:"center", color:"black", textDecoration:"none",textAlign:"center"}}><ListItemText primary="ALL Loans"/></Link> 
      </ListItem>
      <ListItem button sx={{display:"flex", justifyContent:"center"}}>
       <Link to="/request-loan"  style={{textAlign:"center", color:"black", textDecoration:"none",textAlign:"center"}}><ListItemText primary="Request For Loan"/></Link> 
      </ListItem>
      <Divider light />
      <ListItem button sx={{display:"flex", justifyContent:"center"}}>
      <Link to="/settings"  style={{textAlign:"center", color:"black", textDecoration:"none",textAlign:"center"}}><ListItemText primary="Settings"/></Link> 
      </ListItem>
    </List>
     </Box>
     <Divider orientation="vertical" flexItem />
    </Box>
    
    </>
  )
}

export default SideNav