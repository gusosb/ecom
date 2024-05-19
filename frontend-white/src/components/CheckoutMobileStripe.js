import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CheckoutForm from './CheckoutForm';
import { convertTaxRate } from '../helpers';

const CheckoutMobileAdyen = ({ cart, changeVariantQuantity, format, totalSumInCart,
    email, setEmail, setPhone, setAddress, setCity, setPostalcode, setCountry, setState, setAddress2,
    sendCreateOrder, setName, Elements, stripePromise, options, setCreatingOrder, shouldRenderForm,
    List, ListItem, Box, Link, FlipNumber, loadSkeleton, Skeleton, RemoveIcon, AddIcon, creatingOrder, baseUrl, selectedCurrency
}) => {

    return (
        <>
            <Grid container>

                <Grid item xs={12} sx={{ borderBottom: '1px solid #e6e6e6', pt: 4, pl: 2 }}>
                    <Typography paddingBottom={1} component="h1" variant="h6" style={{ fontWeight: 400 }}>ORDER SUMMARY</Typography>
                </Grid>
                <Grid item xs={12}>


                    <List>
                        {cart && Object.keys(cart).map((key, i) => {
                            const itemVariant = cart[key].variants?.find(e => e.id === parseInt(key));
                            const path = cart[key].images[0]?.path;
                            const hasMultipleVariants = cart[key].variants.length > 1;
                            return <ListItem
                                key={key}
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
                                        <Box component={Link} to={`/product/${cart[key].id}/${cart[key].name}`}>
                                            <img
                                                //src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format'
                                                src={baseUrl + path}
                                                alt='123'
                                                style={{ width: '90px' }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body1" style={{ color: 'inherit', textDecoration: 'inherit', textTransform: 'uppercase' }} component={Link} to={`/product/${cart[key].id}/${cart[key].name}`}>
                                            {cart[key]?.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" textTransform='uppercase'>

                                            {hasMultipleVariants && itemVariant?.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" component="div" display='flex' justifyContent='center'>
                                            <FlipNumber currentNumber={selectedCurrency === 'SEK' ? format(cart[key].quantity * cart[key].price_sek * (1 + convertTaxRate(cart[key].vatRateSE)) / 100) : cart[key].quantity * cart[key].price_eur / 100} />&nbsp;{selectedCurrency}
                                        </Typography>

                                        <Box display="flex" alignItems="center">
                                            <IconButton sx={{ padding: 0 }} onClick={() => changeVariantQuantity(-1, key)}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ mx: 1 }}>
                                                {cart[key]?.quantity}
                                            </Typography>
                                            <IconButton sx={{ padding: 0 }} onClick={() => changeVariantQuantity(1, key)}>
                                                <AddIcon />
                                            </IconButton>
                                        </Box>

                                    </Grid>
                                </Grid>
                            </ListItem>
                        })}
                    </List>
                </Grid>


                <Grid item xs={12} sx={{ borderBottom: '1px solid #e6e6e6', marginBottom: 2, pt: 5, pl: 2 }}>
                    <Typography paddingBottom={1} component="h1" variant="h6" style={{ fontWeight: 400 }}>CUSTOMER INFORMATION</Typography>
                </Grid>



                {loadSkeleton &&
                    <Box sx={{ m: 2, width: '100%' }}>
                        <Skeleton variant="text" animation="wave" width="80%" height={24} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" animation="wave" height={56} sx={{ mb: 2 }} />
                        <Skeleton variant="text" animation="wave" width="80%" height={24} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" animation="wave" height={56} sx={{ mb: 2 }} />
                        <Skeleton variant="text" animation="wave" width="60%" height={24} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" animation="wave" height={56} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" animation="wave" height={150} sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" animation="wave" height={56} />
                    </Box>
                }
                {options.clientSecret && shouldRenderForm &&
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm sendCreateOrder={sendCreateOrder} totalSumInCart={totalSumInCart} format={format} setEmail={setEmail} setName={setName} setAddress={setAddress} setPostalcode={setPostalcode} setCity={setCity} setPhone={setPhone} creatingOrder={creatingOrder} setCreatingOrder={setCreatingOrder} email={email}
                            setAddress2={setAddress2} setState={setState} setCountry={setCountry} selectedCurrency={selectedCurrency} />
                    </Elements>
                }
            </Grid>
        </>
    );
};

export default CheckoutMobileAdyen;