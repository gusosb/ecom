import { Link, useOutletContext } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { convertTaxRate } from '../helpers';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FooterMobile from './FooterMobile';

const CategoryMobile = ({ categories, StyledButton, Product, ProductInfo, Typography, selectedCategory, items, baseUrl, format, isShopRoute }) => {

    const [, footerHeight] = useOutletContext();

    return (
        <>
            <Box sx={{ minHeight: `calc(100vh - ${229}px)` }}>
                <Grid container>
                    {items.map((item, index) => (
                        <Grid item xs={6} sm={6} md={3} key={index}>
                            <Product component={Link} to={`/product/${item.id}/${item.name}`}>
                                <img src={baseUrl + item.images[0]?.path} alt={item.name} style={{ objectFit: 'cover' }} />
                                <ProductInfo className="ProductInfo">
                                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>{item.name}</Typography>
                                    <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{format(item.price * (1 + convertTaxRate(item.vatRateSE)) / 100)} SEK</Typography>
                                </ProductInfo>
                            </Product>
                        </Grid>
                    ))}

                </Grid>
            </Box>

            <Box paddingBottom='37px'>
                <FooterMobile />
            </Box>
            <Box sx={{
                position: 'fixed', // Fix position to the viewport
                bottom: 57, // Align to the bottom
                left: 0, // Align to the left
                right: 0, // Align to the right
                zIndex: 1099, // Ensure it's above other content
                bgcolor: 'background.paper'
            }}>

                <Grid container borderTop={1} borderColor='#e6e6e6' display='flex' justifyContent='center'>
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
                        <StyledButton key={category.name} component={Link} to={`/shop/${category.name.toLowerCase()}`}
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
            </Box>
        </>
    )
}

export default CategoryMobile;