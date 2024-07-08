import { useState } from 'react';
import { CustomAccordion } from '../../helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCountryCurrency } from '../../helpers';

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const { selectedCurrency } = useCountryCurrency();

  const questions = [
    {
      title: 'WHAT IS YOUR RETURN POLICY?',
      description: `If your garment is unsatisfactory in any way you are free to return it within 14 days, providing the garment is unused, in the original packaging and with all hang tags still attached. We reserve the right to refuse a return if the product shows signs of wear or has been altered from its original condition in any way. In this instance, you may choose to have the item(s) sent back to you at your own expense. Use the enclosed return label to return your order, when you return an entire order we charge a shipping fee of ${
        selectedCurrency === 'SEK' ? 100 : 10
      } ${selectedCurrency}.`
    },
    {
      title: 'DOES GUSTAF LUND SHIP TO MY LOCATION?',
      description:
        'We offer shipping to most of the European Union, if you cannot select your country in the checkout, we currently do not offer shipping there.'
    },
    {
      title: 'CAN I MAKE CHANGES TO AN ORDER THAT HAS ALREADY BEEN PLACED?',
      description:
        'If your order has been shipped already we cannot make any changes to it, please contact us if there is any issue with your order, we normally reply within 24 hours at customerservice@gustaflund.com.'
    },
    {
      title: 'HOW CAN I TRACK MY ORDER?',
      description:
        'When your order is shipped you will receive a confirmation that contains a tracking number and a link that allows you to track your order on the carriers website.'
    },
    {
      title: 'DO I HAVE TO PAY IMPORT DUTIES OR VAT ON MY ORDER?',
      description: `No, within the European Union you don't need to pay any import duties, and all of the prices on our website include your local VAT.`
    },
    {
      title: 'I DID NOT RECEIVE A CONFIRMATION EMAIL',
      description: `If you did not receive a confirmation email please check your spam folder. If you are still unable to find the confirmation email and your payment was cleared, please contact us at customerservice@gustaflund.com.`
    }
  ];

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Box paddingTop={4} display="flex" justifyContent="center">
        <Typography variant="h5" gutterBottom>
          FAQ
        </Typography>
      </Box>

      <Box mx={2}>
        {questions.map((question, i) => (
          <CustomAccordion
            key={question.title}
            // last={i === questions.length - 1}
            title={question.title}
            expanded={expanded === question.title}
            handleChange={() => handleAccordionChange(question.title)}
          >
            <Typography>{question.description}</Typography>
          </CustomAccordion>
        ))}
      </Box>
    </>
  );
};

export default FAQ;
