import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { useOutletContext } from "react-router-dom";

const Returns = () => {

    const [windowSize] = useOutletContext();


    return (
        <>
            <Box paddingTop={4} display='flex' justifyContent='center'>
                <Typography variant="h5" gutterBottom>RETURNS</Typography>
            </Box>

            <Box mx={windowSize > 800 ? 20 : 5} mt={4}>

                <Typography variant="body1" gutterBottom>If you want to return ...</Typography>

            </Box>
        </>
    );
}

export default Returns;