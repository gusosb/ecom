import { useState, useEffect, useMemo } from "react"
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { createCategory, createItem, changeItemStatus, updateItem, getAdminCategories, deleteImage, addImage } from '../requests'
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


    const [categoryName, setCategoryName] = useState('')
    const topCategories = categories.reduce((acc, obj) => { return { ...acc, [obj.id]: false } }, {})
    const [openTop, setOpenTop] = useState(topCategories)

    const [newImage, setNewImage] = useState('')
    const [imageIndex, setImageIndex] = useState('')


    const subOneCategories = categories.flatMap(e => e.SubOne).reduce((acc, obj) => { return { ...acc, [obj.id]: false } }, {})
    const [openSub, setOpenSub] = useState(subOneCategories)

    useEffect(() => {
        setOpenTop(topCategories)
        setOpenSub(subOneCategories)
    }, [categories])


    const [newItem, setNewItem] = useState({ name: '', price: 0, vatRateSE: 0, file: '' })

    const categoryID = parseInt(useParams().categoryid)
    const itemID = useParams().itemid

    const navigate = useNavigate()

    const allCategories = [...categories.flatMap(a => a), ...categories.flatMap(b => b.SubOne), ...categories.flatMap(c => c.SubOne.flatMap(d => d.SubTwo))]
    const selectedCategory = allCategories.find(category => category.id === categoryID) || []

    const selectedItem = selectedCategory?.items?.find(item => item.id === parseInt(itemID)) || []
    

    // these belong to the update item
    const [sellable, setSellable] = useState(0)
    const [vatRateSE, setVatRateSE] = useState(0)
    const [price, setPrice] = useState(0)
    const [name, setName] = useState('')
    useEffect(() => {
        selectedItem.sellable && setSellable(selectedItem.sellable)
        selectedItem.vatRateSE && setVatRateSE(selectedItem.vatRateSE)
        selectedItem.price && setPrice(selectedItem.price)
        selectedItem.name && setName(selectedItem.name)
    }, [selectedItem])

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

    const handleClick = (values, level, id) => {
        const vals = values
        vals[id] = !vals[id]
        switch (level) {
            case 'openTop':
                setOpenTop(vals);
                break;
            case 'openSub':
                setOpenSub(vals);
                break;
        }
        navigate(`/admin/items/${id}`)
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
        updateItemMutation.mutate({ id: parseInt(itemID), sellable, vatRateSE, price, name })
    }
    const sendDeleteImage = (id) => {
        deleteImageMutation.mutate(id)
    }
    const sendAddImage = () => {
        const formData = new FormData();
        formData.append('file', newImage)
        formData.append('itemId', itemID)
        addImageMutation.mutate(formData)
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
                            <ListItemButton onClick={() => handleClick(openTop, 'openTop', category.id)} sx={{ backgroundColor: category.id === categoryID && '#F0F7FF' }}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={category.name} />
                                {openTop[category.id] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openTop[category.id]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {category.SubOne.map((subCategory, i) =>
                                        <>
                                            <ListItemButton onClick={() => handleClick(openSub, 'openSub', subCategory.id)} sx={{ pl: 4, backgroundColor: subCategory.id === categoryID && '#F0F7FF' }}>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={subCategory.name} />
                                                {openSub[subCategory.id] ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                            <Collapse in={openSub[subCategory.id]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {subCategory.SubTwo.map((subTwoCategory) =>
                                                        <>
                                                            <ListItemButton onClick={() => navigate(`/admin/items/${subTwoCategory.id}`)} sx={{ pl: 8, backgroundColor: subTwoCategory.id === categoryID && '#F0F7FF' }}>
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
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: row.id === selectedItem.id && '#F0F7FF' }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <IconButton onClick={() => navigate(`/admin/items/${categoryID}/${row.id}`)}>{row.name}</IconButton>
                                                        </TableCell>
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
                                        <br /><br />
                                        <Button variant="contained" onClick={sendUpdateItem}>Update item</Button>
                                        <br /><br />
                                        <TextField value={imageIndex} InputLabelProps={{ shrink: true }} onChange={({ target }) => setImageIndex(target.value)} id="outlined-basic" label="Image index" variant="filled" />
                                        <br /><br />
                                        <Button variant="contained" component="label">
                                            Image
                                            <input type='file' onChange={({ target }) => setNewImage(target.files[0])} hidden accept="image/*" />
                                        </Button>
                                        <br /><br />
                                        <Button variant="contained" onClick={sendAddImage}>Add Image</Button>
                                    </Grid>
                                    <Grid item xs>
                                        {selectedItem.images.map(image =>
                                            <>
                                                {/* <img src={image.path} alt='' /> */}
                                                <img style={{ objectFit: 'contain', maxWidth: '100%' }} src={productPlaceholder} alt='' />
                                                <br />
                                                <Button onClick={() => sendDeleteImage(image.id)} variant="contained">Delete image</Button>
                                            </>
                                        )}
                                    </Grid>

                                </>}
                            </Grid>
                        </>}

                    {(selectedCategory.SubOne || selectedCategory.length < 1) && <>
                        <Grid item xs>
                            <TextField value={categoryName} onChange={({ target }) => setCategoryName(target.value)} id="outlined-basic" label="Category Name" variant="outlined" />

                            <br />
                            <br />

                            <Button variant="contained" onClick={() => sendCategory('top')}>Create top Category</Button>
                            <Button sx={{ ml: 2 }} variant="contained" onClick={() => sendCategory('SubOne', categoryID)}>Create sub Category</Button>
                        </Grid>
                    </>}
                    {selectedCategory.SubTwo && <>
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