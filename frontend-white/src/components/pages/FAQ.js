import { useState } from "react"
import { CustomAccordion } from '../../helpers'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { useCountryCurrency } from '../../helpers';



const FAQ = () => {
    const [expanded, setExpanded] = useState(false);

    const { selectedCurrency } = useCountryCurrency();

    const questions = [
        { title: 'WHAT IS YOUR RETURN POLICY?', description: `If your garment is unsatisfactory in any way you are free to return it within 14 days, providing the garment is unused, in the original packaging and with all hang tags still attached. We reserve the right to refuse a return if the product shows signs of wear or has been altered from its original condition in any way. In this instance, you may choose to have the item(s) sent back to you at your own expense. Use the enclosed return label to return your order, when you return an entire order we charge a shipping fee of ${selectedCurrency === 'SEK' ? 100 : 10} ${selectedCurrency}.` }
    ];


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
    );
};

export default FAQ;