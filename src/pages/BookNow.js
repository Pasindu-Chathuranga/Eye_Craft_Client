import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';

const products = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  price: `$${(Math.random() * 100).toFixed(2)}`,
  image: `path_to_your_product_image_${index + 1}.jpg`, // Replace with actual product image paths
}));

const filterTypes = [
  { title: 'Eye Count', options: ['Option 1', 'Option 2', 'Option 3'] },
  { title: 'Print Styles', options: ['Option 1', 'Option 2', 'Option 3'] },
  { title: 'Sizes', options: ['Option 1', 'Option 2', 'Option 3'] },
  { title: 'Frames', options: ['Option 1', 'Option 2', 'Option 3'] },
  { title: 'Effects', options: ['Option 1', 'Option 2', 'Option 3'] },
  { title: 'Duo Custom Effects', options: ['Option 1', 'Option 2', 'Option 3'] },
];

const BookNow = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { ref, inView } = useInView({ threshold: 0.5 });
  const animationStyle = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { mass: 1, tension: 200, friction: 20 },
  });

  const itemsPerPage = isMobile ? 4 : 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const currentItems = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleSubmit = () => {
    console.log(customerDetails);
    handleCloseDialog();
    setCustomerDetails({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
    });
  };

  return (
    <Box id="book-now" py={5} px={5} bgcolor="#2c2c2c">
      <animated.div style={animationStyle} ref={ref}>
        <Typography variant="h4" gutterBottom>
          Product Catalog
        </Typography>
        <Typography variant="body1">
          Ready to get started? Book an appointment with us today!
        </Typography>
      </animated.div>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            {filterTypes.map((filter, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{filter.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {filter.options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      control={<Checkbox />}
                      label={option}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Grid container spacing={2}>
            {currentItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Paper elevation={2} sx={{ padding: 2, textAlign: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2">{item.price}</Typography>
                  <Button variant="text" onClick={() => handleOpenDialog(item)}>Book Now</Button>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" onClick={handlePrevPage} disabled={currentPage === 0}>
              Previous
            </Button>
            <Button variant="contained" onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Book Now</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" sx={{ width: '100%' }}>
            <Box sx={{ flex: 1, bgcolor: '#424242', color: '#fff', p: 2, borderRadius: 1, mb: { xs: 2, sm: 0 } }}>
              {selectedProduct && (
                <>
                  <Typography variant="h6">{selectedProduct.name}</Typography>
                  <Typography variant="body1">{selectedProduct.price}</Typography>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }}
                  />
                </>
              )}
            </Box>

            <Box sx={{ flex: 1, bgcolor: '#f5f5f5', color: '#1c1c1c', p: 2, borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Enter Your Details
              </Typography>
              {['name', 'email', 'phone', 'address', 'city'].map((field) => (
                <TextField
                  key={field}
                  margin="dense"
                  sx={{
                    color: '#1c1c1c',
                    '& .MuiInputBase-input': {
                      color: '#333', // Darker text for input
                    },
                    '& .MuiInputLabel-root': {
                      color: '#333', // Darker label color
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#333', // Darker underline color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#333', // Darker underline color when focused
                      },
                      '& fieldset': {
                        borderColor: '#666', // Default darker underline color
                      },
                    },
                  }}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  fullWidth
                  variant="outlined" // Use outlined variant for the underline effect
                  onChange={handleChange}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Book Now</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookNow;