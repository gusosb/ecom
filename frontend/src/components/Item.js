
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote, getSite, getCategories } from '../requests'
import {
    BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, Outlet, useOutletContext, useNavigate
} from "react-router-dom"
import { useState } from "react"


import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
// import Button from '@mui/material-next/Button'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'

const Item = ({ cart, setCart, changeVariantQuantity }) => {

    const { itemid } = useParams()

    const result = useQuery(['categories'], getCategories, {
        refetchOnWindowFocus: false
    })
    const categories = result.data || []

    const selectedItem = categories.flatMap(a => a.SubOne.flatMap(b => b.SubTwo.flatMap(c => {
        if (c.items.find(d => d.id === parseInt(itemid))) {
            return { ...c.items.find(d => d.id === parseInt(itemid)), subTwo: c.id, subOne: b.id, top: a.id }
        }
        return []
    })
    ))[0]

    const [variant, setVariant] = useState(selectedItem.variants.find(e => e.sellable > 0)?.id)
    const [selectedImage, setSelectedImage] = useState(selectedItem.images[0])


    const topCategory = categories.find(category => category.id === selectedItem.top)
    const subCategory = topCategory?.SubOne.find(category => category.id === selectedItem.subOne)
    const subTwoCategory = subCategory?.SubTwo.find(category => category.id === selectedItem.subTwo)

    const addToCart = (value) => {
        const values = { ...cart }
        values[variant] = { ...selectedItem, quantity: 1 }
        setCart(values)
    }

    // onMouseEnter={() => setImage(product.prodImg)

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs style={{ maxWidth: 1500, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>
                <Link to={`/${topCategory.name}`}>{topCategory.name}</Link>
                {subCategory && <><Link to={`/${topCategory.name}/${subCategory.name}`}> / {subCategory.name}</Link> /
                    {subTwoCategory && <Link to={`/${topCategory.name}/${subCategory.name}/${subTwoCategory.name}`}>{subTwoCategory.name} /</Link>}</>
                }
                <Grid container columnSpacing={12}>
                    <Grid item xs={6}>

                        <img style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} src={productPlaceholder} />
                        <Grid container display='flex' justifyContent='center' spacing={2}>
                            <Grid item xs={2}>
                                <img style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} src={productPlaceholder} />
                            </Grid>
                            <Grid item xs={2}>
                                <img style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} src={productPlaceholder} />
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={6}>


                        <h1 style={{ margin: 0 }}>{selectedItem.name}</h1>

                        <h3 style={{ margin: 0 }}>{selectedItem.price} kr</h3>


                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
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


                        <IconButton onClick={() => changeVariantQuantity(-1, variant)} color="primary" aria-label="increment-product">
                            <RemoveCircleSharpIcon style={{ fontSize: '34px' }} />
                        </IconButton>
                        {cart[variant]?.quantity}
                        <IconButton onClick={() => changeVariantQuantity(1, variant)} color="primary" aria-label="dimunition-product">
                            <AddCircleSharpIcon style={{ fontSize: '34px' }} />
                        </IconButton>
                        <Button variant="contained" aria-label='add-to-cart' onClick={() => addToCart(selectedItem)} startIcon={<AddShoppingCartIcon />}>Lägg till i varukorg</Button>



                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default Item