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

                <Typography variant="body1" gutterBottom>We are happy to answer any questions you might have, please contact us by email, <a href="mailto:info@gustaflund.se">info@gustaflund.se</a></Typography>

            </Box>
        </>
    );
}

export default Contact;