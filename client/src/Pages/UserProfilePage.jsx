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
import { useSelector } from 'react-redux';
import { ProfileForm } from '../Components/UserProfileComponents/ProfileForm';

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
    return (
        <Box style={{ position: "relative", width: "-webkit-fill-available", gap:"50px", padding: "20px 10px 20px 10px", alignItems:"center",  display: "flex", flexDirection:"column" }}>
            <Box sx={{ width: "50%", height: "max-content" }}>
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