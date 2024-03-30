import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { useOutletContext } from "react-router-dom";

const Contact = () => {

    const [windowSize] = useOutletContext();

    return (
        <>
            <Box paddingTop={4} display='flex' justifyContent='center'>
                <Typography variant="h5" gutterBottom>KONTAKTA OSS</Typography>
            </Box>

            <Box mx={windowSize > 800 ? 20 : 5} mt={4}>

                <Typography variant="body1" gutterBottom>Kontakta oss via epost, <a href="mailto:info@surdegshornan.se">info@surdegshornan.se</a></Typography>

            </Box>
        </>
    );
}

export default Contact;