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
import CustomerDetailsDialog from '../components/CustomerDetailsDialog';
import axios from 'axios';
import { API_URL } from '../const/api_url';
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
  const [orderStatus, setOrderStatus] = useState({ open: false, message: '', type: '' });
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


  const submitOrder = async () => {
    console.log({ 'order': orderData, 'customer': customerData });
    try {
      const response = await axios.post(API_URL + '/order/add', { 'order': orderData, 'customer': customerData });  
      setOrderStatus({ open: true, message: 'Your order has been placed successfully!', type: 'success' });
      setCustomerData({ name: '', address: '', contact: '', email: '' })
      setOrderData({
        Eye_Count: 'Single iris',
        Print_Style: 'Paper-based print',
        Sizes: '20cmx20cm',
        Effects: 'Pure effect image',
        Frames: 'Standard frame picture'
      })
    } catch (error) {
      console.error('Error submitting order:', error); 
      setOrderStatus({ open: true, message: 'Failed to submit your order. Please try again.', type: 'error' });
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

      <CustomerDetailsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={() => submitOrder()} // Replace with your real submit logic
        customerData={customerData}
        setCustomerData={setCustomerData}
        errors={errors}
      />

      {/* Success/Error dialog */}
      <Dialog open={orderStatus.open} onClose={() => setOrderStatus({ ...orderStatus, open: false })}>
        <DialogTitle>{orderStatus.type === 'success' ? 'Order Submitted' : 'Order Submission Failed'}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color={orderStatus.type === 'success' ? 'green' : 'red'}>
            {orderStatus.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderStatus({ ...orderStatus, open: false })} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddOrderPage;
