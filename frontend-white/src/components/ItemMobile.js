import { useState, useRef, useEffect } from "react";
import Markdown from 'react-markdown';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DetailsButton, CustomAccordion, VariantSelector, convertTaxRate } from '../helpers';
import '../styles.css';

// const backgroundColor = 'rgb(238, 238, 238)';
const backgroundColor = '#FEFCF9';


const ItemMobile = ({ variant, selectedItem, setVariant, format, addToCart, expanded, handleAccordionChange, baseUrl, selectedCurrency }) => {

  const [sticky, setSticky] = useState(true);
  const [toggleDetails, setToggleDetails] = useState(false);
  const [showVariants, setShowVariants] = useState(false);

  const ref = useRef(undefined);
  const ref2 = useRef(undefined);
  const boxRef = useRef(null);


  const handleScroll = () => {
    const acceptedHeihts = [0, 49];
    const y = window.innerHeight + window.pageYOffset - (acceptedHeihts.includes(boxRef.current.offsetHeight) ? 57 : -70);
    const ofstop = ref.current && ref.current.offsetTop + ref.current.offsetHeight + ref2.current.offsetHeight;
    setSticky(y < ofstop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} ref={ref}>

          {selectedItem?.images?.map((image, index) => {
            if (index === 0) return (
              <>
                <img src={baseUrl + image.path} alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} preload />
                <Box component={Typography} variant="h5" paddingTop={0} sx={{ textTransform: 'uppercase' }} display='flex' justifyContent='center' backgroundColor={backgroundColor}>
                  {selectedItem.name}
                </Box>

                <Box component={Typography} paddingTop={2} variant="subtitle1" display='flex' justifyContent='center' backgroundColor={backgroundColor}
                  alignItems="center" textAlign="center"
                  sx={{ fontSize: '1.1rem' }}
                >
                  <Box mx={5} mb={4}>
                    <Markdown
                      components={{
                        p: ({ node, ...props }) => <Typography fontSize={20} variant="body1" gutterBottom {...props} />,
                        h1: ({ node, ...props }) => <Typography variant="body2" gutterBottom {...props} />,
                      }}
                    >
                      {selectedItem.description}
                    </Markdown>
                  </Box>
                </Box>
              </>
            )
            return <img src={baseUrl + image.path} alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} preload />
          })}

        </Grid>

        <Grid container borderTop={1} borderColor='#e6e6e6' ref={ref2} sx={{ backgroundColor: 'background.paper' }} className={sticky ? 'stickyy' : undefined}>

          <Box width='100%' ref={boxRef}>
            {toggleDetails &&
              <>
                {/* <CustomAccordion
                  title="DESCRIPTION"
                  expanded={expanded === 'DESCRIPTION'}
                  handleChange={() => handleAccordionChange('DESCRIPTION')}
                >
                  <Typography>Some description here...</Typography>
                </CustomAccordion>

                <CustomAccordion
                  last={true}
                  title="SIZE & FIT"
                  expanded={expanded === 'SIZE & FIT'}
                  handleChange={() => handleAccordionChange('SIZE & FIT')}
                >
                  <Typography>Size & fitting ...</Typography>
                </CustomAccordion> */}
                <CustomAccordion
                  last={true}
                  title="BESKRIVNING"
                  expanded={expanded === 'BESKRIVNING'}
                  handleChange={() => handleAccordionChange('BESKRIVNING')}
                >
                  <Typography>{selectedItem.specification}</Typography>
                </CustomAccordion>
              </>
            }

            {selectedItem.variants?.length > 1 && !toggleDetails &&
              <VariantSelector
                disableTopBorder={true}
                showVariants={showVariants}
                setShowVariants={setShowVariants}
                variant={variant}
                setVariant={setVariant}
                variants={selectedItem.variants}
              />
            }
          </Box>


          <Grid container spacing={2}>
            <Grid item xs={4} margin={2} marginRight={0}>
              <DetailsButton sx={{ padding: '6px' }} variant="outlined" fullWidth onClick={() => setToggleDetails(!toggleDetails)}>
                {toggleDetails ? 'CLOSE' : 'DETAILS'}
              </DetailsButton>
            </Grid>
            <Grid item xs margin={2} marginLeft={0}>

              <Button
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Slightly lighter black on hover
                  },
                  padding: '8px',
                  borderRadius: '1',
                }}
                variant="contained"
                fullWidth
                onClick={addToCart}
              >
                BUY – {selectedCurrency === 'SEK' ? format(selectedItem.price * (1 + convertTaxRate(selectedItem.vatRateSE)) / 100) : format(selectedItem.price_eur / 100)} {selectedCurrency}
              </Button>
            </Grid>
          </Grid>
        </Grid>


      </Grid>
    </>
  );
}

export default ItemMobile;