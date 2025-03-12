import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  Autocomplete,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { CheckCircle, Palette, FormatSize, FilterFrames, BlurOn } from '@mui/icons-material';
import CustomImage from '../components/CustomeImage';

const icons = {
  Eye_Count: <CheckCircle sx={{ color: '#6a1b9a' }} />,
  Print_Style: <Palette sx={{ color: '#6a1b9a' }} />,
  Sizes: <FormatSize sx={{ color: '#6a1b9a' }} />,
  Frames: <FilterFrames sx={{ color: '#6a1b9a' }} />,
  Effects: <BlurOn sx={{ color: '#6a1b9a' }} />,
  Duo_Irish_effect: <BlurOn sx={{ color: '#6a1b9a' }} />
};

const AddOrderPage = () => {
  const theme = useTheme();
  const [orderData, setOrderData] = useState({ Eye_Count: 'Single iris', Print_Style: 'Paper-based print', Sizes: '20cmx20cm', Effects: 'Pure effect image', Frames: 'Standard frame picture', Duo_Irish_effect: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [customerData, setCustomerData] = useState({ name: '', address: '', contact: '', email: '' });
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({
    Eye_Count: ['Single iris', 'Duo iris', 'Trio iris', 'Quadruple iris'],
    Print_Style: ['Paper-based print', 'Acrylic Artwork'],
    Sizes: ['20cmx20cm', '30cmx30cm', '40cmx40cm', '50cmx50cm'],
    Effects: ['Pure effect image', 'Explosion effect image', 'Halo effect image', 'Dust effect image'],
    Frames: ['Professional frame picture', 'Standard frame picture']
  });
  const [recentlyChanged, setRecentlyChanged] = useState({});

  useEffect(() => {
    if (orderData.Frames === '20cmx20cm') {
      setOrderData((prev) => ({ ...prev, Frames: 'Standard frame picture' })); // Auto-set frame
      setFilters((prev) => ({ ...prev, Frames: ['Standard frame picture'] }));
      setFilters((prev) => ({ ...prev, Frames: ['Standard frame picture'] }));
    } else if (orderData.Frames === '50cmx50cm') {
      setOrderData((prev) => ({ ...prev, Frames: 'Professional frame picture' })); // Auto-set frame
      setFilters((prev) => ({ ...prev, Frames: ['Professional frame picture'] }));
    } else {
      setFilters((prev) => ({ ...prev, Frames: ['Professional frame picture', 'Standard frame picture'] }));
    }
  }, [orderData.Frames])
  const handleSelectChange = (name, value) => {
    setOrderData((prev) => ({ ...prev, [name]: value }));
    setRecentlyChanged((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => {
      setRecentlyChanged((prev) => ({ ...prev, [name]: false }));
    }, 1000);
    // Adjust frame options based on the selected size
    if (name === 'Sizes') {
      if (value === '20cmx20cm') {
        setOrderData((prev) => ({ ...prev, Frames: 'Standard frame picture' })); // Auto-set frame
        setFilters((prev) => ({ ...prev, Frames: ['Standard frame picture'] }));
        setFilters((prev) => ({ ...prev, Frames: ['Standard frame picture'] }));
      } else if (value === '50cmx50cm') {
        setOrderData((prev) => ({ ...prev, Frames: 'Professional frame picture' })); // Auto-set frame
        setFilters((prev) => ({ ...prev, Frames: ['Professional frame picture'] }));
      } else {
        setFilters((prev) => ({ ...prev, Frames: ['Professional frame picture', 'Standard frame picture'] }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define required fields excluding "Duo Iris Effect"
    const requiredFields = Object.keys(orderData).filter(key => key !== 'Duo_Irish_effect');

    // Check if any required field is empty
    const hasEmptyFields = requiredFields.some((key) => !orderData[key]);

    if (hasEmptyFields) {
      setErrors({ message: 'Please fill out all required fields' });
    } else {
      setOpenDialog(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Customize Your Order
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              bgcolor: '#E0E0E0',
              p: { xs: '0 16px 16px 16px', sm: 0 }, // Removes top padding on mobile
            }}
          >
            <CardContent sx={{ p: { xs: '0 16px 16px 16px', sm: 0 }, }}>
              <CustomImage
                eyeCount={orderData.Eye_Count}
                frame={orderData.Frames}
                size={orderData.Sizes}
                effect={orderData.Effects}
                duoEffect={orderData.Duo_Irish_effect}
              />
              <List>
                <Grid container spacing={2}>
                  {Object.entries(orderData)
                    .filter(([key]) => key !== 'Duo_Iris_Effect' || orderData.Eye_Count === 'Duo Irish')
                    .map(([key, value]) => (
                      <Grid item xs={12} sm={6} key={key}>
                        <ListItem
                          sx={{
                            color: '#393228',
                            py: 0,
                            transition: '0.3s',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              background: 'rgba(255, 215, 0, 0.5)',
                              transform: recentlyChanged[key] ? 'scaleY(1)' : 'scaleY(0)',
                              transformOrigin: 'center',
                              transition: 'transform 0.5s ease-in-out',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: '#393228' }}>
                            {React.cloneElement(icons[key], { sx: { color: '#393228' } })}
                          </ListItemIcon>
                          <ListItemText
                            primary={`${key.replace(/_/g, ' ')}`}
                            secondary={value || 'Not selected'}
                            sx={{ color: '#393228' }}
                            primaryTypographyProps={{ color: '#326a80' }}
                          />
                        </ListItem>
                      </Grid>
                    ))}
                </Grid>
              </List>


            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mb: 4, color: '#fff' }}>
            Select Customizations
          </Typography>
          <form onSubmit={handleSubmit}>
            {Object.keys(filters).map((key) => {
              const options = filters[key];
              return (
                <Autocomplete
                  key={key}
                  options={options}
                  onChange={(_, value) => handleSelectChange(key, value)}
                  value={orderData[key]}
                  renderInput={(params) => (
                    <TextField {...params} label={key.replace(/_/g, ' ')} fullWidth sx={{ mb: 2 }} />
                  )}
                />
              );
            })}
            {orderData.Eye_Count == 'Duo iris' && (
              <Autocomplete
                options={['Yin Yang', 'Infinity', 'Fusion']}
                onChange={(_, value) => handleSelectChange('Duo_Irish_effect', value)}
                value={orderData['Duo_Irish_effect']}
                renderInput={(params) => (
                  <TextField {...params} label='Duo Irish effect' fullWidth sx={{ mb: 2 }} />
                )}
              />)}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button type="submit" variant="contained" fullWidth>
                Proceed
              </Button>
            </motion.div>
          </form>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: 'center' }}>Enter Contact Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {['name', 'address', 'contact', 'email'].map((field) => (
                <TextField
                  key={field}
                  fullWidth
                  label={field == 'contact' ? 'Contact Number': field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  onChange={(e) => setCustomerData({ ...customerData, [e.target.name]: e.target.value })}
                  sx={{ mb: 2 }}
                  error={!!errors[field]}
                  helperText={errors[field]}
                />
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => console.log('Order Submitted:', { orderData, customerData })} variant="contained">
            Submit Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddOrderPage;
