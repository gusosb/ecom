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
                <Typography variant="body1" gutterBottom>You are free to return your order within 30 days, providing the garments are unused, contact us by email at <a href='mailto:info@gustaflund.com'>info@gustaflund.se</a> for help with returning your order. When you return an order we charge a shipping fee of {selectedCurrency === 'SEK' ? 100 : 10} {selectedCurrency}.</Typography>
            </Box>
        </>
    );
}

export default Returns;