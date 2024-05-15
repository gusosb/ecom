import { useState, useRef, useEffect } from 'react'
import { Link, Outlet, useLocation } from "react-router-dom"
import Footer from './Footer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import placeholderLogo from '../images/logoipsum-288.svg'
import { ReactComponent as ShoppingCartIcon } from '../images/shoppingbag.svg'
import { ReactComponent as PersonOutlineOutlinedIcon } from '../images/person.svg'
import HomeMobile from './HomeMobile'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Badge from '@mui/material/Badge'
import { useWindowSize, StyledButton } from '../helpers'
import CartDrawer from './blocks/CartDrawer';
import Typography from '@mui/material/Typography';
import { ReactComponent as SURDEGSVG } from '../images/sourdoughsvg.svg';
import HelmetProvider from './blocks/HelmetProvider';



const Home = ({ categories, cart, removeFromCart, changeVariantQuantity, totalSumInCart, format, baseUrl, isLoading }) => {

    const [cartOpen, setCartOpen] = useState(false)

    const toggleDrawer = () => (event) => {
        if (event?.type === 'keydown' && (event?.key === 'Tab' || event?.key === 'Shift')) return
        setCartOpen(false)
    }
    const location = useLocation();
    const windowSize = useWindowSize();


    const headerRef = useRef(null);
    const footerRef = useRef(null);
    const [footerHeight, setFooterHeight] = useState(undefined);
    const [headerHeight, setHeaderHeight] = useState(undefined);

    useEffect(() => {
        footerRef?.current?.clientHeight && setFooterHeight(footerRef.current.clientHeight);
        headerRef?.current?.clientHeight && setHeaderHeight(headerRef.current.clientHeight);
    }, [headerRef, footerRef]);



    if (windowSize.width < 800) return <HomeMobile SURDEGSVG={SURDEGSVG} cart={cart} location={location} cartOpen={cartOpen} setCartOpen={setCartOpen} toggleDrawer={toggleDrawer} totalSumInCart={totalSumInCart} changeVariantQuantity={changeVariantQuantity}
        PersonOutlineOutlinedIcon={PersonOutlineOutlinedIcon} ShoppingCartIcon={ShoppingCartIcon} placeholderLogo={placeholderLogo} format={format} categories={categories} Grid={Grid}
        Box={Box} Button={Button} IconButton={IconButton} baseUrl={baseUrl} removeFromCart={removeFromCart} windowSize={windowSize} HelmetProvider={HelmetProvider} isLoading={isLoading}
    />

    return (
        <>
            <HelmetProvider />

            <CartDrawer location={location} cartOpen={cartOpen} setCartOpen={setCartOpen} cart={cart} format={format} removeFromCart={removeFromCart} Grid={Grid}
                toggleDrawer={toggleDrawer} CloseIcon={CloseIcon} Box={Box} Link={Link} windowSize={windowSize}
                changeVariantQuantity={changeVariantQuantity} totalSumInCart={totalSumInCart} Button={Button} baseUrl={baseUrl}
            />


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // stack children vertically
                    minHeight: '100vh', // minimum height of 100% of the viewport height
                }}
            >
                <Box ref={headerRef} sx={{ position: 'sticky', top: 0, zIndex: 1100, bgcolor: 'background.paper' }}>

                    <Grid container borderBottom={1} paddingTop={1} paddingBottom={1} borderColor='#e6e6e6'>
                        <Grid item xs>
                            <Box paddingLeft={2} display="flex" gap={2}>
                                <StyledButton component={Link} to='/shop'>SHOP</StyledButton>
                                <StyledButton component={Link} to='/discover'>DISCOVER</StyledButton>
                                <StyledButton component={Link} to='/the-cashmere'>THE CASHMERE</StyledButton>
                            </Box>
                        </Grid>

                        <Grid item xs display="flex" justifyContent="center" alignItems="center">
                            <Typography component={Link} sx={{ color: 'inherit', textDecoration: 'inherit', fontSize: '30px' }} to="/" variant="h5">
                                GUSTAF LUND
                            </Typography>
                        </Grid>

                        <Grid item xs display='flex' justifyContent='end'>
                            <Box paddingRight={4}>
                                <IconButton onClick={() => setCartOpen(!cartOpen)} color="inherit" aria-label="shopping-cart">
                                    <Badge badgeContent={cart && Object.keys(cart).length} color="secondary" sx={{ "& .MuiBadge-badge": {} }}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <Outlet context={[setCartOpen, headerHeight, footerHeight]} />
                </Box>

                <Box ref={footerRef}>
                    <Footer />
                </Box>

            </Box>
        </>
    );
}

export default Home;