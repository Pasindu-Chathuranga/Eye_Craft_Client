import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Dialog, useMediaQuery, useTheme, Fade, Slide } from '@mui/material';
import { ArrowBackIos as ArrowBackIosIcon, ArrowForwardIos as ArrowForwardIosIcon, Close as CloseIcon } from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import image1 from '../assets/gallary/1.JPG';
import image2 from '../assets/gallary/2.JPG';
import image3 from '../assets/gallary/3.JPG';
import image4 from '../assets/gallary/4.JPG';
import image5 from '../assets/gallary/5.JPG';
import image6 from '../assets/gallary/6.JPG';

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: image1, alt: 'Image 1' },
    { id: 2, src: image2, alt: 'Image 2' },
    { id: 3, src: image3, alt: 'Image 3' },
    // { id: 4, src: image4, alt: 'Image 4' },
    // { id: 5, src: image5, alt: 'Image 5' },
    // { id: 6, src: image6, alt: 'Image 6' },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small (mobile view)
  const ITEMS_PER_PAGE = isMobile ? 1 : 4; // Display 1 item per page on mobile, 4 items on larger screens

  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < images.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedImage(null);
  };

  // Calculate the start and end index of the current page items
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentImages = images.slice(startIndex, endIndex);

  // Intersection Observer hook to detect when gallery section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once when it comes into view
    threshold: 0.1,    // Trigger when 10% of the section is visible
  });

  return (
    <Box
      id="gallery"
      py={5}
      sx={{ overflow: 'hidden', opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease-out' }} // Fade-in effect on scroll
      ref={ref}
    >
      <Typography variant="h4" gutterBottom>
        Gallery
      </Typography>
      <Grid container spacing={2} position="relative">
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <div style={{ width: '10%' }}>
            {/* Left Arrow Icon Button with Slide transition */}
            <Slide direction="left" in={currentPage > 0} mountOnEnter unmountOnExit>
              <IconButton
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  zIndex: 1,
                  color: currentPage === 0 ? '#aaa' : '#000',
                  transform: 'translateY(-50%)',
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
            </Slide>
          </div>
          <div
            style={{
              width: '80%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Gallery Items with Fade transition */}
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
              {currentImages.map((image) => (
                <Grid item xs={12} sm={6} md={3} key={image.id}>
                  <Fade in={true} timeout={1000}>
                    <Paper
                      elevation={2}
                      sx={{
                        padding: 1,
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)' },
                      }}
                      onClick={() => handleImageClick(image)}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={{
                          width: '100%', 
                          objectFit: 'cover',
                          borderRadius: '8px',
                          transition: 'transform 0.3s ease-in-out',
                        }}
                      />
                    </Paper>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </div>
          <div style={{ width: '10%' }}>
            {/* Right Arrow Icon Button with Slide transition */}
            <Slide direction="right" in={currentPage < Math.ceil(images.length / ITEMS_PER_PAGE) - 1} mountOnEnter unmountOnExit>
              <IconButton
                onClick={handleNextPage}
                disabled={(currentPage + 1) * ITEMS_PER_PAGE >= images.length}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  zIndex: 1,
                  color: (currentPage + 1) * ITEMS_PER_PAGE >= images.length ? '#aaa' : '#000',
                  transform: 'translateY(-50%)',
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Slide>
          </div>
        </div>
      </Grid>

      {/* Full-Screen Image Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <Box position="relative">
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{ width: '100%', height: 'auto', maxHeight: '90vh', borderRadius: '8px' }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Gallery;
