import { Link, useParams, useLocation } from "react-router-dom"
import { useWindowSize, StyledButton, convertTaxRate } from '../helpers'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CategoryMobile from './CategoryMobile'
import { Typography } from "@mui/material"
import { useState } from 'react';
import '../styles.css';
import Skeleton from '@mui/material/Skeleton';


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

const ProductSkeleton = ({ height }) => (
  <Product>
    <Skeleton variant="rectangular" width="100%" height={height} />
    <ProductInfo>
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </ProductInfo>
  </Product>
);

const Category = ({ categories, baseUrl, format, isLoading }) => {

  const categoryName = useParams().categoryname;
  const selectedCategory = categories.find(category => category.name.toLowerCase() === categoryName?.toLowerCase()) || [];
  console.log('selectedCategory', selectedCategory.length > 0);

  const items = selectedCategory.items || categories.flatMap(category => category.items);
  console.log('items', items);

  const location = useLocation();
  const isShopRoute = location.pathname === '/shop';

  const windowSize = useWindowSize();
  const falseHovered = items.reduce((acc, e) => {
    acc[e.id] = false;
    return acc;
  }, {});

  const [hovered, setHovered] = useState(falseHovered);


  const changeHovered = (id) => {
    setHovered(prevHovered => ({
      ...prevHovered,
      [id]: !prevHovered[id],
    }));
  };

  if (windowSize.width < 800) return <CategoryMobile items={items} isShopRoute={isShopRoute}
    windowSize={windowSize} baseUrl={baseUrl} format={format} ProductInfo={ProductInfo} Product={Product}
    categories={categories} StyledButton={StyledButton} Typography={Typography} selectedCategory={selectedCategory} isLoading={isLoading} ProductSkeleton={ProductSkeleton}
  />


  return (
    <>
      <Grid container borderBottom={1} borderColor='#e6e6e6' display='flex' justifyContent='center'
        sx={{
          position: 'sticky',
          top: 57,
          zIndex: '50',
          background: '#ffffff',
        }}
      >
        <StyledButton key='all' component={Link} to={`/shop`}
          sx={{
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: isShopRoute ? '#fbdd7e' : 'transparent'
            },
            pb: '2px',
          }}
        >Allt</StyledButton>

        {categories.map(category =>
          <StyledButton key={category.id} component={Link} to={`/shop/${category.name.toLowerCase()}`}
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

        {isLoading ? (
          Array.from({ length: 4 }, (_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProductSkeleton height={605} />
            </Grid>
          ))
        ) : (
          items.map((item, index) => {
            const hoverImage = item.images.find(e => e.isHover)?.path;

            return <Grid item xs={12} sm={6} md={3} key={index}>
              <Product component={Link} to={`/product/${item.id}/${item.name}`}
                onMouseEnter={() => changeHovered(item.id)}
                onMouseLeave={() => changeHovered(item.id)}
              >
                <div style={{ width: '100%', paddingTop: '100%', position: 'relative' }}>
                  {hoverImage && <img
                    src={baseUrl + hoverImage}
                    alt={item.name}
                    style={{
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                      display: hovered[item.id] && hoverImage ? 'block' : 'none',
                    }}
                  />}
                  <img
                    src={baseUrl + item.images[0]?.path}
                    alt={item.name}
                    style={{
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                      display: hovered[item.id] && hoverImage ? 'none' : 'block',
                    }}
                  />
                </div>

                <ProductInfo className="ProductInfo">
                  <Typography variant="subtitle1" sx={{ textTransform: 'uppercase' }}>{item.name}</Typography>
                  <Typography variant="body1">{format(item.price * (1 + convertTaxRate(item.vatRateSE)) / 100)} SEK</Typography>
                </ProductInfo>
              </Product>
            </Grid>
          }
          )
        )}

      </Grid>
    </>
  );
}

export default Category;