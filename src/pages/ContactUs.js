import React from 'react';
import { Box, Typography, Grid, Fade, Slide } from '@mui/material';
import { Email, Phone, Instagram, Facebook } from '@mui/icons-material';
import Logo from '../assets/logos/logo.png';
import EyeCraft from '../assets/logos/eyecraft.PNG';
import { useInView } from 'react-intersection-observer';

const ContactUs = () => {
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger animation when 20% of the component is in view
  });

  return (
    <Box id="connect-with-us" py={5} ref={ref}>
      <Fade in={inView} timeout={1000}>
        <Grid container spacing={2} alignItems="center">
          {/* Left side: Logo, Title, and Slogan */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ width: 100, marginRight: 10 }} />
            <Box>
              <img src={EyeCraft} alt="Logo" style={{ width: 150, marginRight: 16 }} />
              <Typography variant="h6" sx={{ color: '#555555', marginLeft: '8px' }}>
                Art in Every Blink
              </Typography>
            </Box>
          </Grid>

          {/* Right side: Contact Information */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}
          >
            <Typography variant="h4" gutterBottom sx={{ color: '#333333' }}>
              Connect with Us
            </Typography>

            <Slide direction="right" in={inView} timeout={500}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 1, color: '#555555' }} />
                <Typography variant="body1" sx={{ color: '#555555' }}>
                  eyecraftofficial@gmail.com
                </Typography>
              </Box>
            </Slide>

            <Slide direction="right" in={inView} timeout={700}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone sx={{ mr: 1, color: '#555555' }} />
                <Typography variant="body1" sx={{ color: '#555555' }}>
                  +94 70 677 6376
                </Typography>
              </Box>
            </Slide>

            <Slide direction="right" in={inView} timeout={900}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Instagram sx={{ mr: 1, color: '#555555' }} />
                <Typography variant="body1" sx={{ color: '#555555' }}>
                  <a
                    href="https://www.instagram.com/eyecraft.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#555555', textDecoration: 'none' }}
                  >
                    Instagram
                  </a>
                </Typography>
              </Box>
            </Slide>

            <Slide direction="right" in={inView} timeout={1100}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Facebook sx={{ mr: 1, color: '#555555' }} />
                <Typography variant="body1" sx={{ color: '#555555' }}>
                  <a
                    href="https://www.facebook.com/eyecraft"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#555555', textDecoration: 'none' }}
                  >
                    Facebook
                  </a>
                </Typography>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Fade>
    </Box>
  );
};

export default ContactUs;
