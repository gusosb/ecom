import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material';


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


import StretchImage from '../images/IMG_0864.jpg'
import FoldImage from '../images/IMG_0874.jpg'
import CoilFoldImage from '../images/IMG_0904.jpg'
import ScoringImage from '../images/IMG_0919.jpg'
import Bread1Image from '../images/IMG_0924.jpg'


const images = [
  { id: 1, src: ScoringImage, alt: 'Stretch', cols: 2, rows: 2 },
  { id: 2, src: StretchImage, alt: 'Fold', cols: 1, rows: 1 },
  { id: 3, src: FoldImage, alt: 'Coil Fold', cols: 1, rows: 1 },
  { id: 4, src: CoilFoldImage, alt: 'Scoring', cols: 1, rows: 2 },
  { id: 5, src: Bread1Image, alt: 'Bread 1', cols: 1, rows: 1 }
];

const FrontPage = () => {

  return (
    <ImageList variant="quilted" cols={3} sx={{ marginTop: 0 }}>
      {images.map((image) => (
        <ImageListItem key={image.id} cols={image.cols} rows={image.rows}>
          <img
            src={`${image.src}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={image.alt}
            loading="lazy"
            style={{
              borderRadius: '4px',
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default FrontPage;