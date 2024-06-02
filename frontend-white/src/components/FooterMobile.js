import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { CustomButton, CountryCurrencyModal } from '../helpers';

const FooterMobile = () => {
  return (
    <>
      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: '#e6e6e6',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          pt: 2
        }}
      >
        <Box
          sx={{
            height: '120px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CustomButton component={Link} to="/customer-support/faq">
            CUSTOMER SUPPORT
          </CustomButton>

          <CustomButton component={Link} to="/terms-and-conditions">
            TERMS & CONDITIONS
          </CustomButton>

          <CustomButton component={Link} to="/about-us">
            ABOUT US
          </CustomButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <CustomButton
            component="a"
            href="https://www.instagram.com/realgustaflund"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              justifyContent: 'end'
            }}
          >
            INSTAGRAM
          </CustomButton>

          {/* <CustomButton
            component='a'
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              alignSelf: 'flex-end',
              mb: 2,
              justifyContent: 'end'
            }}
          >
            TIKTOK
          </CustomButton> */}

          <CountryCurrencyModal />
        </Box>
      </Box>
    </>
  );
};

export default FooterMobile;
