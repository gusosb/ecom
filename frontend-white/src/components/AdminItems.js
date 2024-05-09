import { useState, useEffect, useMemo } from "react"
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { createCategory, createItem, changeItemStatus, updateItem, getAdminCategories, deleteImage, addImage, addVariant, updateVariant, updateCategory, baseUrl } from '../requests'
import {
    BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, Outlet, useOutletContext, useNavigate
} from "react-router-dom"

import { styled } from '@mui/system'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Box from '@mui/material/Box'
import TableRow from '@mui/material/TableRow'
import Grid from '@mui/material/Grid'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel';
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import CategoryIcon from '@mui/icons-material/Category'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'



const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);


const AdminItems = ({ queryClient }) => {

    const result = useQuery(['admincategories'], getAdminCategories, {
        refetchOnWindowFocus: false
    })
    const categories = result.data || []

    const topCategoryID = parseInt(useParams().categoryid)
    const subCategoryID = parseInt(useParams().subonecategoryid)
    const subTwoCategoryID = parseInt(useParams().subtwocategoryid)
    const variantID = parseInt(useParams().variantid)

    const itemID = useParams().itemid


    const [newImage, setNewImage] = useState('')
    const [imageIndex, setImageIndex] = useState('')
    const [isHover, setIsHover] = useState(false);


    const [categoryName, setCategoryName] = useState('')
    const [newCategoryName, setNewCategoryName] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')


    const [newItem, setNewItem] = useState({ name: '', price: 0, vatRateSE: 0, file: '' })

    const categoryID = parseInt(useParams().categoryid)

    const navigate = useNavigate()


    const selectedCategory = categories.find(category => category.id === categoryID) || [];

    const selectedItem = selectedCategory?.items?.find(item => item.id === parseInt(itemID)) || [];


    const selectedVariant = selectedItem.variants?.find(variant => variant.id === variantID)




    const [newVariant, setNewVariant] = useState('')
    const [newVariantSellable, setNewVariantSellable] = useState('')

    // these belong to the update item
    const [sellable, setSellable] = useState(0)
    const [sku, setSku] = useState('')
    const [vatRateSE, setVatRateSE] = useState(0)
    const [priceSEK, setPriceSEK] = useState(0)
    const [priceEUR, setPriceEUR] = useState(0)
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [details, setDetails] = useState('')
    const [sizefit, setSizefit] = useState('')
    const [care, setCare] = useState('')

    useEffect(() => {
        setSellable(selectedItem.sellable)
        setVatRateSE(selectedItem.vatRateSE)
        setPriceSEK(selectedItem.priceSEK)
        setPriceEUR(selectedItem.priceEUR)
        setSku(selectedItem.sku)
        setName(selectedItem.name)
        setBrand(selectedItem.brand)
        setDescription(selectedItem.description || '')
        setDetails(selectedItem.details || '')
        setSizefit(selectedItem.sizefit || '')
        setCare(selectedItem.care || '')

        !categoryName && setCategoryName(selectedCategory.name)
        !categoryDescription && setCategoryDescription(selectedCategory.description)

        if (selectedVariant) {
            setNewVariant(selectedVariant.name)
            setNewVariantSellable(selectedVariant.sellable)
        }
        else {
            setNewVariant('')
            setNewVariantSellable('')
        }
    }, [selectedItem, selectedVariant])

    const newCategoryMutation = useMutation(createCategory, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admincategories'] }) },
    })
    const newItemMutation = useMutation(createItem, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admincategories'] }) },
    })
    const changeActiveItemMutation = useMutation(changeItemStatus, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admincategories'] }) },
    })
    const updateItemMutation = useMutation(updateItem, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admincategories'] }) },
    })
    const updateVariantMutation = useMutation(updateVariant, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admincategories'] }) },
    })
    const deleteImageMutation = useMutation(deleteImage, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admincategories'] }) },
    })
    const addImageMutation = useMutation(addImage, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admincategories'] }) },
    })
    const addVariantMutation = useMutation(addVariant, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admincategories'] }) },
    })
    const updateCategoryMutation = useMutation(updateCategory, {
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admincategories'] }) },
    })


    const sendCategory = async (level, sub) => {
        switch (level) {
            case 'top':
                newCategoryMutation.mutate({ name: categoryName })
                break;
            case 'SubOne':
                newCategoryMutation.mutate({ name: categoryName, SubOneId: sub })
                break;
            case 'SubTwo':
                newCategoryMutation.mutate({ name: categoryName, SubTwoId: sub })
                break;
        }
        setCategoryName('')
    }

    const sendItem = () => {
        const formData = new FormData();
        Object.entries(newItem).forEach(([key, value]) => {
            formData.append(key, value)
        })
        formData.append('categoryId', categoryID)
        newItemMutation.mutate(formData)
    }
    const updateItemVariables = {
        sellable,
        vatRateSE,
        price_sek: priceSEK,
        price_eur: priceEUR,
        name,
        brand,
        description,
        sku,
        details,
        sizefit,
        care,
    }
    const sendUpdateItem = () => {
        updateItemMutation.mutate({ id: parseInt(itemID), ...updateItemVariables })
    }
    const sendUpdateVariant = () => {
        updateVariantMutation.mutate({ id: variantID, name: newVariant, sellable: newVariantSellable })
    }
    const sendDeleteImage = (id) => {
        deleteImageMutation.mutate(id)
    }
    const sendAddImage = () => {
        const formData = new FormData();
        formData.append('file', newImage);
        formData.append('itemId', itemID);
        formData.append('isHover', isHover);
        addImageMutation.mutate(formData);
    }
    const sendNewVariant = () => {
        addVariantMutation.mutate({ name: newVariant, itemId: selectedItem.id, sellable: newVariantSellable })
    }
    const changeNewItem = (value, action) => {
        const vals = { ...newItem }
        vals[action] = value
        setNewItem(vals)
    }
    const changeStatus = (id) => {
        changeActiveItemMutation.mutate(id)
    }

    const sendUpdateCategory = (id) => {
        updateCategoryMutation.mutate({ id, name: categoryName, description: categoryDescription })
        setCategoryName('')
    }

    return (
        <Grid container>
            <Grid item xs={2}>

                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">Categories</ListSubheader>
                    }>
                    {categories.map((category, i) =>
                        <>
                            <ListItemButton onClick={() => navigate(`/admin/items/${category.id}`)} sx={{ backgroundColor: (category.id === categoryID && !subCategoryID) && '#F0F7FF' }}>
                                <ListItemIcon>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText primary={category.name} />
                                {/* {category.id === topCategoryID ? <ExpandLess /> : <ExpandMore />} */}
                            </ListItemButton>
                        </>
                    )}
                </List>
            </Grid>

            <Grid item xs>
                <Grid container sx={{ p: 5 }}>
                    {/* lowest category, where items are connected */}
                    {selectedCategory?.items &&
                        <>

                            <Grid item xs={12}>

                                <TextField value={categoryName} onChange={({ target }) => setCategoryName(target.value)} id="outlined-basic" label="New Category Name" variant="outlined" />
                                <Button sx={{ ml: 2 }} variant="contained" onClick={() => sendUpdateCategory(selectedCategory.id)}>Change Category Name</Button>
                                <br />
                                <br />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField value={newItem.name} onChange={({ target }) => changeNewItem(target.value, 'name')} id="outlined-basic" label="Name" variant="outlined" />
                                <TextField value={newItem.price} onChange={({ target }) => changeNewItem(target.value, 'price')} id="outlined-basic" label="Price" variant="outlined" />
                                <TextField value={newItem.vatRateSE} onChange={({ target }) => changeNewItem(target.value, 'vatRateSE')} id="outlined-basic" label="vatRateSE" variant="outlined" />
                                <Button variant="contained" component="label">
                                    Image
                                    <input type='file' onChange={({ target }) => changeNewItem(target.files[0], 'file')} hidden accept="image/*" />
                                </Button>

                                <Button variant="contained" onClick={sendItem}>Create Item</Button>
                            </Grid>


                            <Grid container spacing={3} paddingTop={3}>
                                <Grid item xs='auto'>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">Price</TableCell>
                                                    <TableCell align="right">Sellable Stock</TableCell>
                                                    <TableCell align="right">vatRateSE</TableCell>
                                                    <TableCell align="right">Active</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {selectedCategory.items.map(row =>
                                                    <TableRow
                                                        component={Link}
                                                        to={`/admin/items/${topCategoryID}/${row.id}`}
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: row.id === selectedItem.id && '#F0F7FF' }}>
                                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                                        <TableCell align="right">{row.price}</TableCell>
                                                        <TableCell align="right">{row.sellable}</TableCell>
                                                        <TableCell align="right">{row.vatRateSE}</TableCell>
                                                        <TableCell align="right">{row.isActive ? <CheckIcon onClick={() => changeStatus(row.id)} sx={{ color: 'green' }} /> : <CloseIcon onClick={() => changeStatus(row.id)} sx={{ color: 'red' }} />}</TableCell>
                                                    </TableRow>
                                                )}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                {itemID && <>
                                    <Grid item xs>
                                        <Grid container spacing={2}>
                                            <Grid item xs='auto'>
                                                <TextField value={sellable} InputLabelProps={{ shrink: true }} onChange={({ target }) => setSellable(target.value)} id="outlined-basic" label="Set Sellable stock" variant="filled" />
                                                <br />
                                                <TextField value={vatRateSE} InputLabelProps={{ shrink: true }} onChange={({ target }) => setVatRateSE(target.value)} id="outlined-basic" label="Set vatRateSE" variant="filled" />
                                                <br />
                                                <TextField value={priceSEK} InputLabelProps={{ shrink: true }} onChange={({ target }) => setPriceSEK(target.value)} id="outlined-basic" label="Set price SEK" variant="filled" />
                                                <br />
                                                <TextField value={priceEUR} InputLabelProps={{ shrink: true }} onChange={({ target }) => setPriceEUR(target.value)} id="outlined-basic" label="Set price EUR" variant="filled" />
                                                <br />
                                                <TextField value={name} InputLabelProps={{ shrink: true }} onChange={({ target }) => setName(target.value)} id="outlined-basic" label="Set name" variant="filled" />
                                                <br />
                                                <TextField value={sku} InputLabelProps={{ shrink: true }} onChange={({ target }) => setSku(target.value)} id="outlined-basic" label="Set sku" variant="filled" />
                                                <br />
                                                <TextField value={brand} InputLabelProps={{ shrink: true }} onChange={({ target }) => setBrand(target.value)} id="outlined-basic" label="Set brand" variant="filled" />
                                                <br /><br />
                                                <Button variant="contained" onClick={sendUpdateItem}>Update item</Button>
                                                <br /><br />
                                                <TextField value={imageIndex} InputLabelProps={{ shrink: true }} onChange={({ target }) => setImageIndex(target.value)} id="outlined-basic" label="Image index" variant="filled" />
                                                <br /><br />
                                                <Button variant="contained" component="label">
                                                    Select Image
                                                    <input type='file' onChange={({ target }) => setNewImage(target.files[0])} hidden accept="image/*" />
                                                </Button>
                                                <br /><br />

                                                <FormControlLabel control={<Checkbox
                                                    checked={isHover}
                                                    onChange={({ target }) => setIsHover(target.checked)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />} label="Hovered Image" />
                                                <br /><br />
                                                <Button variant="contained" onClick={sendAddImage}>Add Image</Button>
                                            </Grid>

                                            <Grid item xs>
                                                Variants
                                                <br />
                                                <List aria-label="variants">
                                                    {selectedItem.variants.map(e =>
                                                        <ListItemButton
                                                            selected={e.id === variantID}
                                                            component={Link}
                                                            to={`/admin/items/${topCategoryID}/${itemID}/${e.id}`}>
                                                            <ListItemText primary={e.name} />
                                                        </ListItemButton>
                                                    )}

                                                </List>

                                                <br />

                                                <TextField value={newVariant} InputLabelProps={{ shrink: true }} onChange={({ target }) => setNewVariant(target.value)} id="outlined-basic" label="Variant Name" variant="filled" />
                                                <TextField value={newVariantSellable} InputLabelProps={{ shrink: true }} onChange={({ target }) => setNewVariantSellable(target.value)} id="outlined-basic" label="Variant Sellable" variant="filled" />

                                                {variantID
                                                    ? <Button onClick={sendUpdateVariant} variant="contained">Update Variant</Button>
                                                    : <Button onClick={sendNewVariant} variant="contained">New Variant</Button>
                                                }

                                            </Grid>

                                            <Grid item xs>
                                                {selectedItem.images.map(image =>
                                                    <>
                                                        {/* <img src={image.path} alt='' /> */}
                                                        <img style={{ objectFit: 'contain', maxWidth: '300px' }} src={baseUrl + image.path} alt='' />
                                                        <br />
                                                        <Button onClick={() => sendDeleteImage(image.id)} variant="contained">Delete image</Button>
                                                    </>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid container marginTop={2}>
                                            <StyledTextarea
                                                maxRows={4}
                                                aria-label="maximum height"
                                                placeholder="Enter item description"
                                                value={description}
                                                onChange={({ target }) => setDescription(target.value)}
                                            />
                                            <StyledTextarea
                                                maxRows={4}
                                                aria-label="maximum height"
                                                placeholder="Enter item details"
                                                value={details}
                                                onChange={({ target }) => setDetails(target.value)}
                                            />
                                            <StyledTextarea
                                                maxRows={4}
                                                aria-label="maximum height"
                                                placeholder="Enter item size & fit"
                                                value={sizefit}
                                                onChange={({ target }) => setSizefit(target.value)}
                                            />
                                            <StyledTextarea
                                                maxRows={4}
                                                aria-label="maximum height"
                                                placeholder="Enter item care"
                                                value={care}
                                                onChange={({ target }) => setCare(target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </>}
                            </Grid>
                        </>}

                    {(topCategoryID && !subCategoryID) && <>
                        <Grid item xs>
                            <TextField value={newCategoryName} onChange={({ target }) => setNewCategoryName(target.value)} id="outlined-basic" label="Category Name" variant="outlined" />

                            <br />
                            <br />

                            <Button variant="contained" onClick={() => sendCategory('top')}>Create top Category</Button>
                            <Button sx={{ ml: 2 }} variant="contained" onClick={() => sendCategory('SubOne', categoryID)}>Create sub Category</Button>
                            <br />
                            <br />
                            <TextField value={categoryName} InputLabelProps={{ shrink: true }} onChange={({ target }) => setCategoryName(target.value)} id="outlined-basic" label="Category Name" variant="outlined" />
                            <br />
                            <StyledTextarea
                                maxRows={4}
                                aria-label="maximum height"
                                placeholder="Enter item description"
                                value={categoryDescription}
                                onChange={({ target }) => setCategoryDescription(target.value)} />
                            <br />
                            <Button variant="contained" onClick={() => sendUpdateCategory(topCategoryID)}>Update Category</Button>
                        </Grid>
                    </>}
                    {(subCategoryID && !selectedCategory.items) && <>
                        <Grid item xs>
                            <TextField value={newCategoryName} InputLabelProps={{ shrink: true }} onChange={({ target }) => setNewCategoryName(target.value)} id="outlined-basic" label="New Sub Category" variant="outlined" />
                            <br />
                            <br />
                            <Button variant="contained" onClick={() => sendCategory('SubTwo', subCategoryID)}>Create Category</Button>

                            <br />
                            <br />
                            <TextField value={categoryName} InputLabelProps={{ shrink: true }} onChange={({ target }) => setCategoryName(target.value)} id="outlined-basic" label="Category Name" variant="outlined" />
                            <br />

                            <StyledTextarea
                                maxRows={4}
                                aria-label="maximum height"
                                placeholder="Enter item description"
                                value={categoryDescription}
                                onChange={({ target }) => setCategoryDescription(target.value)} />
                            <br />
                            <Button variant="contained" onClick={() => sendUpdateCategory(subCategoryID)}>Update category</Button>
                        </Grid>
                    </>}

                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminItems