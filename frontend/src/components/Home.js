import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { Link, Outlet, useLocation } from "react-router-dom"
import Footer from './Footer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import placeholderLogo from '../images/logoipsum-288.svg'
import TextField from '@mui/material/TextField'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { ReactComponent as ShoppingCartIcon } from '../images/shoppingbag.svg'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Badge from '@mui/material/Badge'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Popper from '@mui/material/Popper';
import { useWindowSize } from '../helpers'
import HomeMobile from './HomeMobile'
import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'
import CartDrawer from './blocks/CartDrawer'

const Item = styled(Paper)(({ theme }) => ({
    /* backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', */
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    /* color: theme.palette.text.secondary, */
}))

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
})

const margin = 10
const maxWidth = 1250
const minHeight = 39
const minHeight2 = 157

const Home = ({ categories, cart, removeFromCart, changeVariantQuantity, totalSumInCart, format }) => {

    const [searchText, setSearchText] = useState('')
    const [cartOpen, setCartOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(categories.map(e => null))

    const [isPopperContentHovered, setIsPopperContentHovered] = useState(categories.map(e => false))

    const open = anchorEl.map(Boolean)

    const toggleDrawer = () => (event) => {
        if (event?.type === 'keydown' && (event?.key === 'Tab' || event?.key === 'Shift')) return
        setCartOpen(false)
    }
    const location = useLocation();

    const handleCloseMenu = (i) => {
        if (isPopperContentHovered[i]) return
        const values = categories.map(e => false);
        setAnchorEl(values);
    }

    const handleOpenMenu = (currentTarget, i) => {
        const values = categories.map(e => null)
        values[i] = currentTarget
        setAnchorEl(values)
    }

    const handleOpenPopper = (i) => {
        const values = categories.map(e => false)
        values[i] = true
        setIsPopperContentHovered(values)
        anchorEl[i] && handleOpenMenu(anchorEl[i], i)
    }

    const popperLeave = () => {
        setIsPopperContentHovered(categories.map(e => false))
        setAnchorEl(categories.map(e => null))
    }

    const windowSize = useWindowSize()

    if (windowSize.width < 800) return <HomeMobile cart={cart} location={location} cartOpen={cartOpen} setCartOpen={setCartOpen} toggleDrawer={toggleDrawer} totalSumInCart={totalSumInCart} changeVariantQuantity={changeVariantQuantity}
        PersonOutlineOutlinedIcon={PersonOutlineOutlinedIcon} ShoppingCartIcon={ShoppingCartIcon} placeholderLogo={placeholderLogo} format={format} categories={categories}
    />

    return (
        <>

            <CartDrawer location={location} cartOpen={cartOpen} setCartOpen={setCartOpen} cart={cart} format={format} removeFromCart={removeFromCart} Grid={Grid}
                toggleDrawer={toggleDrawer} CloseIcon={CloseIcon} Box={Box} Link={Link} productPlaceholder={productPlaceholder}
                changeVariantQuantity={changeVariantQuantity} totalSumInCart={totalSumInCart} Button={Button}
            />

            <Grid container direction='column'>
                <Grid item xs='auto'>
                    <Grid container backgroundColor='#25272e' justifyContent='center'>
                        <Grid item xs={12} style={{ minHeight, maxWidth }} sx={{ m: margin, mt: 0, mb: 0 }}>
                            <Grid container>
                                <Grid item minHeight={minHeight} xs='auto'>
                                    <Box display='flex' alignItems='center' height='100%'>
                                        hej
                                    </Box>
                                </Grid>
                                <Grid item xs minHeight={minHeight} display='flex' justifyContent='flex-end'>
                                    <Box display='flex' alignItems='center' height='100%'>
                                        Fri frakt vid 499:- / Snabba leveranser
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container backgroundColor='#2e3037' justifyContent='center'>
                        <Grid item xs={12} style={{ maxWidth, minHeight: minHeight2 }} sx={{ m: margin, mt: 0, mb: 0 }}>
                            <Grid container paddingTop={3}>

                                <Grid item xs={4}>
                                    <Box display='flex' alignItems='center' height='100%'>
                                        <img className='img' src={placeholderLogo} />
                                    </Box>
                                </Grid>

                                <Grid item xs={4}>
                                    <Box display='flex' alignItems='center' height='100%'>
                                        <CssTextField id="outlined-search" type="text" fullWidth
                                            variant="outlined"
                                            placeholder='Sök...'
                                            InputLabelProps={{ shrink: false }}
                                            value={searchText}
                                            InputProps={{
                                                style: { color: "white" },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon color='white' />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: searchText && (
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setSearchText('')}
                                                    ><CloseIcon color='white' /></IconButton>
                                                )
                                            }}
                                            onChange={({ target }) => setSearchText(target.value)}
                                            onKeyUp={({ key }) => key === 'Escape' && setSearchText('')} />
                                    </Box>
                                </Grid>

                                <Grid item xs={4} display='flex' justifyContent='flex-end'>

                                    <Box marginRight={1} display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>

                                        <Button
                                            style={{ height: 50 }}
                                        /* sx={{ '&:hover': { background: 'none', }, }} */
                                        >
                                            <Grid container direction='column' display='flex' alignItems='center'>
                                                <PersonOutlineOutlinedIcon />
                                                LOGGA IN
                                            </Grid>
                                        </Button>
                                    </Box>

                                    <Box marginRight={1} display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>
                                        <Button
                                            onClick={() => setCartOpen(!cartOpen)}
                                            style={{ height: 50 }}
                                        /* sx={{ '&:hover': { background: 'none', }, }} */
                                        >
                                            <Grid container direction='column' display='flex' alignItems='center'>
                                                <Badge badgeContent={cart && Object.keys(cart).length} color="secondary" sx={{ "& .MuiBadge-badge": {} }}>
                                                    <ShoppingCartIcon />
                                                </Badge>
                                                varukorg
                                            </Grid>
                                        </Button>
                                    </Box>
                                    <Box display='flex' alignItems='center' height='100%' flexDirection='column' justifyContent='center'>
                                        <Button
                                            style={{ height: 50 }}
                                        /* sx={{ '&:hover': { background: 'none', }, }} */
                                        >
                                            <Grid container direction='column' display='flex' alignItems='center'>
                                                <PersonOutlineOutlinedIcon />
                                                LOGGA IN
                                            </Grid>
                                        </Button>
                                    </Box>
                                </Grid>

                            </Grid>
                            <Grid container paddingTop={2}>
                                <Grid item xs={6}>
                                    <Stack direction="row" spacing={2}>
                                        {categories.map((category, i) =>
                                            <>
                                                <Button sx={{ textTransform: 'none' }} component={Link} to={`/${category.name.toLowerCase()}`}
                                                    onMouseEnter={(event) => handleOpenMenu(event.currentTarget, i)}
                                                    onMouseLeave={() => handleCloseMenu(i)}
                                                    onClick={() => handleCloseMenu(i)}
                                                >
                                                    <Item
                                                        style={{ textDecoration: 'none', color: 'white' }}
                                                        sx={{ backgroundColor: 'transparent' }} elevation={0}>
                                                        {category.name}
                                                    </Item>
                                                </Button>

                                                <Popper id={category.id} open={open[i]} anchorEl={anchorEl[i]} onMouseEnter={() => handleOpenPopper(i)} onMouseLeave={popperLeave}>
                                                    <Box
                                                        sx={{
                                                            marginTop: '-2px',
                                                            border: 1,
                                                            p: 1,
                                                            bgcolor: 'background.paper',
                                                        }}
                                                    >
                                                        {category.name}
                                                    </Box>

                                                </Popper>
                                            </>
                                        )}
                                        {/* 
                                        <ClickAwayListener onClickAway={handleCloseMenu}>
                                        </ClickAwayListener> */}
                                    </Stack>

                                </Grid>
                                <Grid item xs display='flex' justifyContent='flex-end'>
                                    hej
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid >
                </Grid>
                <Grid item xs>
                    <Outlet />
                </Grid>
                <Grid item xs>
                    <Grid container display='flex' justifyContent='center'>
                        <Grid item xs style={{ maxWidth: 1000, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>
                            <Footer />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Home