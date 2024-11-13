import React from 'react';
import { Box, Typography, Button, Grid, Fade, Slide, useMediaQuery } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import homeBG from '../assets/herobg.JPG';
import logo from '../assets/logos/logo-white.png';
import theme from '../theme/Theme';

function Home() {
  const { ref, inView } = useInView({
    triggerOnce: false, // Allows animations to trigger every time it scrolls into view
    threshold: 0.3, // Trigger when 30% of the component is visible
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box id="home" pt={2} pb={isMobile ? 7 : 2} ref={ref}>
      <Fade in={inView} timeout={1000}>
        <Grid container spacing={2} alignItems="center">
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Slide direction="left" in={inView} timeout={800}>
              <Box
                component="img"
                src={homeBG}
                alt="Art in every blink"
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </Slide>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6} >
            <Slide direction="right" in={inView} timeout={1000}>
              <Box>
                <Typography variant={isMobile ? "h4" : 'h2'} gutterBottom sx={{ color: '#D3D4D9', marginLeft: '15px', fontSize: isMobile ? "40px" : 'h2' }}>
                  Art in Every Blink
                </Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  gutterBottom
                  sx={{ width: '95%', marginLeft: '15px' }}
                >
                  Discover the elegance of your iris and transform your eye into art.
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ width: '95%', marginLeft: '15px' }}
                  gutterBottom
                >
                  Now available in Sri Lanka.
                </Typography>
                {/* Wrap the Button in Link for smooth scrolling */}
                <Link to="book-now" smooth={true} offset={-70} duration={500}>
                  <Button variant="contained" color="primary" sx={{ marginTop: '15px', marginLeft: '15px' }}>
                    Book Now
                  </Button>
                </Link>
              </Box>
            </Slide>
          </Grid>

        </Grid>
      </Fade>
    </Box>
  );
}

export default Home;
