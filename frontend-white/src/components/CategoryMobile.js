import { Link, useOutletContext } from "react-router-dom"
import ReactMarkdown from 'react-markdown'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import FooterMobile from "./FooterMobile"

const CategoryMobile = ({ categories, StyledButton, Product, ProductInfo, Typography, selectedCategory, items, baseUrl, format }) => {

    const [, footerHeight] = useOutletContext();
    console.log('footerHeight', footerHeight);


    return (
        <>
            <Box sx={{ minHeight: `calc(100vh - ${229}px)` }}>
                <Grid container>
                    {items.map((item, index) => (
                        <Grid item xs={6} sm={6} md={3} key={index}>
                            <Product component={Link} to={`/product/${item.id}/${item.name}`}>
                                <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' alt={item.name} />
                                <ProductInfo className="ProductInfo">
                                    <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>{item.name}</Typography>
                                    <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{format(item.price * (1 + (item.vatRateSE / 100)) / 100)} SEK</Typography>
                                </ProductInfo>
                            </Product>
                        </Grid>
                    ))}

                    {/* <Grid item xs={6} sm={6} md={3}>
                        <Product component={Link} >
                            <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' />
                            <ProductInfo className="ProductInfo">
                                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>name</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{100} SEK</Typography>
                            </ProductInfo>
                        </Product>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Product component={Link} >
                            <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' />
                            <ProductInfo className="ProductInfo">
                                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>name</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{100} SEK</Typography>
                            </ProductInfo>
                        </Product>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Product component={Link} >
                            <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' />
                            <ProductInfo className="ProductInfo">
                                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>name</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{100} SEK</Typography>
                            </ProductInfo>
                        </Product>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Product component={Link} >
                            <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' />
                            <ProductInfo className="ProductInfo">
                                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>name</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{100} SEK</Typography>
                            </ProductInfo>
                        </Product>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Product component={Link} >
                            <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' />
                            <ProductInfo className="ProductInfo">
                                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>name</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{100} SEK</Typography>
                            </ProductInfo>
                        </Product>
                    </Grid> */}
                    {/* <Grid item xs={6} sm={6} md={3}>
                        <Product component={Link} >
                            <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' />
                            <ProductInfo className="ProductInfo">
                                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>name</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{100} SEK</Typography>
                            </ProductInfo>
                        </Product>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Product component={Link} >
                            <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' />
                            <ProductInfo className="ProductInfo">
                                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>name</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{100} SEK</Typography>
                            </ProductInfo>
                        </Product>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Product component={Link} >
                            <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' />
                            <ProductInfo className="ProductInfo">
                                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>name</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{100} SEK</Typography>
                            </ProductInfo>
                        </Product>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Product component={Link} >
                            <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' />
                            <ProductInfo className="ProductInfo">
                                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>name</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{100} SEK</Typography>
                            </ProductInfo>
                        </Product>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Product component={Link} >
                            <img src='https://cdn.obayaty.com/images/vid8gs32/production/86551ad9f40d15aec2bc6d8a64ad88756f9d7e22-2560x3200.jpg?w=1920&fit=max&auto=format' />
                            <ProductInfo className="ProductInfo">
                                <Typography variant="subtitle1" sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>name</Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{100} SEK</Typography>
                            </ProductInfo>
                        </Product>
                    </Grid> */}


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
            </Box>
        </>
    )
}

export default CategoryMobile;