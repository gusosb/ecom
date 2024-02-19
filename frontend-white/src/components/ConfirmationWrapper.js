import Confirmation from './Confirmation'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


const ConfirmationWrapper = ({ format, setCart }) => {
    useEffect(() => {
        setCart({});
        localStorage.removeItem("ecomcart-white");
    }, []);

    return <>
        <Elements stripe={stripePromise}>
            <Confirmation format={format} />
        </Elements>
    </>
}

export default ConfirmationWrapper;