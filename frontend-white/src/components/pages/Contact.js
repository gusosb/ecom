import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { useOutletContext } from "react-router-dom";

const Contact = () => {

    const [windowSize] = useOutletContext();

    return (
        <>
            <Box paddingTop={4} display='flex' justifyContent='center'>
                <Typography variant="h5" gutterBottom>CONTACT US</Typography>
            </Box>

            <Box mx={windowSize > 800 ? 20 : 5} mt={4}>

                <Typography variant="body1" gutterBottom>Get in touch with us at email@email.com</Typography>

            </Box>
        </>
    );
}

export default Contact;