import { useState, useEffect, useMemo } from "react"
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { createCategory, createItem, changeItemStatus, updateItem, getAdminCategories, deleteImage, addImage, addVariant, updateVariant } from '../requests'
import {
    BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, Outlet, useOutletContext, useNavigate
} from "react-router-dom"

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
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import productPlaceholder from '../images/6872_100-Whey-Gold-Std-912-g-Vanilla-Ice-Cream_0922.webp'

const AdminItems = ({ queryClient }) => {

    const result = useQuery(['admincategories'], getAdminCategories, {
        refetchOnWindowFocus: false
    })
    const categories = result.data || []
    console.log(categories);

    const topCategoryID = parseInt(useParams().categoryid)
    const subCategoryID = parseInt(useParams().subonecategoryid)
    const subTwoCategoryID = parseInt(useParams().subtwocategoryid)
    const variantID = parseInt(useParams().variantid)

    const itemID = useParams().itemid


    const [categoryName, setCategoryName] = useState('')

    const [newImage, setNewImage] = useState('')
    const [imageIndex, setImageIndex] = useState('')


    const [newItem, setNewItem] = useState({ name: '', price: 0, vatRateSE: 0, file: '' })

    const categoryID = parseInt(useParams().categoryid)

    const navigate = useNavigate()

    const allCategories = [...categories.flatMap(a => a), ...categories.flatMap(b => b.SubOne), ...categories.flatMap(c => c.SubOne.flatMap(d => d.SubTwo))]
    console.log(allCategories);

    const selectedCategory = allCategories.find(category => category.id === subTwoCategoryID) || []
    console.log(selectedCategory);


    const selectedItem = selectedCategory?.items?.find(item => item.id === parseInt(itemID)) || []
    console.log(selectedItem.variants);

    const selectedVariant = selectedItem.variants?.find(variant => variant.id === variantID)
    console.log(selectedVariant);




    const [newVariant, setNewVariant] = useState('')
    const [newVariantSellable, setNewVariantSellable] = useState('')

    // these belong to the update item
    const [sellable, setSellable] = useState(0)
    const [vatRateSE, setVatRateSE] = useState(0)
    const [price, setPrice] = useState(0)
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')

    useEffect(() => {
        selectedItem.sellable && setSellable(selectedItem.sellable)
        selectedItem.vatRateSE && setVatRateSE(selectedItem.vatRateSE)
        selectedItem.price && setPrice(selectedItem.price)
        selectedItem.name && setName(selectedItem.name)
        selectedItem.brand && setBrand(selectedItem.brand)

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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admincategories'] })
        },
    });
    const newItemMutation = useMutation(createItem, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admincategories'] })
        },
    });
    const changeActiveItemMutation = useMutation(changeItemStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admincategories'] })
        },
    });
    const updateItemMutation = useMutation(updateItem, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admincategories'] })
        },
    });
    const updateVariantMutation = useMutation(updateVariant, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admincategories'] })
        },
    });
    const deleteImageMutation = useMutation(deleteImage, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admincategories'] })
        },
    });
    const addImageMutation = useMutation(addImage, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admincategories'] })
        },
    });
    const addVariantMutation = useMutation(addVariant, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admincategories'] })
        },
    });

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
    const sendUpdateItem = () => {
        updateItemMutation.mutate({ id: parseInt(itemID), sellable, vatRateSE, price, name, brand })
    }
    const sendUpdateVariant = () => {
        updateVariantMutation.mutate({ id: variantID, name: newVariant, sellable: newVariantSellable })
    }
    const sendDeleteImage = (id) => {
        deleteImageMutation.mutate(id)
    }
    const sendAddImage = () => {
        const formData = new FormData()
        formData.append('file', newImage)
        formData.append('itemId', itemID)
        addImageMutation.mutate(formData)
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
                            <ListItemButton onClick={() => category.id === categoryID ? navigate(`/admin/items`) : navigate(`/admin/items/${category.id}`)} sx={{ backgroundColor: (category.id === categoryID && !subCategoryID) && '#F0F7FF' }}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={category.name} />
                                {category.id === topCategoryID ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={category.id === topCategoryID} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {category.SubOne.map((subCategory, i) =>
                                        <>
                                            <ListItemButton onClick={() => (subCategory.id === subCategoryID && !subTwoCategoryID) ? navigate(`/admin/items/${category.id}`) : navigate(`/admin/items/${category.id}/${subCategory.id}`)} sx={{ pl: 4, backgroundColor: (subCategory.id === subCategoryID && !subTwoCategoryID) && '#F0F7FF' }}>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={subCategory.name} />
                                                {subCategory.id === subCategoryID ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                            <Collapse in={subCategory.id === subCategoryID} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {subCategory.SubTwo.map((subTwoCategory) =>
                                                        <>
                                                            <ListItemButton onClick={() => navigate(`/admin/items/${category.id}/${subCategory.id}/${subTwoCategory.id}`)} sx={{ pl: 8, backgroundColor: subTwoCategory.id === subTwoCategoryID && '#F0F7FF' }}>
                                                                <ListItemIcon>
                                                                    <InboxIcon />
                                                                </ListItemIcon>
                                                                <ListItemText primary={subTwoCategory.name || 'missing'} />
                                                                {/* {openSub[i].open ? <ExpandLess /> : <ExpandMore />} */}
                                                            </ListItemButton>
                                                        </>
                                                    )}
                                                </List>
                                            </Collapse>
                                        </>
                                    )}
                                </List>
                            </Collapse>
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
                                                        to={`/admin/items/${topCategoryID}/${subCategoryID}/${subTwoCategoryID}/${row.id}`}
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
                                    <Grid item xs='auto'>
                                        <TextField value={sellable} InputLabelProps={{ shrink: true }} onChange={({ target }) => setSellable(target.value)} id="outlined-basic" label="Set Sellable stock" variant="filled" />
                                        <br />
                                        <TextField value={vatRateSE} InputLabelProps={{ shrink: true }} onChange={({ target }) => setVatRateSE(target.value)} id="outlined-basic" label="Set vatRateSE" variant="filled" />
                                        <br />
                                        <TextField value={price} InputLabelProps={{ shrink: true }} onChange={({ target }) => setPrice(target.value)} id="outlined-basic" label="Set price" variant="filled" />
                                        <br />
                                        <TextField value={name} InputLabelProps={{ shrink: true }} onChange={({ target }) => setName(target.value)} id="outlined-basic" label="Set name" variant="filled" />
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
                                                    to={`/admin/items/${topCategoryID}/${subCategoryID}/${subTwoCategoryID}/${selectedItem.id}/${e.id}`}>
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
                                                <img style={{ objectFit: 'contain', maxWidth: '300px' }} src={productPlaceholder} alt='' />
                                                <br />
                                                <Button onClick={() => sendDeleteImage(image.id)} variant="contained">Delete image</Button>
                                            </>
                                        )}
                                    </Grid>

                                </>}
                            </Grid>
                        </>}

                    {(topCategoryID && !subCategoryID) && <>
                        <Grid item xs>
                            <TextField value={categoryName} onChange={({ target }) => setCategoryName(target.value)} id="outlined-basic" label="Category Name" variant="outlined" />

                            <br />
                            <br />

                            <Button variant="contained" onClick={() => sendCategory('top')}>Create top Category</Button>
                            <Button sx={{ ml: 2 }} variant="contained" onClick={() => sendCategory('SubOne', categoryID)}>Create sub Category</Button>
                        </Grid>
                    </>}
                    {(subCategoryID && !selectedCategory.items) && <>
                        <Grid item xs>
                            <TextField value={categoryName} onChange={({ target }) => setCategoryName(target.value)} id="outlined-basic" label="New Sub Category" variant="outlined" />
                            <br />
                            <br />
                            <Button variant="contained" onClick={() => sendCategory('SubTwo', categoryID)}>Create Category</Button>
                        </Grid>
                    </>}

                </Grid>
            </Grid>


        </Grid>
    )
}

export default AdminItems