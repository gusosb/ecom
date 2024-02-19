import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FlipNumber from './blocks/FlipNumber'
import {
    useStripe,
    useElements,
    PaymentElement,
    AddressElement,
    LinkAuthenticationElement
} from '@stripe/react-stripe-js';



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
        <Grid container direction='column'>
            <Grid item xs>

                <Box sx={{ m: 2, mt: 0 }}>

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


            </Grid>
            <Grid item xs>

                <Box sx={{ m: 2 }}>

                    <PaymentElement options={{ layout: "tabs" }} />
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Button
                            sx={{
                                mt: 2,
                                backgroundColor: '#000',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Slightly lighter black on hover
                                },
                                padding: '16px',
                                borderRadius: '1',
                            }}
                            variant="contained"
                            fullWidth
                            onClick={handlePay}>PAY&nbsp;
                            <FlipNumber currentNumber={format(totalSumInCart / 100)} />&nbsp;
                            SEK</Button>


                    </Box>

                </Box>
            </Grid>
        </Grid>
    );
}

export default CheckoutForm;