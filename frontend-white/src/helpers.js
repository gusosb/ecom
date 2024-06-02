import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState, useEffect, createContext, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Tooltip from '@mui/material/Tooltip';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
    textDecoration: 'none'
  }
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
    textDecoration: 'none'
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
    boxShadow: 'none'
  }
});

export const CustomAccordion = ({
  title,
  children,
  expanded,
  handleChange,
  first,
  last,
  mobile
}) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange(title)}
      sx={{
        '&:not(:first-of-type)': {
          borderTop: '1px solid #e6e6e6'
        },
        ...(first && {
          '&:first-of-type': {
            borderRadius: 0,
            borderTop: '1px solid #e6e6e6'
          }
        }),
        boxShadow: 'none',
        '&:before': {
          display: 'none'
        },
        '&:not(:last-child)': {
          borderBottom: 0
        },
        '&.Mui-expanded': {
          margin: '0 !important'
        },
        backgroundColor: 'transparent'
      }}
    >
      <AccordionSummary
        expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{
          minHeight: 56,
          ...(last && {
            borderBottom: '1px solid #e6e6e6'
          }),
          '&.Mui-expanded': {
            minHeight: 56
          },
          '& .MuiAccordionSummary-content': {
            margin: '0 !important',
            '&.Mui-expanded': {
              margin: '0 !important'
            }
          }
        }}
      >
        <Typography component="div" sx={{ width: '100%', flexShrink: 0 }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ...(last && {
            borderBottom: '1px solid #e6e6e6'
          }),
          '&.Mui-expanded': {
            paddingTop: '0 !important',
            paddingBottom: '0 !important'
          }
        }}
      >
        <Typography component="div" variant="body2" marginTop={2} marginBottom={1}>
          {children}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export const VariantSelector = ({
  variant,
  setVariant,
  variants,
  showVariants,
  setShowVariants,
  disableTopBorder
}) => {
  const selectVariant = (variantId) => {
    setVariant(variantId);
    setShowVariants(false);
  };

  const sizeOrder = { XS: 1, SMALL: 2, MEDIUM: 3, LARGE: 4, XL: 5 };
  variants.sort((a, b) => sizeOrder[a.name] - sizeOrder[b.name]);

  const rotateStyle = {
    transition: 'transform 0.25s',
    transform: showVariants ? 'rotate(180deg)' : 'rotate(0deg)'
  };
  const currentVariant = variants.find((v) => v.id === variant) || [];
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
          backgroundColor: currentVariant.sellable < 1 && 'rgba(0, 0, 0, 0.04)',
          borderTop: !disableTopBorder && '1px solid rgba(0, 0, 0, 0.12)',
          cursor: 'pointer'
        }}
        onClick={() => setShowVariants(!showVariants)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: '24px',
              height: '24px',
              marginRight: '8px'
            }}
          />
          <Typography variant="body1" component="div">
            {currentVariant.name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {currentVariant.sellable < 1 && (
            <Tooltip title="SOLD OUT">
              <Box
                sx={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'red',
                  marginRight: '8px'
                }}
              />
            </Tooltip>
          )}
          <IconButton disableRipple sx={{ ...rotateStyle, padding: 0, margin: 0 }}>
            {showVariants ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </Box>
      </Box>
      {showVariants &&
        variants.map((v) => (
          <Box
            key={v.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between', // Added this to space out the elements
              padding: !disableTopBorder ? '16px 0px' : '12px 0px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              backgroundColor: v.sellable < 1 && 'rgba(0, 0, 0, 0.04)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
            onClick={() => selectVariant(v.id)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '24px', height: '24px', marginRight: '8px' }} />
              <Typography variant="body1" component="div">
                {v?.name}
              </Typography>
            </Box>
            {v.sellable < 1 && (
              <Tooltip title="SOLD OUT">
                <Box
                  sx={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'red',
                    marginRight: '24px'
                  }}
                />
              </Tooltip>
            )}
          </Box>
        ))}
    </>
  );
};

export const convertTaxRate = (taxRate) => {
  return taxRate / 100;
};

export const vatRates = {
  AT: {
    country: 'Austria',
    vatRate: 2000 // => 20%
  },
  BE: {
    country: 'Belgium',
    vatRate: 2100
  },
  BG: {
    country: 'Bulgaria',
    vatRate: 2000
  },
  HR: {
    country: 'Croatia',
    vatRate: 2500
  },
  CY: {
    country: 'Cyprus',
    vatRate: 1900
  },
  CZ: {
    country: 'Czech Republic',
    vatRate: 2100
  },
  DK: {
    country: 'Denmark',
    vatRate: 2500
  },
  EE: {
    country: 'Estonia',
    vatRate: 2000
  },
  FI: {
    country: 'Finland',
    vatRate: 2400
  },
  FR: {
    country: 'France',
    vatRate: 2000
  },
  DE: {
    country: 'Germany',
    vatRate: 1900
  },
  GR: {
    country: 'Greece',
    vatRate: 2400
  },
  HU: {
    country: 'Hungary',
    vatRate: 2700
  },
  IE: {
    country: 'Ireland',
    vatRate: 2300
  },
  IT: {
    country: 'Italy',
    vatRate: 2200
  },
  LV: {
    country: 'Latvia',
    vatRate: 2100
  },
  LT: {
    country: 'Lithuania',
    vatRate: 2100
  },
  LU: {
    country: 'Luxembourg',
    vatRate: 1600
  },
  MT: {
    country: 'Malta',
    vatRate: 1800
  },
  NL: {
    country: 'Netherlands',
    vatRate: 2100
  },
  PL: {
    country: 'Poland',
    vatRate: 2300
  },
  PT: {
    country: 'Portugal',
    vatRate: 2300
  },
  RO: {
    country: 'Romania',
    vatRate: 1900
  },
  SK: {
    country: 'Slovakia',
    vatRate: 2000
  },
  SI: {
    country: 'Slovenia',
    vatRate: 2200
  },
  ES: {
    country: 'Spain',
    vatRate: 2100
  },
  CH: {
    country: 'Switzerland',
    vatRate: 770
  }
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const CountryCurrencyContext = createContext();

export const useCountryCurrency = () => useContext(CountryCurrencyContext);

export const CountryCurrencyProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState('SVERIGE');
  const [selectedCurrency, setSelectedCurrency] = useState('SEK');

  const isSwedishLocale = () => {
    const userLocale = navigator.language.toLowerCase();
    return userLocale.includes('sv');
  };

  useEffect(() => {
    if (isSwedishLocale()) {
      setSelectedCountry('SVERIGE');
      setSelectedCurrency('SEK');
    } else {
      setSelectedCountry('EUROPE');
      setSelectedCurrency('EUR');
    }
  }, []);

  const updateCountryCurrency = (country, currency) => {
    setSelectedCountry(country);
    setSelectedCurrency(currency);
  };

  return (
    <CountryCurrencyContext.Provider
      value={{ selectedCountry, selectedCurrency, updateCountryCurrency }}
    >
      {children}
    </CountryCurrencyContext.Provider>
  );
};

export const CountryCurrencyModal = () => {
  const { selectedCountry, selectedCurrency, updateCountryCurrency } = useCountryCurrency();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const windowSize = useWindowSize();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (country, currency) => {
    updateCountryCurrency(country, currency);
    handleClose();
  };

  return (
    <>
      <CustomButton onClick={handleOpen}>
        {selectedCountry} / {selectedCurrency}
      </CustomButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: windowSize.width > 800 ? 4 : 2
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            CHANGE COUNTRY
          </Typography>
          <CustomButton
            onClick={() => handleChange('SVERIGE', 'SEK')}
            sx={{ textTransform: 'none', textAlign: 'left', width: '100%' }}
          >
            <Typography
              variant="body1"
              component="span"
              sx={{
                opacity: selectedCountry === 'SVERIGE' && selectedCurrency === 'SEK' ? 0.5 : 1
              }}
            >
              SVERIGE / SEK
            </Typography>
          </CustomButton>
          <CustomButton
            onClick={() => handleChange('EUROPE', 'EUR')}
            sx={{ textTransform: 'none', textAlign: 'left', width: '100%' }}
          >
            <Typography
              variant="body1"
              component="span"
              sx={{ opacity: selectedCountry === 'EUROPE' && selectedCurrency === 'EUR' ? 0.5 : 1 }}
            >
              EUROPE / EUR
            </Typography>
          </CustomButton>
        </Box>
      </Modal>
    </>
  );
};
