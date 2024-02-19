import { Link, useParams } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { useWindowSize } from '../helpers'

import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import CategoryMobile from './CategoryMobile'
import testimage from '../images/pwp-pouch-v4-main_1.webp'
import CategoryLocation from './blocks/CategoryLocation'
import { Typography } from "@mui/material"


const Category = ({ categories, baseUrl, format }) => {

  const topCategoryName = useParams().categoryname
  const subCategoryName = useParams().subonecategoryname
  const subTwoCategoryName = useParams().subtwocategoryname


  const selectedTopCategory = categories.find(category => category.name.toLowerCase() === topCategoryName?.toLowerCase())
  const selectedSubCategory = selectedTopCategory?.SubOne.find(category => category.name.toLowerCase() === subCategoryName?.toLowerCase())
  const selectedSubTwoCategory = selectedSubCategory?.SubTwo.find(category => category.name.toLowerCase() === subTwoCategoryName?.toLowerCase())

  const lowestCategory = selectedSubTwoCategory || selectedSubCategory || selectedTopCategory

  const subCategories = lowestCategory.SubTwo || lowestCategory.SubOne || selectedSubCategory.SubTwo


  const items = selectedSubTwoCategory?.items || selectedSubCategory?.SubTwo.flatMap(a => a.items) || selectedTopCategory.SubOne.flatMap(a => a.SubTwo).flatMap(b => b.items)

  const windowSize = useWindowSize()

  if (windowSize.width < 800) return <CategoryMobile selectedTopCategory={selectedTopCategory} selectedSubCategory={selectedSubCategory} selectedSubTwoCategory={selectedSubTwoCategory}
    lowestCategory={lowestCategory} items={items} windowSize={windowSize} subCategories={subCategories} baseUrl={baseUrl} format={format}
  />

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item xs style={{ maxWidth: 1500, height: '100%' }} sx={{ m: 20, mt: 0, mb: 0 }}>
        <Grid container>
          <Grid item xs={12} marginTop={1.2}>
            <CategoryLocation Link={Link} topCategory={selectedTopCategory} subCategory={selectedSubCategory} subTwoCategory={selectedSubTwoCategory} />
          </Grid>
          <Grid item xs={12}>
            <h1>{lowestCategory.name}</h1>

            <ReactMarkdown children={lowestCategory.longDescription} />

          </Grid>
          <Grid item xs={3}>
            <List>
              {subCategories.map(category =>
                <>
                  <ListItemButton
                    component={Link}
                    to={selectedSubCategory ? `/${topCategoryName}/${subCategoryName}/${category.name}` : `/${topCategoryName}/${category.name}`}
                    selected={category.id === lowestCategory.id}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: '#F5DEB3',
                        //backgroundColor: '#fbdd7e',
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: '#F5DEB3'
                      }
                    }}
                  >
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                </>
              )}
            </List>
          </Grid>
          <Grid item xs sx={{ paddingLeft: 2 }}>

            <Grid container spacing={0}>
              {items.map(item =>
                <>
                  <Grid item xs={3} height={350}>
                    <IconButton
                      component={Link}
                      to={`/product/${item.id}/${item.name.replaceAll(' ', '-')}`}
                      sx={{
                        borderRadius: 0,
                        '.MuiTouchRipple-ripple .MuiTouchRipple-child': {
                          borderRadius: 5,
                          // backgroundColor: 'red',
                        },
                      }}>
                      <img className='product-image' src={baseUrl + item.images[0].path} />
                    </IconButton>
                    <Box margin={1} marginTop={0}>
                      <Typography variant='body' style={{ margin: 0, color: 'inherit', textDecoration: 'inherit' }} component={Link} to={`/product/${item.id}/${item.name}`}>
                        {item.name}
                      </Typography>
                      <br />
                      <b>{format(item.price * (1 + (item.vatRateSE / 10000)) / 100)}  kr</b>
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