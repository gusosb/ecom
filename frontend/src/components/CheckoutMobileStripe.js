import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';

import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp';
import CheckoutForm from './CheckoutForm';

const CheckoutMobileAdyen = ({ cart, removeFromCart, changeVariantQuantity, format, html_snippet, setCartOpen, baseURL,
    paymentContainer, totalSumInCart,
    email, phone, firstname, lastname, address, city, postalcode,
    setEmail, setPhone, setFirstname, setLastname, setAddress, setCity, setPostalcode, checkIfAllFieldsDone,
    sendCreateOrder, setName, Elements, stripePromise, options, setCreatingOrder, shouldRenderForm
}) => {

    return (
        <>

            <Grid container display='flex' justifyContent='center'>

                <Grid display='flex' item xs={12} style={{ maxWidth: 1000, height: '100%' }} sx={{ m: 2, mt: 0, mb: 0 }}>

                    <Grid container spacing={3} marginTop={0}>

                        <Grid item xs={12}>

                            <Grid container>

                                <Grid item xs sx={{ borderBottom: '1px solid #e6e6e6', paddingBottom: '6px' }}>
                                    <Typography component="h1" variant="h5" marginLeft={1}>Ordersammanställning</Typography>
                                </Grid>

                                {Object.keys(cart).map((key, i) => {
                                    const itemVariant = cart[key].variants?.find(e => e.id === parseInt(key));
                                    const path = cart[key].images[0]?.path;
                                    return <>
                                        <Grid item xs={12} sx={{ borderBottom: '1px solid #e6e6e6', marginTop: 2, paddingBottom: 1 }}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={2}>
                                                    <img alt='main-product' style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} src={productPlaceholder} />
                                                    {/* <img alt='main-product' style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} src={baseUrl + path} /> */}
                                                </Grid>

                                                <Grid item xs>
                                                    <Grid container direction='row'>
                                                        <Grid item xs>
                                                            <b>{cart[key].name} - {itemVariant.name}</b>
                                                        </Grid>

                                                        <Grid item xs='auto'>

                                                        </Grid>
                                                    </Grid>

                                                    <Grid container marginTop={0}>
                                                        <Grid item xs alignSelf='center'>
                                                            <b> {format(cart[key].quantity * cart[key].price * (1 + (cart[key].vatRateSE / 10000)) / 100)} kr</b>
                                                        </Grid>

                                                        <Grid item xs='auto' marginRight={0}>
                                                            <IconButton onClick={() => changeVariantQuantity(-1, key)} color="primary" aria-label="increment-product">
                                                                <IndeterminateCheckBoxIcon style={{ fontSize: '34px' }} />
                                                            </IconButton>
                                                            {cart[key].quantity} st
                                                            <IconButton onClick={() => changeVariantQuantity(1, key)} color="primary" aria-label="dimunition-product">
                                                                <AddBoxIcon style={{ fontSize: '34px' }} />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                })}

                            </Grid>


                            <Grid item xs={12} textAlign='end'>
                                <h3>Att betala: {format(totalSumInCart / 100)} kr </h3>
                            </Grid>

                        </Grid>

                        <Grid item xs={12}>

                            {options.clientSecret && shouldRenderForm &&
                                <Elements stripe={stripePromise} options={options}>
                                    <CheckoutForm sendCreateOrder={sendCreateOrder} totalSumInCart={totalSumInCart} format={format} setEmail={setEmail} setName={setName} setAddress={setAddress} setPostalcode={setPostalcode} setCity={setCity} setPhone={setPhone} setCreatingOrder={setCreatingOrder} email={email} />
                                </Elements>
                            }

                        </Grid>



                    </Grid>
                </Grid>
            </Grid >
        </>
    );
};

export default CheckoutMobileAdyen;