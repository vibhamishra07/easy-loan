import { Box, Divider, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    height:"100px !important"
  };
const SideNav = () => {
    
  return (
    <>
    <Box sx={{width:"200px", minheight:'max-content', height:"100vh", display:"flex", justifyContent:"space-between"}}>
     <Box sx={{flex:1, padding:"10px 10px 0 10px"}}>
     <List sx={style} component="nav" aria-label="Nav Items">
      <ListItem button>
        <ListItemText primary="Profile" sx={{textAlign:"center"}} />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="All loans" sx={{textAlign:"center"}}/>
      </ListItem>
      <ListItem button>
        <ListItemText primary="Request For Loan" sx={{textAlign:"center"}}/>
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Settings" sx={{textAlign:"center"}}/>
      </ListItem>
    </List>
     </Box>
     <Divider orientation="vertical" flexItem />
    </Box>
    
    </>
  )
}

export default SideNav