import Grid from '@mui/material/Grid';
import Confirmation from './Confirmation'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


const ConfirmationWrapper = ({ format, setCart }) => {
    useEffect(() => {
        setCart({});
    }, [])

    return <>
        <Grid container display='flex' justifyContent='center'>
            <Grid display='flex' item xs={12} style={{ maxWidth: 1000, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>
                <Elements stripe={stripePromise}>
                    <Confirmation format={format} />
                </Elements>
            </Grid>
        </Grid>
    </>
}

export default ConfirmationWrapper;