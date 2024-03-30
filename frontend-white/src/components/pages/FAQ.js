import { useState } from "react"
import { CustomAccordion } from '../../helpers'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';


const questions = [
    { title: 'KAN JAG ÅNGRA MIN ORDER?', description: 'Du har alltid rätt att ångra ditt köp inom 14 dagar enligt lagen om distansavtal, kontakta oss genom epost på info@surdegshornan.se för att få hjälp med att skicka tillbaka din order.' }
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