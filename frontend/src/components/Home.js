import { useQuery } from '@tanstack/react-query'
import { getDesigners } from '../requests'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from "react-router-dom"

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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp'
import CloseIcon from '@mui/icons-material/Close'
import Badge from '@mui/material/Badge'

import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'

const Item = styled(Paper)(({ theme }) => ({
    /* backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', */
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    /* color: theme.palette.text.secondary, */
}));

const margin = 10
const maxWidth = 1250
const minHeight = 39
const minHeight2 = 157

const Home = ({ categories, cart, removeFromCart, changeVariantQuantity }) => {

    const [searchText, setSearchText] = useState('')
    const [cartOpen, setCartOpen] = useState(false)

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
        setCartOpen(false)
    }

    const totalSumInCart = Object.keys(cart).reduce((acc, key) => acc + (cart[key].quantity * cart[key].price), 0)


    return (
        <>
            <Drawer
                anchor='right'
                open={cartOpen}
                onClose={toggleDrawer()}
                PaperProps={{
                    sx: { width: 400 },
                }}>
                <Grid container direction='column' height='100vh'>
                    <Grid item xs>
                        <Grid container>
                            <Grid container margin={1} display='flex' alignItems="center" >
                                <Grid item xs>
                                    <h2 style={{ margin: 0 }}>Din varukorg</h2>
                                </Grid>
                                <Grid item xs display='flex' justifyContent='end'>
                                    <IconButton size='small' onClick={() => setCartOpen(false)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container display='flex' justifyContent='end'>
                            {Object.keys(cart).map((key, i) => {
                                const itemVariant = cart[key].variants?.find(e => e.id === parseInt(key))
                                return <>
                                    <Grid container paddingTop={(i + 1) === Object.keys(cart).length && '14px'} paddingBottom={1} sx={{ borderBottom: (i + 1) !== Object.keys(cart).length && '.1rem solid #dadada' }} display='flex' alignItems="center" flexDirection='row' alignSelf='center' justifyContent='center'>
                                        <Grid item xs='auto'>
                                            <IconButton onClick={() => removeFromCart(key)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {/* <img src={cart[key].images[0].path} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} /> */}
                                            <img style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} src={productPlaceholder} />
                                        </Grid>
                                        <Grid item xs='auto' sx={{ minWidth: 270 }}>
                                            <h3 style={{ margin: 0 }}>{cart[key].name} - {itemVariant?.name}</h3>

                                            {cart[key].brand}
                                            <br />

                                            <Grid container>

                                                <Grid item xs>
                                                    <IconButton onClick={() => changeVariantQuantity(-1, key)} color="primary" aria-label="increment-product">
                                                        <RemoveCircleSharpIcon style={{ fontSize: '34px' }} />
                                                    </IconButton>
                                                    {cart[key]?.quantity}
                                                    <IconButton onClick={() => changeVariantQuantity(1, key)} color="primary" aria-label="dimunition-product">
                                                        <AddCircleSharpIcon style={{ fontSize: '34px' }} />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs sx={{ minWidth: 170 }} display='flex' justifyContent='end' alignItems='center'>
                                                    <b>Totalt: {cart[key].quantity * cart[key].price} kr</b>
                                                </Grid>
                                            </Grid>


                                        </Grid>
                                    </Grid>
                                </>
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs='auto'>
                        <Grid container backgroundColor='#f4f4f4' display='flex' direction='column'>
                            <Grid item xs='auto' margin={2}>
                                <Grid container>
                                    <Grid item xs>
                                        Totalsumma
                                    </Grid>
                                    <Grid item xs display='flex' justifyContent='end' alignItems='center'>
                                        <b>{totalSumInCart} kr</b>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs='auto' margin={2}>
                                <Button variant='contained' fullWidth>GÅ TILL KASSAN</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Drawer>

            <Grid container direction='column'>
                <Grid item xs='auto'>
                    <Grid container backgroundColor='#25272e' justifyContent='center'>
                        <Grid item xs={12} style={{ minHeight, maxWidth }} sx={{ m: margin, mt: 0, mb: 0 }}>
                            <Grid container>
                                <Grid item minHeight={minHeight} xs='auto'>
                                    <Box display='flex' alignItems='center' height='100%'>
                                        hej
                                    </Box>
                                </Grid>
                                <Grid item xs minHeight={minHeight} display='flex' justifyContent='flex-end'>
                                    <Box display='flex' alignItems='center' height='100%'>
                                        Fri frakt vid 499:- / Snabba leveranser
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container backgroundColor='#2e3037' justifyContent='center'>
                        <Grid item xs={12} style={{ maxWidth, minHeight: minHeight2 }} sx={{ m: margin, mt: 0, mb: 0 }}>
                            <Grid container paddingTop={3}>

                                <Grid item xs={4}>
                                    <Box display='flex' alignItems='center' height='100%'>
                                        <img className='img' src={placeholderLogo} />
                                    </Box>
                                </Grid>

                                <Grid item xs={4}>
                                    <Box display='flex' alignItems='center' height='100%'>
                                        <TextField id="outlined-search" type="search" color='white' fullWidth
                                            variant="outlined"
                                            label={searchText ? " " : "Sök..."}
                                            InputLabelProps={{ shrink: false }}
                                            value={searchText}
                                            onChange={({ target }) => setSearchText(target.value)} />
                                    </Box>
                                </Grid>

                                <Grid item xs={4} display='flex' justifyContent='flex-end'>

                                    <Box marginRight={1} display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>

                                        <Button
                                            style={{ height: 50 }}
                                        /* sx={{ '&:hover': { background: 'none', }, }} */
                                        >
                                            <Grid container direction='column' display='flex' alignItems='center'>
                                                <PersonOutlineOutlinedIcon />
                                                LOGGA IN
                                            </Grid>
                                        </Button>
                                    </Box>

                                    <Box marginRight={1} display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>
                                        <Button
                                            onClick={() => setCartOpen(!cartOpen)}
                                            style={{ height: 50 }}
                                        /* sx={{ '&:hover': { background: 'none', }, }} */
                                        >
                                            <Grid container direction='column' display='flex' alignItems='center'>
                                                <Badge badgeContent={Object.keys(cart).length} color="secondary" sx={{ "& .MuiBadge-badge": { } }}>
                                                    <ShoppingCartIcon />
                                                </Badge>
                                                varukorg
                                            </Grid>
                                        </Button>
                                    </Box>
                                    <Box display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>
                                        <Button
                                            style={{ height: 50 }}
                                        /* sx={{ '&:hover': { background: 'none', }, }} */
                                        >
                                            <Grid container direction='column' display='flex' alignItems='center'>
                                                <PersonOutlineOutlinedIcon />
                                                LOGGA IN
                                            </Grid>
                                        </Button>
                                    </Box>
                                </Grid>

                            </Grid>
                            <Grid container paddingTop={2}>
                                <Grid item xs={6}>
                                    <Stack direction="row" spacing={1}>
                                        {categories.map(category =>
                                            <>
                                                <Button sx={{ textTransform: 'none' }} component={Link} to={`/${category.name.toLowerCase()}`}>
                                                    <Item
                                                        style={{ textDecoration: 'none', color: 'white' }}
                                                        sx={{ backgroundColor: 'transparent' }} elevation={0}>
                                                        {category.name}
                                                    </Item>
                                                </Button>
                                            </>
                                        )}
                                    </Stack>

                                </Grid>
                                <Grid item xs display='flex' justifyContent='flex-end'>
                                    hej

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid >
                </Grid>
                <Grid item xs>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    )
}

export default Home