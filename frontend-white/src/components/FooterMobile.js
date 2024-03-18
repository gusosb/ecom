import Box from '@mui/material/Box'
import { Link } from "react-router-dom"
import { CustomButton } from '../helpers'


const FooterMobile = () => {

  return (
    <>
      <Box
        component='footer'
        sx={{
          borderTop: 1,
          borderColor: '#e6e6e6',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          pt: 2,
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column', // stacks buttons vertically
        }}>
          <CustomButton component={Link} to='/customer-support/faq'>
            CUSTOMER SUPPORT
          </CustomButton>

          <CustomButton component={Link} to='/' >
            ABOUT US
          </CustomButton>

          {/* <CustomButton component={Link} to='/' >
            SUSTAINABILITY
          </CustomButton>
          <CustomButton component={Link} to='/' >
            LEGAL
          </CustomButton> */}

        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >

          <CustomButton
            component='a'
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: 'auto',
              justifyContent: 'end'
            }}
          >
            INSTAGRAM
          </CustomButton>

          <CustomButton
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
          </CustomButton>


        </Box>
      </Box>
    </>
  );
}

export default FooterMobile;