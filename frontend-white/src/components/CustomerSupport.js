import { Link, Outlet, useOutletContext } from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useWindowSize } from '../helpers';

const CustomerSupport = () => {

    const [, headerHeight, footerHeight] = useOutletContext();


    const windowSize = useWindowSize();

    return (
        <>
            <Grid container style={{ height: `calc(100vh - ${footerHeight + headerHeight - 0.5}px)` }}>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1, backgroundColor: '#000', padding: 4, px: 2, color: '#fff' }}>
                        <Typography variant="h4" gutterBottom component="div" style={{ textAlign: 'center', fontSize: '1.6rem' }}>
                            CUSTOMER SUPPORT
                        </Typography>
                        <List>
                            {/*
                             <ListItemButton component={Link} to='track-my-order'
                             sx={{ borderBottom: '1px solid grey', '&:last-child': { borderBottom: 'none' }, px: 0 }}>
                             <ListItemText primary="TRACK MY ORDER" />
                                <ArrowForwardIosIcon />
                                </ListItemButton>
                             */}
                            <ListItemButton component={Link} to='faq'
                                sx={{ borderBottom: '1px solid grey', '&:last-child': { borderBottom: 'none' }, px: 0 }}>
                                <ListItemText primary="FAQ" />
                                <ArrowForwardIosIcon />
                            </ListItemButton>
                            <ListItemButton component={Link} to='returns'
                                sx={{ borderBottom: '1px solid grey', '&:last-child': { borderBottom: 'none' }, px: 0 }}>
                                <ListItemText primary="RETURNS" />
                                <ArrowForwardIosIcon />
                            </ListItemButton>
                            <ListItemButton component={Link} to='contact-us'
                                sx={{ borderBottom: '1px solid grey', '&:last-child': { borderBottom: 'none' }, px: 0 }}>
                                <ListItemText primary="CONTACT US" />
                                <ArrowForwardIosIcon />
                            </ListItemButton>
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Outlet context={[windowSize]} />
                </Grid>
            </Grid>
        </>
    );
}

export default CustomerSupport;