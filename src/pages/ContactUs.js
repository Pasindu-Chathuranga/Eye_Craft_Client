import React from 'react';
import { Box, Typography, Grid, Fade, Slide } from '@mui/material';
import { Email, Phone, Instagram, Facebook } from '@mui/icons-material';
import Logo from '../assets/logos/logo.png';
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
            <img src={Logo} alt="Logo" style={{ width: 100, marginRight: 16 }} />
            <Box>
              <Typography variant="h4" sx={{ color: '#333333' }}>
                Eye Craft
              </Typography>
              <Typography variant="h5" sx={{ color: '#333333' }}>
                Art in Every Blink
              </Typography>
              <Typography variant="body1" sx={{ color: '#555555' }}>
                Your one-stop destination for exquisite art pieces.
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
