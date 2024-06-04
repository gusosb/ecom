import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initiateCheckout, createOrder, updatePayment } from '../requests';
import { useMutation } from '@tanstack/react-query';
import { useWindowSize, convertTaxRate, vatRates } from '../helpers';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import FlipNumber from './blocks/FlipNumber';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CheckoutMobileStripe from './CheckoutMobileStripe';
import CheckoutForm from './CheckoutForm';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const appearance = {
  theme: 'flat',
  variables: {
    fontFamily: ' "Gill Sans", sans-serif',
    fontLineHeight: '1.5',
    borderRadius: '10px',
    colorBackground: '#F6F8FA',
    accessibleColorOnColorPrimary: '#262626'
  },
  rules: {
    '.Block': {
      backgroundColor: 'var(--colorBackground)',
      boxShadow: 'none',
      padding: '12px'
    },
    '.Input': {
      padding: '12px'
    },
    '.Input:disabled, .Input--invalid:disabled': {
      color: 'lightgray'
    },
    '.Tab': {
      padding: '10px 12px 8px 12px',
      border: 'none'
    },
    '.Tab:hover': {
      border: 'none',
      boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
    },
    '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
      border: 'none',
      backgroundColor: '#fff',
      boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
    },
    '.Label': {
      fontWeight: '500'
    }
  }
};

const CheckoutStripe = ({ cart, totalSumInCart, removeFromCart, changeVariantQuantity, format, baseUrl, selectedCurrency }) => {
  const [payment, setPayment] = useState({});
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [shouldRenderForm, setShouldRenderForm] = useState(false);
  const [loadSkeleton, setLoadSkeleton] = useState(true);

  const [options, setOptions] = useState({});

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalcode, setPostalcode] = useState('');
  const [city, setCity] = useState('');

  const [address2, setAddress2] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const formatAmount = (amt) => parseInt(amt.toFixed(0));

  let order_tax_amount = 0;
  const order_lines =
    cart[0] &&
    Object.keys(cart).map((e) => {
      const itemVariant = cart[e].variants?.find((b) => b.id === parseInt(e));
      const ossVatRate = convertTaxRate(vatRates[country]?.vatRate) / 100 || 0;
      const vatRateSE = convertTaxRate(cart[e].vatRateSE);

      const ossAmount = formatAmount((cart[e].price_eur * cart[e].quantity * ossVatRate) / (1 + ossVatRate));
      const sekVatAmount = formatAmount(vatRateSE * cart[e].price_sek * cart[e].quantity);
      const sekVatEURAmount = formatAmount((cart[e].price_eur * cart[e].quantity * vatRateSE) / (1 + vatRateSE));

      const total_tax_amount =
        country === 'SE' && selectedCurrency === 'SEK'
          ? sekVatAmount
          : // : (cart[e].price_eur * cart[e].quantity * vatRateSE) / (1 + vatRateSE);
          country === 'SE' && selectedCurrency !== 'SEK'
          ? sekVatEURAmount
          : ossAmount;
      order_tax_amount += total_tax_amount;
      return {
        type: 'physical',
        name: cart[e].name,
        quantity: cart[e].quantity,
        quantity_unit: 'pcs',
        unit_price: selectedCurrency === 'SEK' ? cart[e].price_sek * (1 + vatRateSE) : cart[e].price_eur,
        currency: selectedCurrency,
        tax_rate: selectedCurrency === 'SEK' ? cart[e].vatRateSE : 0,
        total_amount:
          country === 'SE' && selectedCurrency === 'SEK'
            ? cart[e].quantity * cart[e].price_sek * (1 + vatRateSE)
            : country === 'SE' && selectedCurrency !== 'SEK'
            ? cart[e].quantity * cart[e].price_eur * (1 + vatRateSE)
            : cart[e].quantity * cart[e].price_eur,
        total_tax_amount,
        variant: itemVariant.name,
        product_url: `${window.location.origin}/p/${cart[e].id}`,
        product_id: cart[e].id,
        reference: e,
        image_path: baseUrl + cart[e].images[0]?.path // => setting the first image as default orderitem image
      };
    });

  const initiateCheckoutMutation = useMutation(initiateCheckout, {
    onSuccess: (response) => {
      setPayment(response);
      setOptions({
        clientSecret: response.clientSecret,
        appearance,
        locale: 'en'
      });
    }
  });

  const updatePaymentIntentMutation = useMutation(updatePayment);

  const createOrderMutation = useMutation(createOrder, {
    onSuccess: (response) => {
      console.log(response);
    }
  });

  const sendCreateOrder = () => {
    createOrderMutation.mutate({
      locale: navigator.language,
      order_amount: totalSumInCart,
      order_lines,
      order_tax_amount,
      email,
      phone,
      name,
      address,
      postalcode,
      city,
      order_reference: options.clientSecret,
      payment_id: payment.paymentId,
      address2,
      state,
      country,
      currency: selectedCurrency
    });
  };

  useEffect(() => {
    if (options.clientSecret) return;
    initiateCheckoutMutation.mutate({
      locale: navigator.language,
      order_amount: totalSumInCart,
      order_lines,
      order_tax_amount,
      currency: selectedCurrency.toLowerCase()
    });
    setTimeout(() => {
      setShouldRenderForm(true);
      setLoadSkeleton(false);
      setIsInitialRender(false);
    }, 800);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!options.clientSecret) return;
    if (isInitialRender) return setIsInitialRender(false);

    updatePaymentIntentMutation.mutate({
      order_amount: totalSumInCart,
      order_lines,
      payment_id: payment.paymentId,
      currency: selectedCurrency.toLowerCase()
    });
  }, [totalSumInCart, selectedCurrency]); // eslint-disable-line

  const windowSize = useWindowSize();

  if (windowSize.width < 800)
    return (
      <CheckoutMobileStripe
        cart={cart}
        removeFromCart={removeFromCart}
        changeVariantQuantity={changeVariantQuantity}
        format={format}
        totalSumInCart={totalSumInCart}
        email={email}
        phone={phone}
        address={address}
        city={city}
        postalcode={postalcode}
        setAddress2={setAddress2}
        setState={setState}
        setCountry={setCountry}
        setEmail={setEmail}
        setPhone={setPhone}
        setAddress={setAddress}
        setCity={setCity}
        setPostalcode={setPostalcode}
        sendCreateOrder={sendCreateOrder}
        setName={setName}
        Elements={Elements}
        stripePromise={stripePromise}
        options={options}
        setCreatingOrder={setCreatingOrder}
        shouldRenderForm={shouldRenderForm}
        List={List}
        ListItem={ListItem}
        Box={Box}
        Link={Link}
        FlipNumber={FlipNumber}
        loadSkeleton={loadSkeleton}
        Skeleton={Skeleton}
        RemoveIcon={RemoveIcon}
        AddIcon={AddIcon}
        creatingOrder={creatingOrder}
        baseUrl={baseUrl}
        selectedCurrency={selectedCurrency}
      />
    );

  return (
    <Grid container display="flex" justifyContent="center" marginTop={5}>
      <Grid display="flex" item xs={12} style={{ maxWidth: 1300, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>
        <Grid container spacing={10} paddingTop={4}>
          <Grid item xs={6}>
            <Grid container spacing={0}>
              <Grid item xs>
                <Typography sx={{ borderBottom: '1px solid #e6e6e6' }} paddingBottom={1} component="h1" variant="h6" style={{ fontWeight: 400 }}>
                  ORDER SUMMARY
                </Typography>

                <List>
                  {cart &&
                    Object.keys(cart).map((key, i) => {
                      const itemVariant = cart[key].variants?.find((e) => e.id === parseInt(key));
                      const path = cart[key].images[0]?.path;
                      const hasMultipleVariants = cart[key].variants.length > 1;
                      return (
                        <ListItem
                          key={key}
                          sx={{
                            pt: i === 0 ? 1 : 2,
                            pb: 2,
                            position: 'relative', // Relative positioning for the pseudo-element
                            '&::after': {
                              // Pseudo-element for the custom divider
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
                            <Grid item xs="auto">
                              <Box component={Link} to={`/p/${cart[key].id}/${cart[key].name}`}>
                                <img src={baseUrl + path} alt="123" style={{ width: '90px' }} />
                              </Box>
                            </Grid>
                            <Grid item xs>
                              <Typography
                                variant="body1"
                                style={{
                                  color: 'inherit',
                                  textDecoration: 'inherit',
                                  textTransform: 'uppercase'
                                }}
                                component={Link}
                                to={`/p/${cart[key].id}/${cart[key].name}`}
                              >
                                {cart[key]?.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" textTransform="uppercase">
                                {hasMultipleVariants && itemVariant?.name}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" component="div" display="flex" justifyContent="center">
                                <FlipNumber
                                  currentNumber={
                                    selectedCurrency === 'SEK'
                                      ? format((cart[key].quantity * cart[key].price_sek * (1 + convertTaxRate(cart[key].vatRateSE))) / 100)
                                      : (cart[key].quantity * cart[key].price_eur) / 100
                                  }
                                />
                                &nbsp;{selectedCurrency}
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
                      );
                    })}
                </List>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs paddingBottom={4}>
            <Grid item xs sx={{ borderBottom: '1px solid #e6e6e6', marginBottom: 2 }}>
              <Typography paddingBottom={1} component="h1" variant="h6" style={{ fontWeight: 400 }}>
                CUSTOMER INFORMATION
              </Typography>
            </Grid>
            {loadSkeleton && (
              <>
                <Box sx={{ m: 2 }}>
                  <Skeleton variant="text" animation="wave" width="80%" height={24} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" animation="wave" height={56} sx={{ mb: 2 }} />
                  <Skeleton variant="text" animation="wave" width="80%" height={24} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" animation="wave" height={56} sx={{ mb: 2 }} />
                  <Skeleton variant="text" animation="wave" width="60%" height={24} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" animation="wave" height={56} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" animation="wave" height={150} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" animation="wave" height={56} />
                </Box>
              </>
            )}
            {options.clientSecret && shouldRenderForm && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm
                  sendCreateOrder={sendCreateOrder}
                  totalSumInCart={totalSumInCart}
                  format={format}
                  setEmail={setEmail}
                  setName={setName}
                  setAddress={setAddress}
                  setPostalcode={setPostalcode}
                  setCity={setCity}
                  setPhone={setPhone}
                  creatingOrder={creatingOrder}
                  setCreatingOrder={setCreatingOrder}
                  email={email}
                  setAddress2={setAddress2}
                  setState={setState}
                  setCountry={setCountry}
                  selectedCurrency={selectedCurrency}
                />
              </Elements>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutStripe;
