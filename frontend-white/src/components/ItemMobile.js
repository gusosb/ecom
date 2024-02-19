import { useState, useRef, useEffect } from "react"
import Markdown from 'react-markdown'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { DetailsButton, CustomAccordion, VariantSelector } from '../helpers'
import '../styles.css'


const backgroundColor = 'rgb(238, 238, 238)';


const ItemMobile = ({ variant, selectedItem, setVariant, format, addToCart, expanded, handleAccordionChange }) => {

  const [sticky, setSticky] = useState(true);
  const [toggleDetails, setToggleDetails] = useState(false);
  const [showVariants, setShowVariants] = useState(false);

  const ref = useRef(undefined);
  const ref2 = useRef(undefined);
  const boxRef = useRef(null);


  const handleScroll = () => {
    console.log(boxRef.current.offsetHeight);
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
          <img src="https://cdn.obayaty.com/images/vid8gs32/production/194bd93cc43196a619ddb524c45497b93e71cbda-2560x3200.jpg?w=1920&fit=max&auto=format" alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} />

          <Box component={Typography} variant="h5" paddingTop={4} sx={{ textTransform: 'uppercase' }} display='flex' justifyContent='center' backgroundColor={backgroundColor}>
            {selectedItem.name}
          </Box>

          <Box component={Typography} paddingTop={2} variant="subtitle1" display='flex' justifyContent='center' backgroundColor={backgroundColor}
            alignItems="center" textAlign="center"
            sx={{ fontSize: '1.1rem' }}
          >
            <Box mx={5}>
              {selectedItem.description}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </Box>
          </Box>

          <img src="https://cdn.obayaty.com/images/vid8gs32/production/ba000ab42fc5d3ce6595ed00b4b847355e80270a-2560x3200.jpg?w=1920&fit=max&auto=format" alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} />

          <img src="https://cdn.obayaty.com/images/vid8gs32/production/63584b29f138662363584009b9193018d263e01b-2560x3200.jpg?w=1920&fit=max&auto=format" alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </Grid>

        <Grid container borderTop={1} borderColor='#e6e6e6' ref={ref2} sx={{ backgroundColor: 'background.paper' }} className={sticky ? 'stickyy' : undefined}>

          <Box width='100%' ref={boxRef}>
            {toggleDetails &&
              <>
                <CustomAccordion
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
                </CustomAccordion>
              </>
            }

            {selectedItem.variants.length > 1 && !toggleDetails &&
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
                Buy – {format(selectedItem.price * (1 + (selectedItem.vatRateSE / 100)) / 100)} SEK
              </Button>
            </Grid>
          </Grid>
        </Grid>


      </Grid>
    </>
  );
}

export default ItemMobile;