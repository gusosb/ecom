import { useState } from "react"
import { CustomAccordion } from '../../helpers'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';


const questions = [
    { title: 'WHAT IS YOUR RETURN POLICY?', description: 'If your garment is unsatisfactory in any way you are free to return it within 30 days, providing the garment is unused. Contact us at info@gustaflund.com to return your order.' }
]

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
                {questions.map(question =>
                    <CustomAccordion
                        last={true}
                        title={question.title}
                        expanded={expanded === question.title}
                        handleChange={() => handleAccordionChange(question.title)}
                    >
                        <Typography>{question.description}</Typography>
                    </CustomAccordion>
                )}
            </Box>
        </>
    )
}

export default FAQ