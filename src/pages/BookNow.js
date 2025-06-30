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
  ListItemText,
  CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { CheckCircle, Palette, FormatSize, FilterFrames, BlurOn } from '@mui/icons-material';
import CustomImage from '../components/CustomeImage';
import CustomerDetailsDialog from '../components/CustomerDetailsDialog';
import axios from 'axios';
import { API_URL } from '../const/api_url';
import StatusDialog from '../components/StatusDialog';

const icons = {
  Eye_Count: <CheckCircle sx={{ color: '#6e92a7' }} />,
  Print_Style: <Palette sx={{ color: '#6e92a7' }} />,
  Sizes: <FormatSize sx={{ color: '#6e92a7' }} />,
  Frames: <FilterFrames sx={{ color: '#6e92a7' }} />,
  Effects: <BlurOn sx={{ color: '#6e92a7' }} />
};

const AddOrderPage = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    Eye_Count: 'Single iris - One person',
    Print_Style: 'Paper-based print',
    Sizes: '20cmx20cm',
    Effects: 'Pure effect',
    Frames: 'Standard frame picture'
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [customerData, setCustomerData] = useState({ name: '', address: '', contact: '', email: '' });
  const [errors, setErrors] = useState({});
  const [orderStatus, setOrderStatus] = useState({ open: false, message: '', type: '' });
  const [filters, setFilters] = useState({
    Eye_Count: ['Single iris - One person', 'Duo iris - Two people', 'Trio iris - Three people', 'Quadruple iris - Four people Person'],
    Print_Style: ['Paper-based print'],
    Sizes: ['20cmx20cm', '30cmx30cm', '40cmx40cm', '50cmx50cm'],
    Effects: ['Pure effect', 'Explosion effect', 'Halo effect', 'Dust effect'],
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
    if (orderData.Eye_Count === 'Duo iris - Two people') {
      setFilters((prev) => ({
        ...prev,
        Effects: ['Yin Yang effect', 'Infinity effect', 'Fusion effect', 'Pure effect', 'Explosion effect', 'Halo effect']
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        Effects: ['Pure effect', 'Explosion effect', 'Halo effect', 'Dust effect']
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
    setLoading(true);
    try {
      const response = await axios.post(API_URL + '/order/add', {
        order: { ...orderData, Status: 'Pending' },
        customer: customerData
      });
      setOrderStatus({
        open: true,
        message: 'Your order has been placed successfully!',
        type: 'success'
      });
      setCustomerData({ name: '', address: '', contact: '', email: '' });
      setOrderData({
        Eye_Count: 'Single iris - One person',
        Print_Style: 'Paper-based print',
        Sizes: '20cmx20cm',
        Effects: 'Pure effect',
        Frames: 'Standard frame picture'
      });
      setOpenDialog(false);
    } catch (error) {
      console.error('Error submitting order:', error);
      setOrderStatus({
        open: true,
        message: 'Failed to submit your order. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Customize Your Order
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#E0E0E0', p: 2, pt: 0, pb: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <CustomImage
                eyeCount={orderData.Eye_Count}
                frame={orderData.Frames}
                size={orderData.Sizes}
                effect={orderData.Effects}
                duoEffect={orderData.Duo_Irish_effect}
              />
            </Box>

            {/* <CardContent sx={{ pt: 0, pb: 0 }}>
              <List>
                <Grid container spacing={1}>
                  {Object.entries(orderData).map(([key, value]) => (
                    <Grid item xs={12} sm={6} key={key}>
                      <ListItem sx={{ py: 0.1, my: 0.1, position: 'relative' }}>
                        <ListItemIcon>{icons[key]}</ListItemIcon>
                        <ListItemText
                          primary={key.replace(/_/g, ' ')}
                          secondary={value || 'Not selected'}
                          primaryTypographyProps={{ color: '#326a80' }}
                        />
                      </ListItem>
                    </Grid>
                  ))}
                </Grid>
              </List>
            </CardContent> */}
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
                renderInput={(params) => (
                  <TextField {...params} label={key == 'Eye_Count' ? "Person Count" : key.replace(/_/g, ' ')} fullWidth sx={{ mb: 2 }} />
                )}
              />
            ))}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button type="submit" variant="contained" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Proceed'}
              </Button>
            </motion.div>
          </form>
        </Grid>
      </Grid>

      <CustomerDetailsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={submitOrder}
        customerData={customerData}
        loader={loading}
        setCustomerData={setCustomerData}
        errors={errors}
      />

      {/* Success/Error dialog */}
      <StatusDialog
        open={orderStatus.open}
        onClose={() => setOrderStatus({ ...orderStatus, open: false })}
        status={orderStatus}
      />
    </Box>
  );
};

export default AddOrderPage;
