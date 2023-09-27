import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/features/authSlice';

export default function TopNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.auth)


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    dispatch(logout());
  }

  return (
    <Box sx={{ flexGrow: 1, top:0, zIndex:10, backgroundColor:"#052a7dd6", }} position={"sticky"}>
      
      <AppBar position="static" sx={{backgroundColor:"#052a7dd6", top:0}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
            <img src={require(`${"../../Assets/images/pay.png"}`)} height="40px"/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Easy Loans
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} >
                  <Box sx={{padding:"4px"}}>
                    <Typography sx={{fontSize:"1.2rem"}}>Account</Typography>
                    {user&&<Typography sx={{fontSize:"1rem",color:"#6c737f "}}>{user.fullname}</Typography>}
                  </Box>
                </MenuItem>
                <hr style={{color:"#f2f4f7", margin:"4px 0px 4px 0px", borderColor:"#f2f4f7"}}></hr>
                <MenuItem onClick={handleLogout} sx={{paddingLeft:"14px", textAlign:"center"}}>Sign out</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}