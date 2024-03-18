import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles'
import { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';

export const useWindowSize = () => {
   const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
   });
   useEffect(() => {
      // Handler to call on window resize
      const handleResize = () => {
         // Set window width/height to state
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      };
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
   }, []); // Empty array ensures that effect is only run on mount
   return windowSize;
};

export const StyledButton = styled(Button)({
   color: '#000',
   fontWeight: 'normal',
   fontSize: '1.0rem',
   '&:hover': {
      background: 'none',
      boxShadow: 'none',
      color: 'rgba(0, 0, 0, 0.35)',
      textDecoration: 'none',
   },
});


export const CustomButton = styled(Button)({
   background: 'none',
   border: 'none',
   boxShadow: 'none',
   color: 'rgba(0, 0, 0, 0.87)',
   fontWeight: 'normal',
   padding: 0,
   '&:hover': {
      background: 'none',
      boxShadow: 'none',
      color: 'rgba(0, 0, 0, 0.35)',
      textDecoration: 'none',
   },
   justifyContent: 'flex-start'
});

export const DetailsButton = styled(Button)({
   color: 'black',
   border: '1px solid #e6e6e6',
   padding: '8px 16px',
   textTransform: 'none',
   fontSize: '1rem',
   borderRadius: '1px',
   boxShadow: 'none',
   '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
   },
});

export const CustomAccordion = ({ title, children, expanded, handleChange, first, last }) => {
   return (
      <Accordion
         expanded={expanded}
         onChange={handleChange(title)}
         sx={{
            '&:not(:first-of-type)': {
               borderTop: '1px solid #e6e6e6',
            },
            ...(first && {
               '&:first-of-type': {
                  borderRadius: 0,
                  borderTop: '1px solid #e6e6e6',
               }
            }),
            boxShadow: 'none',
            '&:before': {
               display: 'none',
            },
            '&:not(:last-child)': {
               borderBottom: 0,
            },
            '&.Mui-expanded': {
               margin: '0 !important',
            },
            backgroundColor: 'transparent',
         }}
      >
         <AccordionSummary
            expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
               minHeight: 56, // Ensure a consistent height for the summary
               ...(last && {
                  borderBottom: '1px solid #e6e6e6',
               }),
               '&.Mui-expanded': {
                  minHeight: 56,
               },
               '& .MuiAccordionSummary-content': {
                  margin: '0 !important', // Remove vertical margins to prevent height change
                  '&.Mui-expanded': {
                     margin: '0 !important',
                  },
               },
            }}
         >
            <Typography component="div" sx={{ width: '100%', flexShrink: 0 }}>
               {title}
            </Typography>
         </AccordionSummary>
         <AccordionDetails sx={{
            display: 'flex',
            flexDirection: 'column',
            ...(last && {
               borderBottom: '1px solid #e6e6e6',
            }),
            '&.Mui-expanded': {
               paddingTop: '0 !important',
               paddingBottom: '0 !important',
            },
         }}>
            <Typography component="div" variant="body2" marginTop={2} marginBottom={1}>
               {children}
            </Typography>
         </AccordionDetails>
      </Accordion>
   );
};


export const VariantSelector = ({ variant, setVariant, variants, showVariants, setShowVariants, disableTopBorder }) => {

   const selectVariant = (variantId) => {
      setVariant(variantId);
      setShowVariants(false);
   };

   const rotateStyle = {
      transition: 'transform 0.25s',
      transform: showVariants ? 'rotate(180deg)' : 'rotate(0deg)',
   };

   return (
      <>
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
               padding: !disableTopBorder ? '16px' : '12px',
               paddingLeft: 0,
               borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
               borderTop: !disableTopBorder && '1px solid rgba(0, 0, 0, 0.12)',
               cursor: 'pointer',
            }}
            onClick={() => setShowVariants(!showVariants)}
         >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <Box
                  sx={{
                     width: '24px',
                     height: '24px',
                     marginRight: '8px',
                  }}
               />
               <Typography variant="body1" component="div">
                  {variants.find(v => v.id === variant).name}
               </Typography>
            </Box>
            <IconButton disableRipple sx={{ ...rotateStyle, padding: 0, margin: 0 }}>
               {showVariants ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
         </Box>
         {showVariants &&
            variants.map((v) => (
               <Box
                  key={v.id}
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     padding: !disableTopBorder ? '16px 0px' : '12px 0px',
                     borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                     '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                     },
                  }}
                  onClick={() => selectVariant(v.id)}
               >
                  <Box
                     sx={{
                        width: '24px',
                        height: '24px',
                        marginRight: '8px',
                     }}
                  />
                  <Typography variant="body1" component="div">{v.name}</Typography>
               </Box>
            ))}
      </>
   );
};

export const convertTaxRate = (taxRate) => {
   return taxRate / 100;
}