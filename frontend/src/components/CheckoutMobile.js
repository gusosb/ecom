import { klarnaHtml } from '../helpers'
import { Link } from "react-router-dom"

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';

import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'

const CheckoutMobile = ({ cart, removeFromCart, changeVariantQuantity, format, html_snippet, setCartOpen, baseURL }) => {

    return (
        <>
            <Grid container marginTop={2}>

                {cart && Object.keys(cart).map((key, i) => {
                    const itemVariant = cart[key].variants?.find(e => e.id === parseInt(key))
                    const path = cart[key].images[0]?.path
                    return <>

                        <Grid container ml={1} mr={1}>

                            <Grid item xs={3}>
                                <Grid container flexDirection='column'>
                                    <Grid item xs>
                                        <Box component={Link} to={`/product/${cart[key].id}/${cart[key].name}`}>
                                            <img style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} src={baseURL + path} />
                                        </Box>
                                    </Grid>
                                    {/* <Grid item xs display='flex' justifyContent='center' pl={1} pr={1}>

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
                                    </Grid> */}
                                </Grid>
                            </Grid>

                            <Grid item xs>

                                <Typography variant='h7' style={{ fontWeight: 'bold', margin: 0, color: 'inherit', textDecoration: 'inherit' }} component={Link} to={`/product/${cart[key].id}/${cart[key].name}`} onClick={() => setCartOpen(false)}>
                                    {cart[key].name} - {itemVariant?.name}
                                </Typography>
                                <br />
                                {cart[key].brand}
                                <br />
                                {format(cart[key].price * (1 + (cart[key].vatRateSE / 10000)) / 100)}
                                <br />

                                <Grid container>

                                    <Grid item xs>
                                        <IconButton onClick={() => changeVariantQuantity(-1, key)} color="primary" aria-label="increment-product">
                                            <IndeterminateCheckBoxIcon style={{ fontSize: '34px' }} />
                                        </IconButton>
                                        {cart[key]?.quantity}
                                        <IconButton onClick={() => changeVariantQuantity(1, key)} color="primary" aria-label="dimunition-product">
                                            <AddBoxIcon style={{ fontSize: '34px' }} />
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