import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Button,
    CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import ReactPixel from 'react-facebook-pixel';

const CustomerDetailsDialog = ({ open, onClose, onSubmit, customerData, setCustomerData, loader }) => {
    const fields = ['name', 'email', 'contact', 'address'];
    const [localErrors, setLocalErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!customerData.name.trim()) newErrors.name = 'Name is required';
        if (!customerData.address.trim()) newErrors.address = 'Address is required';
        if (!customerData.contact.trim()) {
            newErrors.contact = 'Contact number is required';
        } else if (!/^\d{10}$/.test(customerData.contact)) {
            newErrors.contact = 'Enter a valid 10-digit number';
        }
        if (!customerData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
            newErrors.email = 'Enter a valid email address';
        }

        setLocalErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) { 
            ReactPixel.track('Submit application', {
                name: customerData.name,
                email: customerData.email,
                contact: customerData.contact
            });

            onSubmit();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle textAlign="center">Enter Contact Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center', alignItems: 'center' }}>
                    {fields.map((field) => {
                        const label = field === 'contact' ? "Contact number" : field.charAt(0).toUpperCase() + field.slice(1);
                        const isMultiline = field === 'address';
                        const type =
                            field === 'email' ? 'email' :
                            field === 'contact' ? 'tel' : 'text';

                        return (
                            <TextField
                                key={field}
                                fullWidth
                                label={label}
                                name={field}
                                type={type}
                                value={customerData[field]}
                                onChange={(e) =>
                                    setCustomerData({
                                        ...customerData,
                                        [field]: e.target.value
                                    })
                                }
                                sx={{ mb: 2 }}
                                multiline={isMultiline}
                                rows={isMultiline ? 3 : 1}
                                error={!!localErrors[field]}
                                helperText={localErrors[field]}
                            />
                        );
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loader}>Cancel</Button>
                <motion.div whileHover={{ scale: 1.05 }}>
                    <Button onClick={handleSubmit} variant="contained" fullWidth disabled={loader}>
                        {loader ? <CircularProgress size={24} color="inherit" /> : ' Submit Order'}
                    </Button>
                </motion.div>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerDetailsDialog;
