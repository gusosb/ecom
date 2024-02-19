import { useEffect, useState } from 'react';
import { initiateCheckout, createOrder, updatePayment } from '../requests';
import { useMutation } from '@tanstack/react-query';
import { useWindowSize } from '../helpers';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from '@mui/material/Typography';
import CheckoutMobileStripe from './CheckoutMobileStripe';
import CheckoutForm from './CheckoutForm';
import { Link } from "react-router-dom";

import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp';
import Box from '@mui/material/Box';


const CheckoutStripe = ({ cart, totalSumInCart, removeFromCart, changeVariantQuantity, format, baseUrl }) => {

    console.log(cart);

    const [payment, setPayment] = useState({});
    const [creatingOrder, setCreatingOrder] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [shouldRenderForm, setShouldRenderForm] = useState(false);

    const [options, setOptions] = useState({});

    console.log(options);

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [city, setCity] = useState('');


    let order_tax_amount = 0;
    const order_lines = Object.keys(cart).map(e => {
        const total_tax_amount = (cart[e].vatRateSE / 10000) * cart[e].price * cart[e].quantity
        order_tax_amount += total_tax_amount
        return {
            type: 'physical',
            name: cart[e].name,
            quantity: cart[e].quantity,
            quantity_unit: 'pcs',
            unit_price: cart[e].price * (1 + (cart[e].vatRateSE / 10000)),
            tax_rate: cart[e].vatRateSE,
            total_amount: cart[e].quantity * cart[e].price * (1 + (cart[e].vatRateSE / 10000)),
            total_tax_amount,
            product_url: `${window.location.origin}/product/${cart[e].id}`,
            reference: e,
            image_path: cart[e].images[0].path // => setting the first image as default orderitem image
        }
    });

    const initiateCheckoutMutation = useMutation(initiateCheckout, {
        onSuccess: (response) => {
            setPayment(response);
            setOptions({ clientSecret: response.clientSecret });
        },
    });

    const updatePaymentIntentMutation = useMutation(updatePayment, {
        onSuccess: (response) => {
            console.log(response);
        },
    });

    const createOrderMutation = useMutation(createOrder, {
        onSuccess: (response) => {
            console.log(response);
        },
    });

    const sendCreateOrder = () => {
        createOrderMutation.mutate({ locale: navigator.language, order_amount: totalSumInCart, order_lines, order_tax_amount, email, phone, name, address, postalcode, city, order_reference: options.clientSecret, payment_id: payment.paymentId });
    }

    useEffect(() => {
        if (options.clientSecret) return;
        initiateCheckoutMutation.mutate({ locale: navigator.language, order_amount: totalSumInCart, order_lines, order_tax_amount });
        setTimeout(() => {
            setShouldRenderForm(true);
        }, 1000);
    }, []); // eslint-disable-line


    useEffect(() => {
        if (!options.clientSecret) return;
        if (isInitialRender) return setIsInitialRender(false);

        updatePaymentIntentMutation.mutate({ order_amount: totalSumInCart, order_lines, payment_id: payment.paymentId });
    }, [totalSumInCart]); // eslint-disable-line


    const windowSize = useWindowSize();

    if (windowSize.width < 800) return <CheckoutMobileStripe cart={cart} removeFromCart={removeFromCart} changeVariantQuantity={changeVariantQuantity}
        format={format} totalSumInCart={totalSumInCart}
        email={email} phone={phone} address={address} city={city} postalcode={postalcode}
        setEmail={setEmail} setPhone={setPhone} setAddress={setAddress} setCity={setCity} setPostalcode={setPostalcode}
        sendCreateOrder={sendCreateOrder} setName={setName} Elements={Elements} stripePromise={stripePromise} options={options}
        setCreatingOrder={setCreatingOrder} shouldRenderForm={shouldRenderForm}
    />


    return (
        <>
            <Grid container display='flex' justifyContent='center'>
                {/* <Grid item xs={12} style={{ maxWidth: 900, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }} display='flex' justifyContent='center'>
                    <h1>Kassa</h1>
                </Grid> */}

                <Grid display='flex' item xs={12} style={{ maxWidth: 1000, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>

                    <Grid container spacing={3} marginTop={0}>

                        <Grid item xs={6}>

                            <Grid container spacing={2}>

                                <Grid item xs sx={{ borderBottom: '1px solid #e6e6e6' }}>
                                    <Typography component="h1" variant="h5" marginLeft={1}>Ordersammanställning</Typography>
                                </Grid>

                                {Object.keys(cart).map((key, i) => {
                                    const itemVariant = cart[key].variants?.find(e => e.id === parseInt(key))
                                    const hasMultipleVariants = cart[key].variants.length > 1;
                                    const path = cart[key].images[0]?.path;
                                    return <>
                                        <Grid item xs={12} sx={{ boxShadow: '0px 13px 0px -12px #e6e6e6' }}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={2}>
                                                    <Box component={Link} to={`/product/${cart[key].id}/${cart[key].name}`}>
                                                        <img style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} src={productPlaceholder} />
                                                        {/* <img style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} src={baseUrl + path} /> */}
                                                    </Box>
                                                </Grid>

                                                <Grid item xs>
                                                    <Grid container direction='row'>
                                                        <Grid item xs>
                                                            <Typography variant='bold' style={{ color: 'inherit', textDecoration: 'inherit' }} component={Link} to={`/product/${cart[key].id}/${cart[key].name}`}>
                                                                <b>{cart[key].name} {hasMultipleVariants && `- ${itemVariant.name}`} </b>
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs='auto'>

                                                        </Grid>
                                                    </Grid>

                                                    <Grid container marginTop={2}>
                                                        <Grid item xs alignSelf='center'>
                                                            <b> {format(cart[key].quantity * cart[key].price * (1 + (cart[key].vatRateSE / 10000)) / 100)} kr</b>
                                                        </Grid>

                                                        <Grid item xs='auto' marginRight={0}>
                                                            <IconButton onClick={() => changeVariantQuantity(-1, key)} color="primary" aria-label="increment-product">
                                                                <IndeterminateCheckBoxIcon style={{ fontSize: '34px' }} />
                                                            </IconButton>
                                                            {cart[key].quantity}
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

                        <Grid item xs>
                            {options.clientSecret && shouldRenderForm &&
                                <Elements stripe={stripePromise} options={options}>
                                    <CheckoutForm sendCreateOrder={sendCreateOrder} totalSumInCart={totalSumInCart} format={format} setEmail={setEmail} setName={setName} setAddress={setAddress} setPostalcode={setPostalcode} setCity={setCity} setPhone={setPhone} creatingOrder={creatingOrder} setCreatingOrder={setCreatingOrder} email={email} />
                                </Elements>
                            }
                        </Grid>

                    </Grid>
                </Grid>
            </Grid >

        </>
    )
}

export default CheckoutStripe