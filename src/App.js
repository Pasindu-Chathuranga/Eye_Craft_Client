import { useEffect, useState } from 'react';
import { Container, Box, ThemeProvider } from '@mui/material';


import HowItWorks from './pages/HowItWorks';
import Home from './pages/Home';
import BookNow from './pages/BookNow';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';

import StartBackground from './components/Stars';
import theme from './theme/Theme'; 

import logo from './assets/logos/logo-white.png';

import './App.css';
import './theme/stars.css';
import 'aos/dist/aos.css';
import Navbar from './components/navBar/NavBar';
import NavDrawer from './components/navBar/NavDrawer';  
 
function App() {  
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Navbar logo={logo} onMenuClick={() => setDrawerOpen(true)} />
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* <StartBackground /> */}

      <Container sx={{ bgcolor: '#0D0D0D', zIndex: 99, position: 'relative' }}>
        <Box id="home" py={3}>
          <Home />
        </Box>
        <Box id="how-it-works" py={3}>
          <HowItWorks />
        </Box>
        <Box id="book-now" py={3}>
          <BookNow />
        </Box>
        <Box id="gallery" py={3} bgcolor="#0c0e0d" borderRadius={2} px={3}>
          <Gallery />
        </Box>
        <Box
          id="connect-with-us"
          py={3}
          bgcolor="#ffffff"
          borderRadius={2}
          px={3}
          sx={{ marginTop: '3%' }}
        >
          <ContactUs />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
