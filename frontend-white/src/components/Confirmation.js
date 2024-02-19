import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { checkPayment } from '../requests';
import { useStripe } from "@stripe/react-stripe-js";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import '@adyen/adyen-web/dist/adyen.css';

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
            <Grid container>
                <Grid item xs sx={{ borderBottom: '1px solid #e6e6e6', pt: 4, pl: 2 }}>
                    <Typography paddingBottom={1} component="h1" variant="h6" style={{ fontWeight: 400 }}>ORDER CONFIRMATION #{result?.id}</Typography>
                </Grid>
                <List>
                    {result?.orderitems?.map((item, i) => {
                        const path = item.image_path;
                        return <>
                            <ListItem
                                key={i}
                                sx={{
                                    pt: i === 0 ? 1 : 2,
                                    pb: 2,
                                    position: 'relative', // Relative positioning for the pseudo-element
                                    '&::after': { // Pseudo-element for the custom divider
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 16, // Adjust the space on the left
                                        right: 16, // Adjust the space on the right
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // Your divider style
                                        width: 'calc(100% - 32px)' // Adjust the width based on left and right space
                                    }
                                }}
                            >
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs='auto'>
                                        <Box component={Link} to={`/product/${item.id}/${item.name}`}>
                                            <img
                                                src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format'
                                                alt='123'
                                                style={{ width: '90px' }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body1" style={{ color: 'inherit', textDecoration: 'inherit', textTransform: 'uppercase' }} component={Link} to={`/product/${item.id}/${item.name}`}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" textTransform='uppercase'>
                                            {item.variant}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" display='flex' justifyContent='center'>
                                            {format(item.quantity * item.unit_price * (1 + (item.tax_rate / 100)) / 100)}&nbsp;SEK
                                        </Typography>

                                        <Box display="flex" alignItems="center">
                                            <Typography variant="body2" sx={{ mx: 1 }}>
                                                {item.quantity} {item.quantity > 1 ? 'pieces' : 'piece'}
                                            </Typography>
                                        </Box>

                                    </Grid>
                                </Grid>
                            </ListItem>
                        </>
                    })}
                </List>


            </Grid>


        </>
    )
};

export default Confirmation;