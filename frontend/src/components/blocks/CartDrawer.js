import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';

const CartDrawer = ({ location, cart, cartOpen, setCartOpen, removeFromCart, format, Grid, toggleDrawer, CloseIcon,
    Box, Link, productPlaceholder, changeVariantQuantity, totalSumInCart, Button, swipeable, SwipeableDrawer, baseUrl
}) => {

    const Draws = swipeable ? SwipeableDrawer : Drawer;
    return (
        <>
            {location.pathname !== '/checkout' &&
                <Draws
                    anchor='right'
                    open={cartOpen}
                    onClose={toggleDrawer()}
                    onOpen={() => setCartOpen(true)}
                    PaperProps={{
                        sx: { width: 420, backgroundColor: '#faf9f8' },
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
                                {cart && Object.keys(cart).map((key, i) => {
                                    const itemVariant = cart[key].variants?.find(e => e.id === parseInt(key))
                                    const path = cart[key].images[0]?.path
                                    return <>
                                        <Grid container paddingTop={i !== 0 ? '14px' : '4px'} paddingBottom={1} sx={{ borderBottom: (i + 1) !== Object.keys(cart).length && '.1rem solid #dadada' }} display='flex' alignItems="center" flexDirection='row' alignSelf='center' justifyContent='center'>
                                            <Grid item xs='auto'>
                                                <IconButton disableFocusRipple disableRipple onClick={() => removeFromCart(key)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Box component={Link} to={`/product/${cart[key].id}/${cart[key].name}`} onClick={() => setCartOpen(false)}>
                                                    <img style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} src={baseUrl + path} />
                                                </Box>
                                            </Grid>
                                            <Grid item xs='auto' sx={{ minWidth: 270 }} marginLeft={2} >

                                                <Typography variant='h6' style={{ margin: 0, color: 'inherit', textDecoration: 'inherit' }} component={Link} to={`/product/${cart[key].id}/${cart[key].name}`} onClick={() => setCartOpen(false)}>
                                                    {cart[key].name} - {itemVariant?.name}
                                                </Typography>
                                                {/* <h3 component={Link} to={'/'} style={{ margin: 0 }}>{cart[key].name} - {itemVariant?.name}</h3> */}

                                                <br />
                                                {cart[key].brand}
                                                <br />

                                                <Grid container>

                                                    <Grid item xs>
                                                        <IconButton sx={{ paddingLeft: 0 }} onClick={() => changeVariantQuantity(-1, key)} color="primary" aria-label="decrement-product">
                                                            <IndeterminateCheckBoxIcon style={{ fontSize: '34px' }} />
                                                        </IconButton>
                                                        {cart[key]?.quantity} st
                                                        <IconButton onClick={() => changeVariantQuantity(1, key)} color="primary" aria-label="increment-product">
                                                            <AddBoxIcon style={{ fontSize: '34px' }} />
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
                        </Grid>
                        <Grid item xs='auto'>
                            <Grid container backgroundColor='#f4f4f4' display='flex' direction='column'>
                                <Grid item xs='auto' margin={2}>
                                    <Grid container>
                                        <Grid item xs>
                                            Totalsumma
                                        </Grid>
                                        <Grid item xs display='flex' justifyContent='end' alignItems='center'>
                                            <b>{format(totalSumInCart / 100)} kr</b>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs='auto' margin={2}>
                                    <Button onClick={() => setCartOpen(false)} component={Link} to='/checkout' variant='contained' fullWidth>GÅ TILL KASSAN</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Draws>
            }
        </>
    )
}

export default CartDrawer