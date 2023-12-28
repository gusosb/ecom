import { useState, useRef, useEffect } from "react"
import Markdown from 'react-markdown'
import '../styles.css'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Box from '@mui/material/Box'
import CircleIcon from '@mui/icons-material/Circle'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Rating from '@mui/material/Rating';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import Paper from '@mui/material/Paper';
import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'
import CategoryLocation from "./blocks/CategoryLocation";


const ItemMobile = ({ variant, selectedItem, setVariant, topCategory, subCategory,
  subTwoCategory, format, addToCart, variantInCart, changeVariantQuantity,
  cart, CustomTabPanel, Tab, Tabs, tab, setTab, Link, baseUrl }) => {

  const [sticky, setSticky] = useState(true)

  const ref = useRef(undefined)
  const ref2 = useRef(undefined)

  const handleScroll = () => {
    const y = window.innerHeight + window.pageYOffset;
    const ofstop = ref.current && ref.current.offsetTop + ref.current.offsetHeight + ref2.current.offsetHeight;

    if (y < ofstop) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const visibleTabs = [
    { name: 'beskriving' },
    selectedItem.description2 && { name: 'innehåll' },
    { name: 'recensioner' }
  ].filter(Boolean)




  return (
    <>
      <Grid container>

        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>

          <Grid item xs sx={{ m: 2, mt: 0, mb: 0, }}>


            <Grid container marginTop={1.2} paddingTop={0} sx={{ fontSize: 23 }}>
              <CategoryLocation Link={Link} topCategory={topCategory} subCategory={subCategory} subTwoCategory={subTwoCategory} />
            </Grid>


            <h1 style={{ margin: 0 }}>{selectedItem.name}</h1>
            <h4 style={{ margin: 0, fontWeight: 'normal' }}>{selectedItem.brand}</h4>
            <br />

            <Grid container>
              <img src={baseUrl + selectedItem.images[0].path} style={{ maxWidth: '100%', height: 'auto' }} />
            </Grid>


            <Grid container sx={{ borderBottom: 1, borderColor: 'grey.300', paddingBottom: 1, paddingTop: 3 }}>
              <Typography component="legend">{selectedItem.reviews.length} Recensioner</Typography>

              <Rating name="read-only" value={3} readOnly />
              <br />
            </Grid>

            <Grid container paddingTop={2}>
              <Grid item xs>
                <Typography>
                  <h1 style={{ margin: 0 }}>{format(selectedItem.price / 100)} kr</h1>
                </Typography>
              </Grid>
              <Grid item xs='auto' alignSelf='center'>
                <CircleIcon sx={{ fontSize: '13px', color: '#209c00' }} /> Finns i lager
              </Grid>
            </Grid>


            <Grid container sx={{ borderBottom: 1, borderColor: 'grey.300', paddingBottom: 1, paddingTop: 1 }}>
              <Grid item xs>
                <div ref={ref}>
                  <Markdown >{selectedItem?.description?.split('\n')[0]}</Markdown>
                </div>
              </Grid>
            </Grid>


            <Paper ref={ref2} sx={{ backgroundColor: '#faf9f8', paddingTop: 2, boxShadow: sticky ? '0px -2px 4px -4px rgba(0,0,0,0.7)' : 'none' }} className={sticky ? 'stickyy' : undefined}>


              <Grid container spacing={2} padding={sticky && 2} paddingTop={0}>
                {selectedItem.variants.length > 1 &&
                  <Grid item xs>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={variant}
                        onChange={({ target }) => setVariant(target.value)}>
                        {selectedItem?.variants?.map(variant =>
                          <MenuItem value={variant.id} disabled={variant.sellable > 0 ? false : true}>{variant.name}</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                }
                <Grid item xs>


                  {!variantInCart
                    ? <><Button sx={{ height: '100%' }} fullWidth variant="contained" color="primary" disableElevation onClick={addToCart} endIcon={<AddShoppingCartIcon />} >
                      Lägg till
                    </Button> </>
                    : <>
                      <Box marginTop='5.5px' display='flex' alignItems='center' justifyContent='center'>
                        Antal
                        <IconButton onClick={() => changeVariantQuantity(-1, variant)} color="primary" aria-label="increment-product">
                          <IndeterminateCheckBoxIcon style={{ fontSize: '34px' }} />
                        </IconButton>
                        {cart[variant]?.quantity}
                        <IconButton onClick={() => changeVariantQuantity(1, variant)} color="primary" aria-label="dimunition-product">
                          <AddBoxIcon style={{ fontSize: '34px' }} />
                        </IconButton>
                      </Box>
                    </>
                  }
                </Grid>
              </Grid>
            </Paper>

            <Grid container sx={{ borderBottom: 1, borderColor: 'grey.300', paddingBottom: 1.3, marginTop: 3 }}>
              <Grid item xs>
                <Stack direction="row" alignItems="center" gap={1}>
                  <LocalShippingOutlinedIcon fontSize='small' />
                  <Typography variant="body2">Fri frakt över 499 kr</Typography>
                </Stack>
              </Grid>
              <Grid item xs>
                <Stack direction="row" alignItems="center" gap={1}>
                  <LocalOfferOutlinedIcon fontSize='small' />
                  <Typography variant="body2">Prisgaranti</Typography>
                </Stack>
              </Grid>
            </Grid>

            <Tabs sx={{ marginTop: 2 }} value={tab} onChange={(e, newValue) => setTab(newValue)} aria-label="tabs">
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
    </>
  )
}

export default ItemMobile