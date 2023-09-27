import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileForm } from '../Components/UserProfileComponents/ProfileForm';
import { useEffect } from 'react';
import { getUser } from '../Redux/features/authSlice';

const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
};

export const UserProfilePage = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch=useDispatch();
    useEffect(()=>{
    user&&dispatch(getUser({id:user._id}))
  },[user])
    return (
        <Box sx={{ position: "relative", width: "83%", gap:"50px",  alignItems:"center",  display: "flex", flexDirection:"column" }}>
            <Box sx={{ width: "50%", height: "max-content",padding: "20px 10px 20px 10px", }}>
                <Card  >
                    <CardContent>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Avatar
                                src={"/"}
                                sx={{
                                    height: 80,
                                    mb: 2,
                                    width: 80
                                }}
                            />
                            <Typography
                                gutterBottom
                                variant="h5"
                            >
                                {user.fullname}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {user.email}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {user.mobileNumber}
                            </Typography>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button
                            fullWidth
                            variant="text"
                        >
                            Upload picture
                        </Button>
                    </CardActions>
                </Card>
            </Box>
            <Box sx={{dispaly:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"80%",}}>
                <Typography variant='h4'>Complete Your Profile</Typography>
                <ProfileForm/>

            </Box>
        </Box>
    )
}