import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box,
    Divider
} from '@mui/material';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';

const successMessages = [
    'Thank you for your purchase! Your order is being processed.',
    'We appreciate your order! You will be contacted soon.',
    'Thank you! Your order has been successfully placed. Stay tuned for updates.',
    'Your purchase was successful! We’ll process your order shortly.'
];

const errorMessages = [
    'Oops! Something went wrong. Please try again.',
    'There was an issue with your order submission. Please check and try again.',
    'Sorry, we encountered an error. Please retry your order.',
    'It seems there was a problem processing your order. Please try again later.'
];

const StatusDialog = ({ open, onClose, status }) => {
    const { type } = status;

    const isSuccess = type === 'success';

    const getRandomMessage = (messages) => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Box sx={{ px: 3, pt: 3, pb: 1, textAlign: 'center' }}>
                {isSuccess ? (
                    <CheckCircleOutline sx={{ fontSize: 60, color: '#4caf50' }} />
                ) : (
                    <ErrorOutline sx={{ fontSize: 60, color: '#f44336' }} />
                )}
                <DialogTitle sx={{ mt: 1, fontWeight: 600 }}>
                    {isSuccess ? 'Thank You for Your Purchase!' : 'Oops! Something Went Wrong'}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        {isSuccess
                            ? getRandomMessage(successMessages)
                            : getRandomMessage(errorMessages)}
                    </Typography>
                    {isSuccess && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2" color="textSecondary">
                                We appreciate your order. Our team will process it shortly and reach out with the next steps.
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" onClick={onClose} sx={{ bgcolor: isSuccess ? '#4caf50' : '#f44336' }}>
                        Close
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default StatusDialog;
