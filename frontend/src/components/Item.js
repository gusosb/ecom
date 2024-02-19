import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import { useWindowSize } from '../helpers'
import Markdown from 'react-markdown'
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Box from '@mui/material/Box'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Rating from '@mui/material/Rating';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ItemMobile from './ItemMobile'
import CategoryLocation from "./blocks/CategoryLocation";
import SwipeableViews from 'react-swipeable-views';
import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const Item = ({ cart, setCart, changeVariantQuantity, categories, format, baseUrl }) => {

    const { itemid } = useParams()

    const selectedItem = categories.flatMap(a => a.SubOne.flatMap(b => b.SubTwo.flatMap(c => {
        if (c.items.find(d => d.id === parseInt(itemid))) {
            return { ...c.items.find(d => d.id === parseInt(itemid)), subTwo: c.id, subOne: b.id, top: a.id }
        }
        return []
    })
    ))[0]

    const [variant, setVariant] = useState(selectedItem && selectedItem.variants.find(e => e.sellable > 0)?.id)

    const [tab, setTab] = useState(0)

    const [activeStep, setActiveStep] = useState(0);

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const handleNext = () => {
        setActiveStep(activeStep === selectedItem.images.length - 1 ? 0 : activeStep + 1)
    };

    const handleBack = () => {
        setActiveStep(activeStep === 0 ? selectedItem.images.length - 1 : activeStep - 1)
    };


    const topCategory = categories.find(category => category.id === selectedItem.top)
    const subCategory = topCategory?.SubOne.find(category => category.id === selectedItem.subOne)
    const subTwoCategory = subCategory?.SubTwo.find(category => category.id === selectedItem.subTwo)

    const addToCart = () => {
        const values = { ...cart }
        values[variant] = { ...selectedItem, quantity: 1 }
        setCart(values)
    }

    const variantInCart = cart && Object.keys(cart).some(key => parseInt(key) === variant)

    const reviewValue = (selectedItem?.reviews.reduce((acc, obj) => acc + obj.rating, 0) / selectedItem?.reviews.length) || 0

    const visibleTabs = [
        { name: 'beskriving' },
        selectedItem.description2 && { name: 'innehåll' },
        selectedItem.reviews.length > 0 && { name: 'recensioner' }
    ].filter(Boolean)


    const windowSize = useWindowSize()

    if (!windowSize.width) return <>Loading...</>

    if (windowSize.width < 800)
        return <ItemMobile
            format={format}
            variant={variant} setVariant={setVariant} variantInCart={variantInCart} selectedItem={selectedItem}
            topCategory={topCategory} subCategory={subCategory} subTwoCategory={subTwoCategory} addToCart={addToCart}
            cart={cart} changeVariantQuantity={changeVariantQuantity} CustomTabPanel={CustomTabPanel} Tab={Tab} Tabs={Tabs}
            tab={tab} setTab={setTab} Link={Link} baseUrl={baseUrl} SwipeableViews={SwipeableViews}
            handleBack={handleBack} handleNext={handleNext} ArrowBackIcon={ArrowBackIcon} ArrowForwardIcon={ArrowForwardIcon}
            handleStepChange={handleStepChange} setActiveStep={setActiveStep} activeStep={activeStep} FiberManualRecordIcon={FiberManualRecordIcon}
            reviewValue={reviewValue} visibleTabs={visibleTabs}
        />



    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs style={{ maxWidth: 1500, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>

                <Grid container marginTop={2}>
                    <CategoryLocation Link={Link} topCategory={topCategory} subCategory={subCategory} subTwoCategory={subTwoCategory} />
                </Grid>
                <Grid container columnSpacing={12} marginTop={2}>
                    <Grid item xs={6}>

                        <div style={{ position: 'relative' }}>
                            <SwipeableViews
                                axis={'x'}
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents>
                                {selectedItem.images.map((image, index) => (
                                    <div key={index}>
                                        <img
                                            style={{
                                                maxHeight: '100%',
                                                maxWidth: '100%',
                                                objectFit: 'contain',
                                                // cursor: 'pointer',
                                                marginBottom: 6
                                            }}
                                            src={baseUrl + image.path}
                                        />
                                    </div>
                                ))}
                            </SwipeableViews>

                            {selectedItem.images.length > 1 &&
                                <>
                                    <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
                                        <IconButton>
                                            <ArrowBackIcon onClick={handleBack} />
                                        </IconButton>
                                    </div>
                                    <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}>
                                        <IconButton onClick={handleNext}>
                                            <ArrowForwardIcon />
                                        </IconButton>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {selectedItem.images.map((_, index) => (
                                                <FiberManualRecordIcon
                                                    key={index}
                                                    style={{ fontSize: 12, margin: '0 4px', color: index === activeStep ? '#fbdd7e' : '#ccc' }}
                                                    onClick={() => handleStepChange(index)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            }


                        </div>

                        {selectedItem.images.length > 1 &&
                            <Grid container display='flex' justifyContent='center' spacing={1}>
                                {selectedItem.images.map((image, index) =>
                                    <Grid item xs={2}>
                                        <img style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', outline: index === activeStep && 'solid 2px #a19d9d' }} src={baseUrl + image.path} onMouseEnter={() => setActiveStep(index)} />
                                    </Grid>
                                )}
                            </Grid>
                        }

                    </Grid>
                    <Grid item xs={6}>


                        <h1 style={{ margin: 0 }}>{selectedItem.name}</h1>
                        <h4 style={{ margin: 0, fontWeight: 'normal' }}>{selectedItem.brand}</h4>
                        <br />

                        <Grid container>
                            <Grid item xs>
                                <h1 style={{ margin: 0 }}>{format(selectedItem.price * (1 + (selectedItem.vatRateSE / 10000)) / 100)}  kr</h1>
                            </Grid>
                            <Grid item xs='auto'>
                                <Typography component="legend">{selectedItem?.reviews.length} Recensioner</Typography>
                                <Rating name="read-only" value={reviewValue} readOnly />
                            </Grid>
                        </Grid>



                        {selectedItem.variants.length > 1 &&
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={variant}
                                        onChange={({ target }) => setVariant(target.value)}>
                                        {selectedItem.variants.map(variant =>
                                            <MenuItem value={variant.id} disabled={variant.sellable > 0 ? false : true}>{variant.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Box>
                        }


                        {!variantInCart
                            ? <><br /> <Button fullWidth variant="contained" aria-label='add-to-cart' onClick={addToCart} startIcon={<AddShoppingCartIcon />}>Lägg till i varukorg</Button> </>
                            : <>
                                <Box marginTop='5.5px' display='flex' alignItems='center' justifyContent='center'>
                                    Antal
                                    <IconButton onClick={() => changeVariantQuantity(-1, variant)} color="primary" aria-label="increment-product">
                                        <IndeterminateCheckBoxIcon style={{ fontSize: '34px' }} />
                                    </IconButton>
                                    {cart[variant]?.quantity} st
                                    <IconButton onClick={() => changeVariantQuantity(1, variant)} color="primary" aria-label="dimunition-product">
                                        <AddBoxIcon style={{ fontSize: '34px' }} />
                                    </IconButton>
                                </Box>
                            </>
                        }

                        <Grid container sx={{ borderBottom: 1, borderColor: 'grey.300', paddingBottom: 1, marginTop: 2 }}>
                            <Grid item xs>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <LocalShippingOutlinedIcon fontSize='small' />
                                    <Typography variant="body2">Fri frakt över 499 kr</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs='auto'>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <LocalOfferOutlinedIcon fontSize='small' />
                                    <Typography variant="body2">Prisgaranti</Typography>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ borderBottom: 1, borderColor: 'grey.300', paddingBottom: 1, paddingTop: 1 }}>
                            <Markdown>{selectedItem?.description?.split('\n')[0]}</Markdown>
                        </Grid>

                        <Grid container marginTop={1}>
                            <Grid item xs>
                                <Typography color='#8a8a8a' fontSize='0.8rem' >
                                    SKU #FP9789-004R
                                </Typography>
                            </Grid>
                            <Grid item xs='auto'>
                                producerimg
                            </Grid>
                        </Grid>


                        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} aria-label="tabs" centered>
                            {visibleTabs.map((tab, i) =>
                                <Tab label={tab.name} id={`simple-tab-${i}`} />
                            )}
                        </Tabs>

                        <CustomTabPanel value={tab} index={0}>
                            <Markdown>{selectedItem.description}</Markdown>
                        </CustomTabPanel>

                        {selectedItem.description2 &&
                            <CustomTabPanel value={tab} index={1}>
                                {selectedItem.description2}
                                hej
                            </CustomTabPanel>}

                        <CustomTabPanel value={tab} index={selectedItem.description2 ? 2 : 1}>
                            {selectedItem.reviews.length}

                            review
                        </CustomTabPanel>



                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default Item