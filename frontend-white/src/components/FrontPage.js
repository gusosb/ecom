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
    <>
      friontpage!

    </>
  );
};

export default FrontPage;