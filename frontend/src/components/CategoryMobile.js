import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote, getSite, getCategories } from '../requests'
import {
    BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, Outlet, useOutletContext, useNavigate
} from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import CategoryLocation from './blocks/CategoryLocation'
import { useEffect, useState } from "react"

import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import testimage from '../images/pwp-pouch-v4-main_1.webp'
import Chip from '@mui/material/Chip';

const CategoryMobile = ({ selectedTopCategory, selectedSubCategory, selectedSubTwoCategory, lowestCategory, items, windowSize, subCategories }) => {

    const splitDescription = lowestCategory.description?.slice(0, 250)


    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs style={{ maxWidth: 1500, height: '100%' }} sx={{ m: 1, mt: 0, mb: 0 }}>
                    <Grid container >
                        <Grid item xs={12} display='flex' marginTop={1.2} justifyContent='center'>
                            <CategoryLocation Link={Link} topCategory={selectedTopCategory} subCategory={selectedSubCategory} subTwoCategory={selectedSubTwoCategory} />
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center' >
                            <h1 style={{ marginBottom: 0 }}>{lowestCategory.name}</h1>
                        </Grid>


                        <Grid item xs={12} m={2} marginTop={0}>
                            <ReactMarkdown children={splitDescription} />
                        </Grid>



                        <Box ml={1} mr={1}>

                            {subCategories.map(category =>
                                <>
                                    <Chip sx={{ marginRight: 0.5 }}
                                        component={Link}
                                        to={selectedSubCategory ? `/${selectedTopCategory.name}/${selectedSubCategory.name}/${category.name}` : `/${selectedTopCategory.name}/${category.name}`}
                                        label={category.name}
                                        variant={category.id === lowestCategory.id ? 'filled' : 'outlined'}
                                        color="primary"
                                        size='large'>
                                    </Chip>
                                </>
                            )}

                        </Box>



                        <Grid container spacing={0} marginTop={2}>
                            {items.map(item =>
                                <>

                                    <Grid item xs={6}>
                                        <IconButton
                                            component={Link}
                                            to={`/product/${item.id}/${item.name.replaceAll(' ', '-')}`}
                                            // to={`/${topCategoryName}/${subCategoryName}/${subTwoCategoryName}/${item.id}`}
                                            sx={{
                                                borderRadius: 0,
                                                '.MuiTouchRipple-ripple .MuiTouchRipple-child': {
                                                    borderRadius: 5,
                                                    // backgroundColor: 'red',
                                                },
                                            }}>
                                            {/* <img className='product-image' src={item.images[0]?.path} /> */}
                                            <img className='product-image' src={testimage} />
                                        </IconButton>
                                        <Box margin={1} marginTop={0}>
                                            {item.name}
                                            <br />
                                            desc?
                                            <br />
                                            pris?
                                        </Box>

                                    </Grid>

                                </>
                            )}
                        </Grid>

                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}

export default CategoryMobile