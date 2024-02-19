import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { checkPayment } from '../requests';

import { useStripe } from "@stripe/react-stripe-js";



import '@adyen/adyen-web/dist/adyen.css';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';

import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp';
import Typography from '@mui/material/Typography';
import CheckoutMobileStripe from './CheckoutMobileStripe';
import CheckoutForm from './CheckoutForm';
import Button from '@mui/material/Button';

const Confirmation = ({ format }) => {

    const stripe = useStripe();
    const [parameters] = useSearchParams();

    const [paymentStatus, setPaymentStatus] = useState('')
    const [result, setResult] = useState('')

    const paymentIntent = parameters.get('payment_intent');
    const clientSecret = parameters.get('payment_intent_client_secret');
    const redirectStatus = parameters.get('redirect_status');

    console.log(paymentIntent);
    console.log(clientSecret);
    console.log(redirectStatus);


    const checkPaymentMutation = useMutation(checkPayment, {
        onSuccess: (response) => {
            console.log(response);
            setResult(response);
        },
    });


    useEffect(() => {
        if (!stripe) return;

        checkPaymentMutation.mutate({ order_reference: clientSecret });

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            console.log(paymentIntent.status);
            setPaymentStatus(paymentIntent.status);
        });
    }, [stripe]);


    return (
        <>
            <Grid container direction='column' alignContent='center' >
                <Grid item xs display='flex' justifyContent='center'>
                    <Grid container display='flex' justifyContent='center'>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <h2 style={{ marginBottom: 0 }}>Vi har mottagit din order!</h2>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <h4 style={{ marginTop: 1 }}>Ordernummer #{result?.id}</h4>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs>
                    {result?.orderitems?.map((item, index) =>
                        <Grid container spacing={1} marginTop={index !== 0 ? 1 : null} justifyContent='center'>
                            <Grid item xs={2}>
                                <img alt='main-product' style={{ maxHeight: 700, maxWidth: '100%', objectFit: 'contain' }} src={productPlaceholder} />
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container direction='column' height='100%' display='flex' justifyContent='center'>
                                    <Grid item xs='auto'>
                                        <h3 style={{ margin: 0 }}>{item.name}</h3>
                                        {item.quantity} st
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    )
};

export default Confirmation;