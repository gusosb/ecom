import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const FrontPage = ({ Helmet }) => {
  return (
    <>
      <Helmet>
        <title>GUSTAF LUND | Premium Cashmere Men's Clothing</title>
        <meta
          name="description"
          content="Explore GUSTAF LUND's premium cashmere men's clothing collection. Our high-quality, sophisticated, and timeless garments are crafted with meticulous attention to detail, using luxurious materials such as cashmere wool."
        />
        <link rel="canonical" href="https://www.gustaflund.com" />
      </Helmet>
    </>
  );
};

export default FrontPage;
