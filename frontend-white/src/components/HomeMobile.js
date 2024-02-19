import { Link, Outlet } from "react-router-dom"
import FooterMobile from './FooterMobile'

import CloseIcon from '@mui/icons-material/Close'
import Badge from '@mui/material/Badge'
import { StyledButton } from '../helpers'
import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'
import CartDrawer from './blocks/CartDrawer';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState, useRef, useEffect } from 'react'



const HomeMobile = ({ cart, removeFromCart, changeVariantQuantity, totalSumInCart, format, ShoppingCartIcon,
    location, cartOpen, setCartOpen, toggleDrawer, Grid, Box, Button, IconButton, baseUrl, windowSize
}) => {

    const footerRef = useRef(null);
    const [footerHeight, setFooterHeight] = useState(undefined);

    useEffect(() => {
        footerRef?.current?.clientHeight && setFooterHeight(footerRef.current.clientHeight);
    }, [footerRef]);

    return (
        <>
            <CartDrawer location={location} cartOpen={cartOpen} setCartOpen={setCartOpen} cart={cart} format={format} removeFromCart={removeFromCart} Grid={Grid}
                toggleDrawer={toggleDrawer} CloseIcon={CloseIcon} Box={Box} Link={Link} productPlaceholder={productPlaceholder}
                changeVariantQuantity={changeVariantQuantity} totalSumInCart={totalSumInCart} Button={Button} baseUrl={baseUrl} swipeable={true}
                SwipeableDrawer={SwipeableDrawer} windowSize={windowSize}
            />


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // stack children vertically
                    minHeight: '100vh', // minimum height of 100% of the viewport height
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
                        bottom: 0, // sticks to the bottom
                        zIndex: 1100, // ensures it's above other content
                        bgcolor: 'background.paper'
                    }}>
                    {/* <Grid item xs>
                            <Box paddingLeft={2} display="flex" gap={2}>
                                <StyledButton component={Link} to='/shop'>shop</StyledButton>
                                <StyledButton>discover</StyledButton>
                            </Box>
                        </Grid> */}

                    <Grid item xs={2}>
                        <StyledButton component={Link} to='/shop'>shop</StyledButton>
                    </Grid>

                    <Grid item xs>
                        <Typography variant="h6" textAlign='center'>GUSTAF LUND</Typography>
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