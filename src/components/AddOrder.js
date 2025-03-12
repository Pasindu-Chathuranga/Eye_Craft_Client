import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../const/api_url";

const AddOrder = (props) => {
    const { openDialog, handleCloseDialog, selectedProduct } = props;
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
    });
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails({ ...customerDetails, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';

        if (!value) {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        } else {
            if (name === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                error = 'Enter a valid email address.';
            } else if (name === 'phone' && (!/^\d{10}$/.test(value))) {
                error = 'Phone must be a 10-digit number.';
            }
        }

        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async () => {
        const newErrors = {};
        Object.keys(customerDetails).forEach((field) => {
            if (!customerDetails[field]) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
            }
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length != 0) {
            setNotification({ open: true, message: 'Please fill out all required fields correctly.', severity: 'error' });
            return;
        }
        const formData = {
            customer_name: customerDetails.name,
            customer_email: customerDetails.email,
            customer_address: customerDetails.address,
            customer_phone: customerDetails.phone,
            customer_city: customerDetails.city,
            order_status: 'pending',
            image_url: selectedProduct.image_url,
            eye_count: selectedProduct.eye_count,
            print_style: selectedProduct.print_style,
            size: selectedProduct.size,
            effect: selectedProduct.effect,
            frame: selectedProduct.frame,
            price: selectedProduct.price,
            duo_custom_effects: selectedProduct.duo_custom_effects,
        }
        try {
            await axios.post(`${API_URL}/order/add`, formData).then(async () => {
                setNotification({ open: true, message: 'Order added successfully!', severity: 'success' });
 
                await axios.post(`${API_URL}/mail/order_placed`, {
                    customer_name: customerDetails.name,
                    customer_email: customerDetails.email,
                    orderItem: formData,
                });
  
                handleCloseDialog();
                setCustomerDetails({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                });
                setErrors({});
            })
        } catch (error) {
            setNotification({ open: true, message: 'Failed to add order, Try again later .', severity: 'error' });
        }
    };

    const handleNotificationClose = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <>
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogTitle>Book Now</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" sx={{ width: '100%' }}>
                        <Box sx={{ flex: 1, bgcolor: '#424242', color: '#fff', p: 2, borderRadius: 1, mb: { xs: 2, sm: 0 } }}>
                            {selectedProduct && (
                                <>
                                    <Box sx={{ textAlign: 'start', width: '100%' }}>
                                        <Typography variant="body1" mb={1} component="div">
                                            <strong>Eye Count:</strong> {selectedProduct.eye_count}
                                        </Typography>
                                        <Typography variant="body1" mb={1} component="div">
                                            <strong>Print Style:</strong> {selectedProduct.print_style}
                                        </Typography>
                                        <Typography variant="body1" mb={1} component="div">
                                            <strong>Size:</strong> {selectedProduct.size}
                                        </Typography>
                                        <Typography variant="body1" mb={1} component="div">
                                            <strong>Frame:</strong> {selectedProduct.frame}
                                        </Typography>
                                        <Typography variant="body1" mb={1} component="div">
                                            <strong>Effect:</strong> {selectedProduct.effect}
                                        </Typography>
                                        {selectedProduct.duo_custom_effects && (
                                            <Typography variant="body1" mb={1} component="div">
                                                <strong>Duo Custom Effect:</strong> {selectedProduct.duo_custom_effects}
                                            </Typography>
                                        )}
                                        <Typography variant="body1" mb={1} component="div">
                                            <strong>Price:</strong> Rs.{selectedProduct.price}.00
                                        </Typography>
                                    </Box>
                                    <img
                                        src={selectedProduct.image_url}
                                        alt={selectedProduct._id}
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
                                        '& .MuiInputBase-input': { color: '#333' },
                                        '& .MuiInputLabel-root': { color: '#333' },
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': { borderColor: '#333' },
                                            '&.Mui-focused fieldset': { borderColor: '#333' },
                                            '& fieldset': { borderColor: '#666' },
                                        },
                                    }}
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    fullWidth
                                    name={field}
                                    value={customerDetails[field]}
                                    onChange={handleChange}
                                    error={!!errors[field]}
                                    helperText={errors[field] || ''}
                                />
                            ))}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Book</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleNotificationClose}>
                <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddOrder;
