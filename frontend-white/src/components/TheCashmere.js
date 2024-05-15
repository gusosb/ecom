import { useWindowSize, useCountryCurrency } from '../helpers'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const TheCashmere = () => {

    const windowSize = useWindowSize();

    const { selectedCurrency } = useCountryCurrency();

    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <Box sx={{ maxWidth: 1000, my: windowSize.width > 800 ? 7 : 2, mx: 5 }}>


                    <Typography variant='body2' fontSize={20} fontWeight='bold'>The Cashmere</Typography>
                    <br />
                    <Typography variant='body1'>
                        In the rugged terrain of the Mongolian steppes, a remarkable breed of goat thrives, known for its unique coat that yields the coveted cashmere fiber. These goats (Capra hircus), possess a fine, downy undercoat that insulates them from the harsh winters of the region.
                    </Typography>
                    <br />

                    <Typography variant='body1'>
                        The journey of cashmere begins during the spring months when skilled herders carefully shear or comb the goats to collect the soft, fine cashmere fiber. This annual ritual is not just a process of extraction; it's a reflection of the deep bond between the nomadic herders and their livestock, a testament to centuries of traditional husbandry practices.
                    </Typography>
                    <br />

                    <Typography variant='body1'>
                        Mongolian cashmere is renowned for its exceptional quality, attributed to the harsh winters that prompt the goats to develop a tighter, finer fleece. With nearly 30 million goats grazing on the Mongolian steppes alongside millions of sheep, cattle, horses, and camels, the landscape is a testament to the symbiotic relationship between humans and animals, where the well-being of the goats is paramount.
                    </Typography>
                    <br />

                    <Typography variant='body1'>
                        The collected cashmere fiber undergoes a meticulous process of sorting, cleaning, and spinning to transform it into the luxurious yarn that is the hallmark of GUSTAF LUND garments. This yarn is then expertly woven or knitted into a range of premium products, bearing the unmistakable mark of quality and craftsmanship.
                    </Typography>
                    <br />

                    <Typography variant='body1'>
                        From the remote pastures of Mongolia to your wardrobe, the journey of cashmere is a story of tradition, sustainability, and unparalleled craftsmanship, woven into every garment that bears the GUSTAF LUND name.
                    </Typography>
                </Box>
            </div>

        </>
    );
};

export default TheCashmere;