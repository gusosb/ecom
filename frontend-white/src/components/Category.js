import { Link, useParams } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import { useWindowSize, StyledButton } from '../helpers'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CategoryMobile from './CategoryMobile'
import { Typography } from "@mui/material"

const Product = styled(Box)({
  position: 'relative',
  textAlign: 'center',
  '& img': {
    width: '100%',
    height: '100%',
  },
});

const ProductInfo = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: '8px 0',
  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
}));

const Category = ({ categories, baseUrl, format }) => {

  const categoryName = useParams().categoryname;
  const selectedCategory = categories.find(category => category.name.toLowerCase() === categoryName?.toLowerCase()) || [];
  const items = selectedCategory.items || categories.flatMap(category => category.items);

  const windowSize = useWindowSize();

  if (windowSize.width < 800) return <CategoryMobile items={items}
    windowSize={windowSize} baseUrl={baseUrl} format={format} ProductInfo={ProductInfo} Product={Product}
    categories={categories} StyledButton={StyledButton} Typography={Typography} selectedCategory={selectedCategory}
  />

  return (
    <>
      <Grid container borderBottom={1} borderColor='#e6e6e6' display='flex' justifyContent='center'>
        {categories.map(category =>
          <StyledButton component={Link} to={`/shop/${category.name.toLowerCase()}`}
            sx={{
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: selectedCategory.id === category.id ? '#fbdd7e' : 'transparent'
              },
              pb: '2px',
            }}
          >{category.name}</StyledButton>
        )}
      </Grid>


      <Grid container>

        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Product component={Link} to={`/product/${item.id}/${item.name}`}>
              <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' alt={item.name} />
              <ProductInfo className="ProductInfo">
                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>{item.name}</Typography>
                <Typography variant="body1">{format(item.price * (1 + (item.vatRateSE / 100)) / 100)} SEK</Typography>
              </ProductInfo>
            </Product>
          </Grid>
        ))}

      </Grid>
    </>
  );
}

export default Category;