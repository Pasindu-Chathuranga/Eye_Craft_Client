import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'; // Import Menu and Close icons
import { Link } from 'react-scroll'; // Importing Link from react-scroll
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
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control drawer open/close

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with a duration for animations
  }, []);

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
        bgcolor: '#000000', // Background color of the drawer
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{
          position: 'absolute', // Set position to absolute
          top: '5px', // Offset from the top
          left: '5px', // Offset from the left
          color: '#e0e0e0', // Button color
        }}
      >
        <CloseIcon />
      </IconButton>
      <List sx={{ width: '100%' }}>
        {['Home', 'How It Works', 'Book Now', 'Gallery', 'Connect with Us'].map((text) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={text.toLowerCase().replace(/\s+/g, '-')} // Use react-scroll Link
            smooth={true} // Smooth scroll
            offset={-70} // Offset for the fixed navigation bar
            duration={500} // Scroll duration
            sx={{ justifyContent: 'center' }}
          >
            <ListItemText primary={text} sx={{ textAlign: 'center' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: '#212A31' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' } }} // Show on small screens only
          >
            <MenuIcon />
          </IconButton>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <img src={logo} height='70px' style={{padding:'10px'}} alt="Logo" />
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

      {/* Drawer for mobile navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ width: '100%' }}>
        {list()}
      </Drawer>

      {/* Stars Background */}
      <StartBackground />

      {/* Sections */}
      <Container sx={{ bgcolor: '#212A31', zIndex: 99, position: 'relative' }}>

        {/* Home Section */}
        <Box id="home" py={3}  >
          <Home />
        </Box>

        {/* How It Works Section */}
        <Box id="how-it-works" py={3} sx={{ marginTop: '1%' }}>
          <HowItWorks />
        </Box>

        {/* Book Now Section */}
        <Box id="book-now" py={3} sx={{ marginTop: '1%' }}>
          <BookNow />
        </Box>

        {/* Gallery Section */}
        <Box id="gallery" py={3} bgcolor="#2c2c2c" borderRadius={2} px={3} sx={{ marginTop: '1%' }}>
          <Gallery />
        </Box>

        {/* Connect with Us Section */}
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
