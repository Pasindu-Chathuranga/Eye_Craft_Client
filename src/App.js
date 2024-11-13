import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText, Slide } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link } from 'react-scroll';
import HowItWorks from './pages/HowItWorks';
import Home from './pages/Home';
import BookNow from './pages/BookNow';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';
import './App.css';
import './theme/stars.css';
import theme from './theme/Theme';
import StartBackground from './components/Stars';
import Aos from 'aos';
import logo from './assets/logos/logo-white.png'
import 'aos/dist/aos.css';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAppBar, setShowAppBar] = useState(true); // State to control AppBar visibility
  let lastScrollY = window.scrollY; 

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{
        width: '100vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
        bgcolor: '#000000',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{
          position: 'absolute',
          top: '5px',
          left: '5px',
          color: '#e0e0e0',
        }}
      >
        <CloseIcon />
      </IconButton>
      <List sx={{ width: '100%' }}>
        {['Home', 'How It Works', 'Book Now', 'Gallery', 'Connect with Us'].map((text) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              const sectionId = text.toLowerCase().replace(/\s+/g, '-');
              setDrawerOpen(false);
              document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            sx={{ justifyContent: 'center' }}
          >
            <ListItemText primary={text} sx={{ textAlign: 'center', color: '#e0e0e0' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      {/* Navbar with Slide Transition for show/hide effect */}
      <Slide direction="down" in={showAppBar} mountOnEnter unmountOnExit>
        <AppBar position="sticky" sx={{ bgcolor: '#212A31', transition: 'all 0.3s ease' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <img src={logo} height='70px' style={{ padding: '10px' }} alt="Logo" />
              <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="home" smooth={true} offset={-70} duration={500}>
                  <Button color="inherit">Home</Button>
                </Link>
                <Link to="how-it-works" smooth={true} offset={-70} duration={500}>
                  <Button color="inherit">How It Works</Button>
                </Link>
                <Link to="book-now" smooth={true} offset={-70} duration={500}>
                  <Button color="inherit">Book Now</Button>
                </Link>
                <Link to="gallery" smooth={true} offset={-70} duration={500}>
                  <Button color="inherit">Gallery</Button>
                </Link>
                <Link to="connect-with-us" smooth={true} offset={-70} duration={500}>
                  <Button color="inherit">Connect with Us</Button>
                </Link>
              </Box>
            </div>
          </Toolbar>
        </AppBar>
      </Slide>

      {/* Drawer for mobile navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ width: '100%' }}>
        {list()}
      </Drawer>

      {/* Stars Background */}
      <StartBackground />

      {/* Sections */}
      <Container sx={{ bgcolor: '#212A31', zIndex: 99, position: 'relative' }}>
        <Box id="home" py={3}>
          <Home />
        </Box>
        <Box id="how-it-works" py={3}>
          <HowItWorks />
        </Box>
        <Box id="book-now" py={3}>
          <BookNow />
        </Box>
        <Box id="gallery" py={3} bgcolor="#2c2c2c" borderRadius={2} px={3}>
          <Gallery />
        </Box>
        <Box id="connect-with-us" py={3} bgcolor="#ffffff" borderRadius={2} px={3} sx={{ marginTop: '3%' }}>
          <ContactUs />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
