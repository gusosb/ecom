import { Link } from 'react-router-dom';
import { convertTaxRate } from '../helpers';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FooterMobile from './FooterMobile';

const CategoryMobile = ({
  categories,
  StyledButton,
  Product,
  ProductInfo,
  Typography,
  selectedCategory,
  items,
  baseUrl,
  format,
  isShopRoute,
  ProductSkeleton,
  isLoading,
  selectedCurrency,
  theme
}) => {
  //const [, footerHeight] = useOutletContext();

  return (
    <>
      <Box sx={{ minHeight: `calc(100vh - ${259}px)` }}>
        <Grid container>
          {isLoading
            ? Array.from({ length: 4 }, (_, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}>
                  <ProductSkeleton height={310} />
                </Grid>
              ))
            : items.map((item, index) => {
                const sortedImages = item.images?.slice().sort((a, b) => a.index - b.index);
                const lowestIndexImage = sortedImages ? sortedImages[0] : null;
                return (
                  <Grid item xs={6} sm={6} md={3} key={index}>
                    <Product component={Link} to={`/p/${item.id}/${item.name}`}>
                      <img src={baseUrl + lowestIndexImage.path} alt={item.name} style={{ objectFit: 'cover' }} />
                      <ProductInfo className="ProductInfo">
                        <Typography
                          variant="subtitle1"
                          sx={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'rgba(200, 200, 200, 0.9) !important' }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '0.87rem', color: 'rgba(200, 200, 200, 0.9) !important' }}>
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
      </Box>

      <FooterMobile />

      <Box
        sx={{
          position: 'fixed',
          bottom: 57,
          left: 0,
          right: 0,
          zIndex: 100,
          bgcolor: 'background.paper'
        }}
      >
        <Grid container borderTop={1} borderColor="#e6e6e6" display="flex" justifyContent="center">
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
              key={category.name}
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
      </Box>
    </>
  );
};

export default CategoryMobile;
