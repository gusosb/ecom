import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote, getSite, getCategories } from '../requests'
import {
  BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, Outlet, useOutletContext, useNavigate
} from "react-router-dom"

import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import testimage from '../images/pwp-pouch-v4-main_1.webp'

// https://github.com/remarkjs/react-markdown

const Category = () => {

  const result = useQuery(['categories'], getCategories, {
    refetchOnWindowFocus: false
  })
  const categories = result.data || []

  const topCategoryName = useParams().categoryname
  const subCategoryName = useParams().subonecategoryname
  const subTwoCategoryName = useParams().subtwocategoryname


  const selectedTopCategory = categories.find(category => category.name.toLowerCase() === topCategoryName?.toLowerCase())
  const selectedSubCategory = selectedTopCategory?.SubOne.find(category => category.name.toLowerCase() === subCategoryName?.toLowerCase())
  const selectedSubTwoCategory = selectedSubCategory?.SubTwo.find(category => category.name.toLowerCase() === subTwoCategoryName?.toLowerCase())

  const lowestCategory = selectedSubTwoCategory || selectedSubCategory || selectedTopCategory

  const subCategories = lowestCategory.SubTwo || lowestCategory.SubOne || selectedSubCategory.SubTwo


  const items = selectedSubTwoCategory?.items || selectedSubCategory?.SubTwo.flatMap(a => a.items) || selectedTopCategory.SubOne.flatMap(a => a.SubTwo).flatMap(b => b.items)


  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item xs style={{ maxWidth: 1500, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>
        <Grid container>
          <Grid item xs={12}>
            <Link to={`/${topCategoryName}`}>{topCategoryName}</Link>
            {subCategoryName && <><Link to={`/${topCategoryName}/${subCategoryName}`}> / {subCategoryName}</Link> /
              {subTwoCategoryName && <Link to={`/${topCategoryName}/${subCategoryName}/${subTwoCategoryName}`}>{subTwoCategoryName} /</Link>}</>
            }
          </Grid>
          <Grid item xs={12}>
            hej
          </Grid>
          <Grid item xs={3}>
            <List>
              {subCategories.map(category =>
                <>
                  <ListItemButton
                    component={Link}
                    to={selectedSubCategory ? `/${topCategoryName}/${subCategoryName}/${category.name}` : `/${topCategoryName}/${category.name}`}
                    selected={category.id === lowestCategory.id}>
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                </>
              )}
            </List>
          </Grid>
          <Grid item xs sx={{ paddingLeft: 2 }}>

            <Grid container spacing={2}>
              {items.map(item =>
                <>
                  <Grid item xs={3} height={350}>
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
                    <Box margin={1}>
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
      </Grid>
    </Grid>
  )
}

export default Category