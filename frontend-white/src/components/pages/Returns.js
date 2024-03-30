import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { useOutletContext } from "react-router-dom";

const Returns = () => {

    const [windowSize] = useOutletContext();

    return (
        <>
            <Box paddingTop={4} display='flex' justifyContent='center'>
                <Typography variant="h5" gutterBottom>RETURER</Typography>
            </Box>

            <Box mx={windowSize > 800 ? 20 : 5} mt={4}>
                <Typography variant="body1" gutterBottom>Du har alltid rätt att ångra ditt köp inom 14 dagar enligt lagen om distansavtal, kontakta oss genom epost på <a href="mailto:info@surdegshornan.se">info@surdegshornan.se</a> för att få hjälp med att skicka tillbaka din order. Returfrakten står du själv för och detta förusätter även att varorna är oanvända.</Typography>
            </Box>
        </>
    );
}

export default Returns;