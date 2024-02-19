import { useState } from "react"
import { CustomAccordion } from '../../helpers'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';

const FAQ = () => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Box paddingTop={4} display='flex' justifyContent='center'>
                <Typography variant="h5" gutterBottom>FAQ</Typography>
            </Box>

            <Box mx={2}>
                <CustomAccordion
                    last={true}
                    title="QUESTION"
                    expanded={expanded === 'QUESTION'}
                    handleChange={() => handleAccordionChange('QUESTION')}
                >
                    <Typography>Question...</Typography>
                </CustomAccordion>
            </Box>
        </>
    )
}

export default FAQ