import { useQuery } from '@tanstack/react-query'
import { getDesigners } from '../requests'
import { styled } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet, useLocation } from "react-router-dom"
import Footer from './Footer'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import placeholderLogo from '../images/logoipsum-288.svg'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp'
import CloseIcon from '@mui/icons-material/Close'
import Badge from '@mui/material/Badge'
import CardMedia from '@mui/material/CardMedia'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover';
import Popper from '@mui/material/Popper';
import FooterMobile from './FooterMobile'
import MenuIcon from '@mui/icons-material/Menu'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import CartDrawer from './blocks/CartDrawer'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'

const Item = styled(Paper)(({ theme }) => ({
    /* backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', */
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    /* color: theme.palette.text.secondary, */
}))

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
})


const HomeMobile = ({ categories, cart, removeFromCart, changeVariantQuantity, totalSumInCart, format, PersonOutlineOutlinedIcon, ShoppingCartIcon, placeholderLogo, location, cartOpen, setCartOpen, toggleDrawer }) => {

    console.log(totalSumInCart);

    const [menuOpen, setMenuOpen] = useState(false);


    const [menuDrawerOpen, setMenuDrawerOpen] = useState(categories.map(e => false));
    console.log(categories);



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
                    sx: { width: 300 },
                }}
            >
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
                <LocalShippingOutlinedIcon fontSize='small' /> &nbsp; Fri frakt över 499 kr
            </Grid>

            <Grid container padding={1} paddingTop={1}>
                <Grid item xs='auto'>
                    <IconButton onClick={toggleMenuDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Grid>
                <Grid item xs display='flex'>
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