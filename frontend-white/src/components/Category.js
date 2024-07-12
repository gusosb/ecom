import { Link, useParams, useLocation } from 'react-router-dom';
import { useWindowSize, StyledButton, convertTaxRate } from '../helpers';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CategoryMobile from './CategoryMobile';
import { Typography } from '@mui/material';
import { useState } from 'react';
import '../styles.css';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';

const Product = styled(Box)({
  position: 'relative',
  textAlign: 'center',
  '& img': {
    width: '100%',
    height: '100%'
  }
});

const ProductInfo = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: '8px 0',
  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  }
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

const Category = ({ categories, baseUrl, format, isLoading, selectedCurrency, Helmet }) => {
  const categoryName = useParams().categoryname;
  const selectedCategory = categories.find((category) => category.name.toLowerCase() === categoryName?.toLowerCase()) || [];

  const items = selectedCategory.items || categories.flatMap((category) => category.items);

  const location = useLocation();
  const isShopRoute = location.pathname === '/shop';

  const windowSize = useWindowSize();
  const falseHovered = items.reduce((acc, e) => {
    acc[e.id] = false;
    return acc;
  }, {});

  const [hovered, setHovered] = useState(falseHovered);

  const changeHovered = (id) => {
    setHovered((prevHovered) => ({
      ...prevHovered,
      [id]: !prevHovered[id]
    }));
  };

  const theme = useTheme();

  if (windowSize.width < 800)
    return (
      <CategoryMobile
        items={items}
        isShopRoute={isShopRoute}
        windowSize={windowSize}
        baseUrl={baseUrl}
        format={format}
        ProductInfo={ProductInfo}
        Product={Product}
        categories={categories}
        StyledButton={StyledButton}
        Typography={Typography}
        selectedCategory={selectedCategory}
        isLoading={isLoading}
        ProductSkeleton={ProductSkeleton}
        selectedCurrency={selectedCurrency}
        theme={theme}
      />
    );

  return (
    <>
      <Helmet>
        <title>GUSTAF LUND | Shop Premium Cashmere Men's Clothing</title>
        <meta
          name="description"
          content="Explore the GUSTAF LUND shop and discover our collection of premium cashmere men's clothing. Find sophisticated and timeless garments crafted with meticulous attention to detail."
        />
        <link rel="canonical" href="https://www.gustaflund.com/shop" />
      </Helmet>
      <Grid
        container
        borderBottom={1}
        borderColor="#e6e6e6"
        display="flex"
        justifyContent="center"
        sx={{
          position: 'sticky',
          top: 57,
          zIndex: '50',
          background: '#ffffff'
        }}
      >
        <StyledButton
          key="all"
          component={Link}
          to={`/shop`}
          sx={{
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: isShopRoute ? theme.palette.secondary.main : 'transparent'
            },
            pb: '2px'
          }}
        >
          ALL
        </StyledButton>

        {categories.map((category) => (
          <StyledButton
            key={category.id}
            component={Link}
            to={`/shop/${category.name.toLowerCase()}`}
            sx={{
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: selectedCategory.id === category.id ? theme.palette.secondary.main : 'transparent'
              },
              pb: '2px'
            }}
          >
            {category.name}
          </StyledButton>
        ))}
      </Grid>

      <Grid container>
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProductSkeleton height={605} />
              </Grid>
            ))
          : items.map((item, index) => {
              const hoverImage = item.images.find((e) => e.isHover)?.path;

              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Product
                    component={Link}
                    to={`/p/${item.id}/${item.name}`}
                    onMouseEnter={() => changeHovered(item.id)}
                    onMouseLeave={() => changeHovered(item.id)}
                  >
                    <div
                      style={{
                        width: '100%',
                        paddingTop: '100%',
                        position: 'relative'
                      }}
                    >
                      {hoverImage && (
                        <img
                          src={baseUrl + hoverImage}
                          alt={item.name}
                          style={{
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            display: hovered[item.id] && hoverImage ? 'block' : 'none'
                          }}
                        />
                      )}
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
                          display: hovered[item.id] && hoverImage ? 'none' : 'block'
                        }}
                      />
                    </div>

                    <ProductInfo className="ProductInfo">
                      <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', color: 'rgba(200, 200, 200, 0.9) !important' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'rgba(200, 200, 200, 0.9) !important' }}>
                        {selectedCurrency === 'SEK'
                          ? format((item.price_sek * (1 + convertTaxRate(item.vatRateSE))) / 100)
                          : format(item.price_eur / 100)}{' '}
                        {selectedCurrency}
                      </Typography>
                    </ProductInfo>
                  </Product>
                </Grid>
              );
            })}
      </Grid>
    </>
  );
};

export default Category;
