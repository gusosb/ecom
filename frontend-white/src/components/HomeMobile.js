import { Link, Outlet } from "react-router-dom"
import FooterMobile from './FooterMobile'

import CloseIcon from '@mui/icons-material/Close'
import Badge from '@mui/material/Badge'
import { StyledButton } from '../helpers'
import CartDrawer from './blocks/CartDrawer';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState, useRef, useEffect } from 'react'



const HomeMobile = ({ cart, removeFromCart, changeVariantQuantity, totalSumInCart, format, ShoppingCartIcon,
    location, cartOpen, setCartOpen, toggleDrawer, Grid, Box, Button, IconButton, baseUrl, windowSize, SURDEGSVG
}) => {

    const footerRef = useRef(null);
    const [footerHeight, setFooterHeight] = useState(undefined);

    useEffect(() => {
        footerRef?.current?.clientHeight && setFooterHeight(footerRef.current.clientHeight);
    }, [footerRef]);

    return (
        <>
            <CartDrawer location={location} cartOpen={cartOpen} setCartOpen={setCartOpen} cart={cart} format={format} removeFromCart={removeFromCart} Grid={Grid}
                toggleDrawer={toggleDrawer} CloseIcon={CloseIcon} Box={Box} Link={Link}
                changeVariantQuantity={changeVariantQuantity} totalSumInCart={totalSumInCart} Button={Button} baseUrl={baseUrl} swipeable={true}
                SwipeableDrawer={SwipeableDrawer} windowSize={windowSize}
            />


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
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
                        zIndex: 1100,
                        bgcolor: 'background.paper'
                    }}>

                    <Grid item xs={2}>
                        <StyledButton component={Link} to='/shop'>HANDLA</StyledButton>
                    </Grid>

                    <Grid item xs display="flex" justifyContent="center" alignItems="center">
                        <Typography component={Link} sx={{ color: 'inherit', textDecoration: 'inherit' }} to="/" variant="h6">
                            SURDEGSHÖRNAN
                        </Typography>
                        <SURDEGSVG />
                    </Grid>

                    <Grid item xs={2} display='flex' justifyContent='end' >
                        <Box sx={{ pr: 2 }}>
                            <IconButton onClick={() => setCartOpen(!cartOpen)} color="inherit">
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