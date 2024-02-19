import { useState } from 'react'
import { Link, Outlet } from "react-router-dom"
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import ListItemText from '@mui/material/ListItemText'
import CloseIcon from '@mui/icons-material/Close'
import Badge from '@mui/material/Badge'
import FooterMobile from './FooterMobile'
import MenuIcon from '@mui/icons-material/Menu'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import CartDrawer from './blocks/CartDrawer'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'


const HomeMobile = ({ categories, cart, removeFromCart, changeVariantQuantity, totalSumInCart, format, PersonOutlineOutlinedIcon, ShoppingCartIcon,
    placeholderLogo, location, cartOpen, setCartOpen, toggleDrawer, Grid, Box, Button, IconButton, baseUrl
}) => {

    const [menuOpen, setMenuOpen] = useState(false);

    const [menuDrawerOpen, setMenuDrawerOpen] = useState(categories.map(e => false));

    const toggleMenuDrawer = (state) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) return;

        setMenuOpen(state);
    };

    const handleMenuDrawerOpen = (i) => {
        const firstValues = [...menuDrawerOpen]
        const values = categories.map(e => false)
        values[i] = !firstValues[i]
        setMenuDrawerOpen(values)
    }

    return (
        <>

            <CartDrawer location={location} cartOpen={cartOpen} setCartOpen={setCartOpen} cart={cart} format={format} removeFromCart={removeFromCart} Grid={Grid}
                toggleDrawer={toggleDrawer} CloseIcon={CloseIcon} Box={Box} Link={Link} productPlaceholder={productPlaceholder}
                changeVariantQuantity={changeVariantQuantity} totalSumInCart={totalSumInCart} Button={Button} swipeable={true} SwipeableDrawer={SwipeableDrawer} />

            <SwipeableDrawer
                anchor='left'
                open={menuOpen}
                onClose={toggleMenuDrawer(false)}
                onOpen={toggleMenuDrawer(true)}
                PaperProps={{
                    sx: { width: 300, backgroundColor: '#faf9f8' },
                }}>
                <List>
                    {categories.map((topCategory, i) => <>
                        <ListItemButton onClick={() => handleMenuDrawerOpen(i)}>
                            {/* <InboxIcon /> */}
                            <ListItemText primary={topCategory.name} />
                            {menuDrawerOpen[i] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={menuDrawerOpen[i]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}
                                    component={Link}
                                    to={`/${topCategory.name.toLowerCase()}`}
                                    onClick={toggleMenuDrawer(false)}
                                >
                                    <ListItemText primary={`Alla ${topCategory.name.toLowerCase()}`} />
                                </ListItemButton>


                                {topCategory.SubOne.map(category =>
                                    <ListItemButton sx={{ pl: 4 }}
                                        component={Link}
                                        to={`/${topCategory.name.toLowerCase()}/${category.name.toLowerCase()}`}
                                        onClick={toggleMenuDrawer(false)}
                                    >
                                        <ListItemText primary={category.name} />
                                    </ListItemButton>
                                )}
                            </List>

                        </Collapse>

                    </>)}
                </List>
            </SwipeableDrawer>



            <Grid container paddingLeft={2} paddingRight={2} paddingTop={0.8}>
                <LocalShippingOutlinedIcon fontSize='small' /> &nbsp; Fri leverans vid köp över 499 kr
            </Grid>

            <Grid container padding={1} paddingTop={1}>
                <Grid item xs='auto'>
                    <IconButton onClick={toggleMenuDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Grid>
                <Grid item xs display='flex' component={Link} to='/' >
                    <img src={placeholderLogo} />
                </Grid>
                <Grid item xs='auto'>
                    <IconButton>
                        <PersonOutlineOutlinedIcon />
                    </IconButton>

                    <IconButton onClick={setCartOpen} >
                        <Badge badgeContent={cart && Object.keys(cart).length} color="secondary" sx={{ "& .MuiBadge-badge": {} }}>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container direction='column'>
                <Grid item xs>
                    <Outlet />
                </Grid>
                <Grid item xs>
                    <Grid container display='flex' justifyContent='center'>
                        <Grid item xs style={{ height: '100%' }} sx={{ m: 0, mt: 0, mb: 0, pt: 5 }}>
                            <FooterMobile />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>

    )
}

export default HomeMobile