import { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DetailsButton, CustomAccordion, VariantSelector, convertTaxRate } from '../helpers';
import '../styles.css';
import remarkGfm from 'remark-gfm';

// const backgroundColor = 'rgb(238, 238, 238)';
//const backgroundColor = '#FEFCF9';
const backgroundColor = '#FFFFFF';

const ItemMobile = ({
  variant,
  selectedItem,
  setVariant,
  format,
  addToCart,
  expanded,
  handleAccordionChange,
  baseUrl,
  selectedCurrency,
  openNotification,
  setOpenNotification,
  Modal,
  IconButton,
  TextField,
  CloseIcon,
  notificationSent,
  notificationEmail,
  errorMessage,
  setNotificationEmail,
  handleSendNotify
}) => {
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
    };
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} ref={ref}>
          {selectedItem?.images
            ?.slice()
            .sort((a, b) => a.index - b.index)
            .map((image, index) => {
              if (index === 0)
                return (
                  <>
                    <img src={baseUrl + image.path} alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} preload />
                    <Box
                      component={Typography}
                      variant="h5"
                      paddingTop={2}
                      sx={{ textTransform: 'uppercase' }}
                      display="flex"
                      justifyContent="center"
                      backgroundColor={backgroundColor}
                    >
                      {selectedItem.name}
                    </Box>

                    <Box
                      component={Typography}
                      paddingTop={2}
                      variant="subtitle1"
                      display="flex"
                      justifyContent="center"
                      backgroundColor={backgroundColor}
                      alignItems="center"
                      textAlign="center"
                      sx={{ fontSize: '1.1rem' }}
                    >
                      <Box mx={5} mb={4}>
                        <Markdown
                          components={{
                            p: ({ node, ...props }) => <Typography fontSize={20} variant="body1" gutterBottom {...props} />,
                            h1: ({ node, ...props }) => <Typography variant="body2" gutterBottom {...props} />
                          }}
                        >
                          {selectedItem.description}
                        </Markdown>
                      </Box>
                    </Box>
                  </>
                );
              return <img src={baseUrl + image.path} alt="Product" style={{ width: '100%', height: 'auto', display: 'block' }} preload />;
            })}
        </Grid>

        <Grid
          container
          borderTop={1}
          borderColor="#e6e6e6"
          ref={ref2}
          sx={{ backgroundColor: 'background.paper' }}
          className={sticky ? 'stickyy' : undefined}
        >
          <Box width="100%" ref={boxRef}>
            {toggleDetails && (
              <>
                <CustomAccordion title="DETAILS" expanded={expanded === 'DETAILS'} handleChange={() => handleAccordionChange('DETAILS')}>
                  <Markdown
                    components={{
                      p: ({ node, ...props }) => <Typography fontSize={15} variant="body1" gutterBottom {...props} />,
                      h1: ({ node, ...props }) => <Typography variant="body2" gutterBottom {...props} />,
                      ul: ({ node, ...props }) => <ul style={{ marginTop: '0px', marginBottom: '0px', paddingLeft: '20px' }} {...props} />,
                      li: ({ node, ...props }) => <li style={{ marginTop: '0px', marginBottom: '0px' }} {...props} />
                    }}
                  >
                    {selectedItem.details}
                  </Markdown>
                </CustomAccordion>

                <CustomAccordion title="SIZE & FIT" expanded={expanded === 'SIZE & FIT'} handleChange={() => handleAccordionChange('SIZE & FIT')}>
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ node, ...props }) => <Typography fontSize={15} variant="body1" gutterBottom {...props} />,
                      h1: ({ node, ...props }) => <Typography variant="body2" gutterBottom {...props} />,
                      table: ({ node, ...props }) => <table style={{ width: '100%', borderCollapse: 'collapse' }} {...props} />,
                      th: ({ node, ...props }) => (
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }} {...props} />
                      ),
                      td: ({ node, ...props }) => <td style={{ border: '1px solid #ddd', padding: '8px' }} {...props} />,
                      ul: ({ node, ...props }) => <ul style={{ marginTop: '0px', marginBottom: '0px', paddingLeft: '20px' }} {...props} />,
                      li: ({ node, ...props }) => <li style={{ marginTop: '0px', marginBottom: '0px' }} {...props} />
                    }}
                  >
                    {selectedItem.sizefit}
                  </Markdown>
                </CustomAccordion>

                <CustomAccordion last={true} title="CARE" expanded={expanded === 'CARE'} handleChange={() => handleAccordionChange('CARE')}>
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ node, ...props }) => <Typography fontSize={15} variant="body1" gutterBottom {...props} />,
                      h1: ({ node, ...props }) => <Typography variant="body2" gutterBottom {...props} />
                    }}
                  >
                    {selectedItem.care}
                  </Markdown>
                </CustomAccordion>
              </>
            )}

            {selectedItem.variants?.length > 1 && !toggleDetails && (
              <VariantSelector
                disableTopBorder={true}
                showVariants={showVariants}
                setShowVariants={setShowVariants}
                variant={variant}
                setVariant={setVariant}
                variants={selectedItem.variants}
              />
            )}
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
                    backgroundColor: 'rgba(0, 0, 0, 0.8)' // Slightly lighter black on hover
                  },
                  padding: '8px',
                  borderRadius: '1'
                }}
                variant="contained"
                fullWidth
                onClick={selectedItem?.variants?.find((e) => e.id === variant)?.sellable > 0 ? addToCart : () => setOpenNotification(true)}
              >
                {selectedItem?.variants?.find((e) => e.id === variant)?.sellable > 0 ? 'BUY' : 'Notify  me'} –{' '}
                {selectedCurrency === 'SEK'
                  ? format((selectedItem.price_sek * (1 + convertTaxRate(selectedItem.vatRateSE))) / 100)
                  : format(selectedItem.price_eur / 100)}{' '}
                {selectedCurrency}
              </Button>

              <Modal open={openNotification} onClose={() => setOpenNotification(false)} keepMounted>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center', // Center the content horizontally
                    width: '80%', // Set the width of the content
                    maxWidth: 400, // Limit the maximum width of the content
                    borderRadius: '6px' // Add border radius for a rounded appearance
                  }}
                >
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      color: 'text.secondary'
                    }}
                    onClick={() => setOpenNotification(false)}
                  >
                    <CloseIcon />
                  </IconButton>

                  <TextField
                    disabled={notificationSent && true}
                    value={notificationEmail}
                    type="email"
                    onChange={({ target }) => setNotificationEmail(target.value)}
                    id="Notification-email"
                    label="EMAIL"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errorMessage}
                    helperText={errorMessage}
                  />

                  <Button
                    sx={{
                      mt: 2,
                      backgroundColor: notificationSent ? 'green' : '#000',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: notificationSent ? 'darkgreen' : 'rgba(0, 0, 0, 0.8)'
                      },
                      padding: '12px',
                      borderRadius: '1'
                    }}
                    fullWidth
                    onClick={notificationSent ? null : () => handleSendNotify()}
                  >
                    {notificationSent ? 'We will notify you!' : 'Notify me'}
                  </Button>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemMobile;
