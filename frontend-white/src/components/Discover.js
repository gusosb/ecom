import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';

import StretchImage from '../images/IMG_0864.jpg'
import FoldImage from '../images/IMG_0874.jpg'
import CoilFoldImage from '../images/IMG_0904.jpg'
import ScoringImage from '../images/IMG_0919.jpg'
import Bread1Image from '../images/IMG_0924.jpg'

const images = [
    { id: 1, src: ScoringImage, alt: 'Stretch', title: 'Surdegsgrunden', description: 'Sätt din surdegsgrund natten innan eller på morgonen, den behöver jäsa i ungefär 8 timmar för att du ska kunna baka med den. Blanda två teskedar surdegsgrund med 100g vatten, 50g vetemjöl och 50g fullkornsmjöl (t.ex. grahamsmjöl).' },
    { id: 2, src: StretchImage, alt: 'Fold', title: 'Degen', description: 'Efter 8h blanda din bubbliga surdegsgrund med 260g vatten, använd en degvisp eller händerna för att lösa upp surdegen i vattnet. Blanda i mjölet och rör ihop till en degklump, överarbeta inte degen, låt vila ca 40min.' },
    { id: 3, src: FoldImage, alt: 'Coil Fold', title: 'Saltet', description: 'Blanda 10g salt med resterande 20g vatten, häll i det i din deg och krama in saltvattenblandningen i degen.' },
    { id: 4, src: CoilFoldImage, alt: 'Scoring', title: 'Huvudjäsningen', description: `Låt degen jäsa i en temperatur på mellan 24° – 27°, i cirka 3 – 4h. Du kan värma din ugn på 50° i 30 sekunder och jäsa degen där. Under de första 2 timmarna, gör en sträck och vikning varje halvtimme.` },
    { id: 5, src: Bread1Image, alt: 'Form', title: 'Bänkvilan', description: 'När degen känns bullrig när du skakar på skålen och ser kullig ut är den redo att formas, häll ut den på ett bord och forma den försiktigt till en rund kula med en degskrapa och ena handen, ytan ska spännas men inte gå sönder, låt vila 20 – 30 min.' },
    { id: 5, src: Bread1Image, alt: 'Form', title: 'Formning', description: 'Mjöla ditt bakbord och överdelen av degen sparsamt, vänd den med din degskrapa och forma den enligt videon.' }
];

const Discover = () => {
    return (
        <Grid container spacing={1}>
            {images.map((image, index) => (
                <Grid
                    item
                    key={image.id}
                    xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' // alternate left and right alignment
                    }}
                >
                    <img
                        src={image.src}
                        alt={image.alt}
                        style={{ width: '60%', marginRight: '20px', marginLeft: index % 2 === 0 ? 0 : '20px' }} // Adjust image width and spacing as needed
                    />
                    <Box sx={{ marginLeft: index % 2 === 0 ? 0 : '20px' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {image.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {image.description}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default Discover;
