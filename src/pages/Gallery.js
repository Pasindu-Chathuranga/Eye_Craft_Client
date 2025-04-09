import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Dialog,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon, ArrowBack, ArrowForward } from "@mui/icons-material";
import image1 from "../assets/gallary/1.jpg";
import image2 from "../assets/gallary/2.png";
import image3 from "../assets/gallary/3.jpg";
import image4 from "../assets/gallary/4.jpg";
import image5 from "../assets/gallary/5.jpg";
import image6 from "../assets/gallary/6.jpg";
import image7 from "../assets/gallary/7.jpg";
import image8 from "../assets/gallary/8.JPG";
import image9 from "../assets/gallary/9.JPG";
import image10 from "../assets/gallary/10.JPG";
import image11 from "../assets/gallary/11.JPG";
import image12 from "../assets/gallary/12.JPG";
import image13 from "../assets/gallary/13.JPG";

const images = [
  { id: 1, src: image1, alt: "Image 1" },
  { id: 2, src: image2, alt: "Image 2" },
  { id: 3, src: image3, alt: "Image 3" },
  { id: 4, src: image4, alt: "Image 4" }, 
  { id: 5, src: image5, alt: "Image 5" },
  { id: 6, src: image6, alt: "Image 6" },
  { id: 7, src: image7, alt: "Image 7" },
  { id: 8, src: image8, alt: "Image 8" },
  { id: 9, src: image9, alt: "Image 9" }, 
  // { id: 10, src: image10, alt: "Image 10" },
  // { id: 11, src: image11, alt: "Image 11" },
  { id: 12, src: image12, alt: "Image 12" },
  { id: 13, src: image13, alt: "Image 13" },
];

const Gallery = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const imagesPerPage = isMobile ? 6 : images.length;

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedImage(null);
  };

  const handleNextPage = () => {
    if ((page + 1) * imagesPerPage < images.length) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <Box id="gallery" py={5} sx={{ textAlign: "start" }}>
      <Typography variant="h4" gutterBottom my={4}>
        Gallery
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: "8px",
          justifyContent: "center",
          gridAutoFlow: "dense",
        }}
      >
        {images.slice(page * imagesPerPage, (page + 1) * imagesPerPage).map((image) => (
          <Paper
            key={image.id}
            elevation={3}
            sx={{
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              transition: "0.4s ease-in-out all",
              "&:hover": { transform: "scale(1.02)" },
              "&:hover::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(120deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
                opacity: 0,
                transition: "opacity 0.4s ease-in-out",
              },
              "&:hover::before": {
                opacity: 1,
              },
            }}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: "100%", // Ensures same height and width
                objectFit: "cover", // Ensures images maintain aspect ratio without stretching
                borderRadius: "8px",
              }}
            />
          </Paper>
        ))}
      </Grid>

      {isMobile && (
        <Box display="flex" justifyContent="center" mt={2}>
          <IconButton onClick={handlePrevPage} disabled={page === 0}>
            <ArrowBack />
          </IconButton>
          <Typography variant="body1" sx={{ marginTop: '10px', marginLeft: '20px', marginRight: '20px' }}>{` ${page + 1}`}</Typography>
          <IconButton onClick={handleNextPage} disabled={(page + 1) * imagesPerPage >= images.length}>
            <ArrowForward />
          </IconButton>
        </Box>
      )}

      {/* Full-Screen Image Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <Box position="relative" textAlign="center" sx={{ backgroundColor: "rgba(0,0,0,0)" }}>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#fff",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{
                width: "auto",
                maxWidth: "90vw",
                height: "auto",
                maxHeight: "90vh",
              }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Gallery;
