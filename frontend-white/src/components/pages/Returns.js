import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { useOutletContext } from "react-router-dom";
import { useCountryCurrency } from '../../helpers';

const Returns = () => {

    const [windowSize] = useOutletContext();

    const { selectedCurrency } = useCountryCurrency();

    return (
        <>
            <Box paddingTop={4} display='flex' justifyContent='center'>
                <Typography variant="h5" gutterBottom>RETURNS</Typography>
            </Box>

            <Box mx={windowSize > 800 ? 20 : 5} mt={4}>
                <Typography variant="body1" gutterBottom>You are free to return your order within 14 days, providing the garments are unused, in the original packaging with all hang tags still attached. We reserve the right to refuse a return if the product shows signs of wear or has been altered from its original condition in any way. In this instance, you may choose to have the item(s) sent back to you at your own expense. Use the enclosed return label to return your order. When you return an entire order we charge a shipping fee of {selectedCurrency === 'SEK' ? 100 : 10} {selectedCurrency}.</Typography>
            </Box>
        </>
    );
}

export default Returns;