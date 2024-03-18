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

const Confirmation = ({ format, baseUrl }) => {

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

    // https://localhost:8000/confirmation?payment_intent=pi_3OvGGEHSZa4snN991nKbCyin&payment_intent_client_secret=pi_3OvGGEHSZa4snN991nKbCyin_secret_aoK2arwuLxC8L3NXzGnCxawT3&redirect_status=succeeded
    // https://surdegshornan.se/confirmation?payment_intent=pi_3OvGGEHSZa4snN991nKbCyin&payment_intent_client_secret=pi_3OvGGEHSZa4snN991nKbCyin_secret_aoK2arwuLxC8L3NXzGnCxawT3&redirect_status=succeeded
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

                <Grid item xs={12} sx={{ borderBottom: '1px solid #e6e6e6', pt: 4, pl: 2, justifyContent: 'center', display: 'flex' }}>
                    <Typography paddingBottom={1} component="h1" variant="h6" style={{ fontWeight: 400 }}>ORDER CONFIRMATION #{result?.order_reference}</Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>

                    <List sx={{ width: 700 }}>
                        {result?.orderitems?.map((item, i) => {
                            const path = item.image_path;
                            return (
                                <ListItem
                                    key={i}
                                    sx={{
                                        pt: i === 0 ? 1 : 2,
                                        pb: 2,
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 16,
                                            right: 16,
                                            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                                            width: 'calc(100% - 32px)'
                                        }
                                    }}
                                >
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs='auto'>
                                            <Box component={Link} to={`/product/${item.product_id}/${item.name}`}>
                                                <img
                                                    src={path}
                                                    alt='123'
                                                    style={{ width: '90px' }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography variant="body1" style={{ color: 'inherit', textDecoration: 'inherit', textTransform: 'uppercase' }} component={Link} to={`/product/${item.product_id}/${item.name}`}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" textTransform='uppercase'>
                                                {item.variant}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1" display='flex' justifyContent='center'>
                                                {format(item.total_amount / 100)}&nbsp;SEK
                                            </Typography>

                                            <Box display="flex" alignItems="center">
                                                <Typography variant="body2" sx={{ mx: 1 }}>
                                                    {item.quantity} {item.quantity > 1 ? 'pieces' : 'piece'}
                                                </Typography>
                                            </Box>

                                        </Grid>
                                    </Grid>
                                </ListItem>
                            );
                        })}
                    </List>

                </Grid>
            </Grid>

        </>
    )
};

export default Confirmation;