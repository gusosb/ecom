import { useWindowSize } from '../helpers';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const About = () => {
  const windowSize = useWindowSize();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: 1000, my: windowSize.width > 800 ? 7 : 2, mx: 5 }}>
          <Typography variant="body2" fontWeight="bold" fontSize={17}>
            Mission statement
          </Typography>
          <br />
          <Typography variant="body1">
            At GUSTAF LUND, we are dedicated to crafting exquisite, sustainable garments that epitomize luxury for the modern man. With meticulous
            attention to detail and a commitment to using only the finest materials, we offer a collection that transcends trends, providing timeless
            pieces designed to be cherished for years to come. Our mission is to redefine the concept of luxury fashion for men by prioritizing
            quality, sustainability, and longevity in every garment we create, taking your style to the next level of sophistication and elegance.
          </Typography>

          <br />
          <br />
          <br />

          <Typography variant="body2" fontWeight="bold" fontSize={17}>
            Vision
          </Typography>
          <br />

          <Typography variant="body1">
            Our vision at GUSTAF LUND is to lead the way in the fashion industry by proving that premium quality and environmental consciousness can
            coexist harmoniously in men's fashion. We envision a future where every garment is a symbol of refined craftsmanship, enduring style, and
            ethical production practices. By fostering a culture of sustainability and responsible consumption, we strive to inspire men to invest in
            fewer, better pieces that not only elevate their wardrobe but also contribute to a more sustainable planet. GUSTAF LUND is not just a
            brand; it's a testament to the timeless allure of craftsmanship and the enduring beauty of consciously curated fashion, taking your style
            to the next level.
          </Typography>
        </Box>
      </div>
    </>
  );
};

export default About;
