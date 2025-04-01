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
  Eye_Count: <CheckCircle sx={{ color: '#6e92a7' }} />,
  Print_Style: <Palette sx={{ color: '#6e92a7' }} />,
  Sizes: <FormatSize sx={{ color: '#6e92a7' }} />,
  Frames: <FilterFrames sx={{ color: '#6e92a7' }} />,
  Effects: <BlurOn sx={{ color: '#6e92a7' }} />
};

const AddOrderPage = () => {
  const theme = useTheme();
  const [orderData, setOrderData] = useState({
    Eye_Count: 'Single iris',
    Print_Style: 'Paper-based print',
    Sizes: '20cmx20cm',
    Effects: 'Pure effect image',
    Frames: 'Standard frame picture'
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [customerData, setCustomerData] = useState({ name: '', address: '', contact: '', email: '' });
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({
    Eye_Count: ['Single iris', 'Duo iris', 'Trio iris', 'Quadruple iris'],
    Print_Style: ['Paper-based print'],
    Sizes: ['20cmx20cm', '30cmx30cm', '40cmx40cm', '50cmx50cm'],
    Effects: ['Pure effect image', 'Explosion effect image', 'Halo effect image', 'Dust effect image'],
    Frames: ['Professional frame picture', 'Standard frame picture']
  });
  const [recentlyChanged, setRecentlyChanged] = useState({});

  useEffect(() => {
    if (orderData.Sizes === '20cmx20cm') {
      setOrderData((prev) => ({ ...prev, Frames: 'Standard frame picture' }));
      setFilters((prev) => ({ ...prev, Frames: ['Standard frame picture'] }));
    } else if (orderData.Sizes === '50cmx50cm') {
      setOrderData((prev) => ({ ...prev, Frames: 'Professional frame picture' }));
      setFilters((prev) => ({ ...prev, Frames: ['Professional frame picture'] }));
    } else {
      setFilters((prev) => ({ ...prev, Frames: ['Professional frame picture', 'Standard frame picture'] }));
    }
  }, [orderData.Sizes]);

  useEffect(() => {
    console.log(orderData.Eye_Count)
    if (orderData.Eye_Count === 'Duo iris') {
      setFilters((prev) => ({
        ...prev,
        Effects: ['Yin Yang', 'Infinity', 'Fusion', 'Pure effect image', 'Explosion effect image', 'Halo effect image']
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        Effects: ['Pure effect image', 'Explosion effect image', 'Halo effect image', 'Dust effect image']
      }));
    }
  }, [orderData.Eye_Count]);

  const handleSelectChange = (name, value) => {
    setOrderData((prev) => ({ ...prev, [name]: value }));
    setRecentlyChanged((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => setRecentlyChanged((prev) => ({ ...prev, [name]: false })), 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(orderData).some((value) => !value)) {
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
          <Card sx={{ bgcolor: "#E0E0E0", p: 2, pt: 0 }}>
            {/* Ensure image sits at the very top without gaps */}
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <CustomImage
                eyeCount={orderData.Eye_Count}
                frame={orderData.Frames}
                size={orderData.Sizes}
                effect={orderData.Effects}
                duoEffect={orderData.Duo_Irish_effect}
              />
            </Box>

            <CardContent sx={{ pt: 0, pb: 2 }}>
              <List>
                <Grid container spacing={1}>
                  {Object.entries(orderData).map(([key, value]) => (
                    <Grid item xs={12} sm={6} key={key}>
                      <ListItem sx={{ py: 0.1, my: 0.1, position: "relative" }}>
                        <ListItemIcon>{icons[key]}</ListItemIcon>
                        <ListItemText
                          primary={key.replace(/_/g, " ")}
                          secondary={value || "Not selected"}
                          primaryTypographyProps={{ color: "#326a80" }}
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
          <form onSubmit={handleSubmit}>
            {Object.keys(filters).map((key) => (
              <Autocomplete
                key={key}
                options={filters[key]}
                onChange={(_, value) => handleSelectChange(key, value)}
                value={orderData[key]}
                renderInput={(params) => <TextField {...params} label={key.replace(/_/g, ' ')} fullWidth sx={{ mb: 2 }} />}
              />
            ))}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button type="submit" variant="contained" fullWidth>
                Proceed
              </Button>
            </motion.div>
          </form>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle textAlign="center">Enter Contact Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {['name', 'address', 'contact', 'email'].map((field) => (
              <TextField
                key={field}
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                onChange={(e) => setCustomerData({ ...customerData, [field]: e.target.value })}
                sx={{ mb: 2 }}
                error={!!errors[field]}
                helperText={errors[field]}
              />
            ))}
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
