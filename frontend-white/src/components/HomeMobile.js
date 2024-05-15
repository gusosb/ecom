import { useState, useRef, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom';
import FooterMobile from './FooterMobile';
import HelmetProvider from './blocks/HelmetProvider';
import { StyledButton } from '../helpers';

import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import CartDrawer from './blocks/CartDrawer';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';


const HomeMobile = ({ cart, removeFromCart, changeVariantQuantity, totalSumInCart, format, ShoppingCartIcon,
    location, cartOpen, setCartOpen, toggleDrawer, Grid, Box, Button, IconButton, baseUrl, windowSize, SURDEGSVG, isLoading
}) => {

    const footerRef = useRef(null);
    const [footerHeight, setFooterHeight] = useState(undefined);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        footerRef?.current?.clientHeight && setFooterHeight(footerRef.current.clientHeight);
    }, [footerRef]);

    return (
        <>
            <HelmetProvider />

            <CartDrawer location={location} cartOpen={cartOpen} setCartOpen={setCartOpen} cart={cart} format={format} removeFromCart={removeFromCart} Grid={Grid}
                toggleDrawer={toggleDrawer} CloseIcon={CloseIcon} Box={Box} Link={Link}
                changeVariantQuantity={changeVariantQuantity} totalSumInCart={totalSumInCart} Button={Button} baseUrl={baseUrl} swipeable={true}
                SwipeableDrawer={SwipeableDrawer} windowSize={windowSize} drawerOpen={drawerOpen}
            />


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100dvh',
                }}
            >

                <Box sx={{ flexGrow: 1 }}>
                    <Outlet context={[setCartOpen, footerHeight]} />
                </Box>

                {!location.pathname.startsWith('/shop') &&
                    <FooterMobile />
                }


                <Grid container borderTop={1} paddingTop={1} paddingBottom={1} borderColor='#e6e6e6'
                    ref={footerRef}
                    sx={{
                        position: 'sticky',
                        bottom: 0,
                        zIndex: 1200,
                        bgcolor: 'background.paper',
                    }}
                >




                    <Grid item xs={2}>

                        {drawerOpen ?
                            <IconButton onClick={() => setDrawerOpen(false)} color="inherit" aria-label="drawer">
                                <CloseIcon />
                            </IconButton>
                            : <IconButton onClick={() => setDrawerOpen(true)} color="inherit" aria-label="drawer">
                                <MenuIcon />
                            </IconButton>}


                        <Drawer ModalProps={{ keepMounted: false }} sx={{ zIndex: 100 }} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                            <Box sx={{ minWidth: windowSize.width - 50, height: '100%', display: 'flex', alignItems: 'center' }}>
                                <List sx={{ width: '100%' }}>
                                    <ListItem button onClick={() => setDrawerOpen(false)} component={Link} to='/shop' sx={{ py: 0 }}>
                                        <ListItemText primary={<Typography variant="body1" style={{ fontSize: '1.5rem' }}>SHOP</Typography>} />
                                    </ListItem>
                                    <ListItem button onClick={() => setDrawerOpen(false)} component={Link} to='/discover' sx={{ py: 0 }}>
                                        <ListItemText primary={<Typography variant="body1" style={{ fontSize: '1.5rem' }}>DISCOVER</Typography>} />
                                    </ListItem>
                                    <ListItem button onClick={() => setDrawerOpen(false)} component={Link} to='/the-cashmere' sx={{ py: 0 }}>
                                        <ListItemText primary={<Typography variant="body1" style={{ fontSize: '1.5rem' }}>THE CASHMERE</Typography>} />
                                    </ListItem>


                                    <Divider sx={{ width: '50px', marginLeft: 2, my: 2, backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />


                                    <ListItem button onClick={() => setDrawerOpen(false)} component={Link} to='/customer-support/faq' sx={{ py: 0 }}>
                                        <ListItemText primary={<Typography variant="body1" style={{ fontSize: '1.0rem' }}>CUSTOMER SUPPORT</Typography>} />
                                    </ListItem>
                                    <ListItem button onClick={() => setDrawerOpen(false)} component={Link} to='/terms-and-conditions' sx={{ py: 0 }}>
                                        <ListItemText primary={<Typography variant="body1" style={{ fontSize: '1.0rem' }}>TERMS & CONDITIONS</Typography>} />
                                    </ListItem>


                                </List>
                            </Box>
                        </Drawer>






                    </Grid>

                    <Grid item xs display="flex" justifyContent="center" alignItems="center">
                        <Typography onClick={() => setDrawerOpen(false)} component={Link} sx={{ color: 'inherit', textDecoration: 'inherit' }} to="/" variant="h6">
                            GUSTAF LUND
                        </Typography>
                    </Grid>

                    <Grid item xs={2} display='flex' justifyContent='end' >
                        <Box sx={{ pr: 2 }}>
                            <IconButton onClick={() => setCartOpen(!cartOpen)} color="inherit" aria-label="shopping-cart">
                                <Badge badgeContent={cart && Object.keys(cart).length} color="secondary" sx={{ "& .MuiBadge-badge": {} }}>
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>



            </Box>
        </>
    );
}

export default HomeMobile;