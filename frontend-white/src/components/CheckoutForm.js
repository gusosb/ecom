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


const allowedCountries = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'CH', 'SE'
]

const CheckoutForm = ({ sendCreateOrder, format, totalSumInCart, setEmail, setName, setAddress, setCountry, setAddress2, setPostalcode, setCity, setState, setPhone, setCreatingOrder, email, selectedCurrency }) => {

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
                            mode: 'shipping', allowedCountries, fields: { phone: 'always' },
                            validation: {
                                phone: {
                                    required: 'always',
                                },
                            },
                        }}
                        onChange={({ value }) => {
                            value.phone && setPhone(value.phone);
                            value.name && setName(value.name);
                            value.address.line1 && setAddress(value.address.line1);
                            value.address.line2 && setAddress2(value.address.line2);
                            value.address.postal_code && setPostalcode(value.address.postal_code);
                            value.address.city && setCity(value.address.city);
                            value.address.state && setState(value.address.state);
                            value.address.country && setCountry(value.address.country);
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
                            {selectedCurrency}</Button>


                    </Box>

                </Box>
            </Grid>
        </Grid>
    );
}

export default CheckoutForm;