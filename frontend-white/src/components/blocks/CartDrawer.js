import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FlipNumber from './FlipNumber';
import { convertTaxRate, useCountryCurrency } from '../../helpers';



const CartDrawer = ({
    cart, cartOpen, setCartOpen, format, Grid, CloseIcon,
    Box, Link, changeVariantQuantity, totalSumInCart, Button, swipeable, SwipeableDrawer, baseUrl, windowSize
}) => {

    const Draws = swipeable ? SwipeableDrawer : Drawer;

    const isMobile = windowSize.width <= 800;
    const drawerWidth = isMobile ? windowSize.width : 600;

    const { selectedCurrency } = useCountryCurrency();

    return (
        <Draws
            anchor='right'
            open={cartOpen}
            onOpen={() => setCartOpen(true)}
            onClose={() => setCartOpen(false)}
            PaperProps={{
                sx: {
                    width: drawerWidth,
                    backgroundColor: '#fff',
                    borderLeft: '1px solid #e0e0e0',
                },
            }}
        >
            <Grid container direction='column' height={isMobile ? '100dvh' : '100vh'}>

                <Grid item xs='auto'>

                    <Grid container sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                        <Grid item xs>
                            <Typography variant="h6" component="div">SHOPPING CART</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setCartOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item xs>

                    <List>
                        {cart && Object.keys(cart).map((key, i) => {
                            const itemVariant = cart[key].variants?.find(e => e.id === parseInt(key)) || [];
                            const path = cart[key].images[0]?.path;
                            const hasMultipleVariants = cart[key].variants.length > 1;
                            return (
                                <ListItem
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
                                            <Box component={Link} to={`/product/${cart[key].id}/${cart[key].name}`} onClick={() => setCartOpen(false)}>
                                                <img
                                                    //src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format'
                                                    src={baseUrl + path}
                                                    alt={itemVariant.name}
                                                    style={{ width: '110px' }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography variant="body1" style={{ color: 'inherit', textDecoration: 'inherit', textTransform: 'uppercase' }} component={Link} to={`/product/${cart[key].id}/${cart[key].name}`} onClick={() => setCartOpen(false)}>
                                                {cart[key]?.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" textTransform='uppercase'>

                                                {hasMultipleVariants && itemVariant?.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1" component="div" display='flex' justifyContent='center'>
                                                <FlipNumber currentNumber={selectedCurrency === 'SEK' ? format(cart[key].quantity * cart[key].price_sek * (1 + convertTaxRate(cart[key].vatRateSE)) / 100) : format(cart[key].quantity * cart[key].price_eur / 100)} />&nbsp;{selectedCurrency}
                                            </Typography>

                                            <Box display="flex" alignItems="center">
                                                <IconButton sx={{ padding: 0 }} onClick={() => changeVariantQuantity(-1, key)}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography variant="body2" component="div" sx={{ mx: 1 }}>
                                                    {cart[key]?.quantity}
                                                </Typography>
                                                <IconButton sx={{ padding: 0 }} onClick={() => changeVariantQuantity(1, key)}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>

                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )
                        })}
                    </List>

                </Grid>


                <Grid item xs='auto' sx={{ borderTop: '1px solid #e0e0e0' }}>
                    <Grid container sx={{ p: 2 }}>
                        <Grid item xs>
                            <Typography variant="subtitle1" component="div" >TOTAL</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" component="div">
                                <FlipNumber currentNumber={format(totalSumInCart / 100)} />&nbsp;{selectedCurrency}
                            </Typography>
                        </Grid>

                        <Button
                            sx={{
                                mt: 2,
                                backgroundColor: '#000',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                },
                                padding: '16px',
                                borderRadius: '1',
                            }}
                            variant="contained"
                            fullWidth
                            onClick={() => setCartOpen(false)} component={Link} to='/checkout'
                        >
                            Checkout
                        </Button>
                    </Grid>


                </Grid>

            </Grid>
        </Draws>
    );
}

export default CartDrawer;