import { klarnaHtml } from '../helpers'
import {
    BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, Outlet, useOutletContext, useNavigate
} from "react-router-dom"

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteGoogleOutlined from '../images/favoritegoogle.svg'
import { ReactComponent as FavoriteOutlined } from '../images/favoritegoogleoutlined.svg'
import { ReactComponent as CustomIcon } from '../images/shoppingbag.svg'

import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'

const CheckoutMobile = ({ cart, removeFromCart, changeVariantQuantity, format, html_snippet }) => {

    return (
        <>


            <Grid container>


                <Grid container>

                    {cart && Object.keys(cart).map((key, i) => {
                        const itemVariant = cart[key].variants?.find(e => e.id === parseInt(key))
                        return <>
                            <Grid container paddingTop={i !== 0 ? '14px' : '4px'} paddingBottom={1} sx={{ borderBottom: (i + 1) !== Object.keys(cart).length && '.1rem solid #dadada' }} display='flex' alignItems="center" flexDirection='row' alignSelf='center' justifyContent='center'>
                                <Grid item xs='auto'>
                                    <IconButton disableFocusRipple disableRipple onClick={() => removeFromCart(key)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2}>
                                    {/* <img src={cart[key].images[0].path} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} /> */}
                                    <Box component={Link} to={`/product/${cart[key].id}/${cart[key].name}`}>
                                        <img style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} src={productPlaceholder} />
                                    </Box>
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
                                            Totalt:&nbsp;<b>{format(cart[key].quantity * cart[key].price * (1 + (cart[key].vatRateSE / 10000)) / 100)} kr</b>
                                        </Grid>
                                    </Grid>


                                </Grid>
                            </Grid>
                        </>
                    })}

                </Grid>





                {cart && Object.keys(cart).map((key, i) => {
                    const itemVariant = cart[key].variants?.find(e => e.id === parseInt(key))
                    return <>

                        <Grid container ml={1} mr={1}>

                            <Grid item xs={3}>
                                <Grid container flexDirection='column'>
                                    <Grid item xs>
                                        <Box component={Link} to={`/product/${cart[key].id}/${cart[key].name}`}>
                                            <img style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} src={productPlaceholder} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs display='flex' justifyContent='center' pl={1} pr={1}>

                                        <IconButton sx={{
                                            borderRadius: 0,
                                            border: "1px solid",
                                            // borderColor: "primary.main",
                                            borderColor: "#222",
                                            width: "100%",
                                            color: '#222',
                                            padding: 0.8
                                        }} aria-label="heart" size="large" >
                                            <FavoriteOutlined style={{
                                                width: '35',
                                                height: '35',
                                            }} />
                                        </IconButton>

                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs>

                                <h4 style={{ margin: 0 }}>{cart[key].name} - {itemVariant?.name}</h4>

                                {cart[key].brand}
                                <br />
                                {format(cart[key].price * (1 + (cart[key].vatRateSE / 10000)) / 100)}
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
                                    <Grid item xs sx={{ minWidth: 150 }} display='flex' justifyContent='end' alignItems='center'>
                                        Totalt:&nbsp;<b>{format(cart[key].quantity * cart[key].price * (1 + (cart[key].vatRateSE / 10000)) / 100)} kr</b>
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid item xs='auto'>
                                <IconButton disableFocusRipple disableRipple onClick={() => removeFromCart(key)}>
                                    <DeleteIcon />
                                </IconButton>

                            </Grid>

                        </Grid>

                    </>
                })}




                <Grid display='flex' item xs={12} style={{ height: '100%' }} sx={{ m: 0, mt: 0, mb: 0 }}>
                    <iframe
                        title='klarnaCheckout'
                        id='klarna-checkout'
                        className='iframe'
                        srcDoc={klarnaHtml(html_snippet)}
                        style={{ width: '100%', height: 1170 }}
                        frameBorder='0'
                        scrolling='no'
                        allowfullscreen=''
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default CheckoutMobile