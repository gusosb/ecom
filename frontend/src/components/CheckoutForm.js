import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import {
    useStripe,
    useElements,
    PaymentElement,
    AddressElement,
    LinkAuthenticationElement
} from '@stripe/react-stripe-js';

//  process.env.NODE_ENV === 'development'


const CheckoutForm = ({ sendCreateOrder, format, totalSumInCart, setEmail, setName, setAddress, setPostalcode, setCity, setPhone, setCreatingOrder, email }) => {

    const stripe = useStripe();
    const elements = useElements();

    const handlePay = async () => {
        setCreatingOrder(true);
        await sendCreateOrder();

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/confirmation`,
                receipt_email: email
            },
        });

        if (result.error) console.log(result.error.message);
    }


    return (
        <>

            <Grid container direction='column'>
                <Grid item xs>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: '10px',
                            background: '#f7f8f9',
                            marginBottom: 2
                        }}
                    >
                        <Box sx={{ m: 2 }}>

                            <LinkAuthenticationElement
                                onChange={({ value }) => {
                                    setEmail(value.email)
                                }}
                            // Prefill the email field like so:
                            // options={{defaultValues: {email: 'foo@bar.com'}}}
                            />

                            <AddressElement
                                options={{
                                    mode: 'shipping', allowedCountries: ['SE'], fields: { phone: 'always' },
                                    validation: {
                                        phone: {
                                            required: 'always',
                                        },
                                    },
                                    //defaultValues: {
                                    //   name: 'Jane Doe',
                                    //  address: {
                                    //      line1: '354 Oyster Point Blvd',
                                    //      line2: '',
                                    //     city: 'South San Francisco',
                                    //     state: 'CA',
                                    //    postal_code: '94080',
                                    //   country: 'US',
                                    //},
                                    //},
                                }}
                                onChange={({ value }) => {
                                    setPhone(value.phone)
                                    setName(value.name)
                                    setAddress(value.address.line1)
                                    setPostalcode(value.address.postal_code)
                                    setCity(value.address.city)
                                }}
                            />
                        </Box>

                    </Paper>

                </Grid>
                <Grid item xs>
                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: '10px',
                            background: '#f7f8f9',
                            marginBottom: 2
                        }}
                    >
                        <Box sx={{ m: 2 }}>

                            <PaymentElement options={{ layout: "tabs" }} />
                            <Box display='flex' justifyContent='center' marginTop={2}>
                                <Button sx={{ width: 200 }} variant='contained' onClick={handlePay}>Betala {format(totalSumInCart / 100)} kr</Button>
                            </Box>

                        </Box>
                    </Paper>
                </Grid>
            </Grid>

        </>
    )
}

export default CheckoutForm