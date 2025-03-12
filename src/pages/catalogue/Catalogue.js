import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const CataloguePage = ({ id, handleDrawer }) => {
    const [order, setOrder] = useState({
        product: '',
        size: '',
        frame: '',
        price: ''
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({ name: '', address: '', contact: '', email: '' });

    const productOptions = ["Single", "Duo", "Trio", "Quadruple"];
    const sizeOptions = ["20x20", "30x30", "40x40", "50x50"];
    const frameOptions = ["Standard", "Professional"];
    const priceMap = {
        "Single-20x20-Standard": 9500,
        "Single-30x30-Standard": 12000,
        "Single-30x30-Professional": 16500,
        "Single-40x40-Standard": 17000,
        "Single-40x40-Professional": 19000,
        "Single-50x50-Professional": 21000,
        "Duo-20x20-Standard": 12000,
        "Duo-30x30-Standard": 14500,
        "Duo-30x30-Professional": 17500,
        "Duo-40x40-Standard": 19000,
        "Duo-40x40-Professional": 23000,
        "Duo-50x50-Professional": 26000,
        "Trio-20x20-Standard": 15000,
        "Trio-30x30-Standard": 17500,
        "Trio-30x30-Professional": 20500,
        "Trio-40x40-Standard": 23000,
        "Trio-40x40-Professional": 28000,
        "Trio-50x50-Professional": 32500,
        "Quadruple-20x20-Standard": 18500,
        "Quadruple-30x30-Standard": 23000,
        "Quadruple-30x30-Professional": 28000,
        "Quadruple-40x40-Standard": 32000,
        "Quadruple-40x40-Professional": 36000,
        "Quadruple-50x50-Professional": 42000
    };

    const handleOrderChange = (e) => {
        const { name, value } = e.target;
        setOrder((prevOrder) => {
            const updatedOrder = { ...prevOrder, [name]: value };
            const priceKey = `${updatedOrder.product}-${updatedOrder.size}-${updatedOrder.frame}`;
            return { ...updatedOrder, price: priceMap[priceKey] || '' };
        });
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();
        setOpenPopup(true);
    };

    const handleCustomerInfoChange = (e) => {
        setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    };

    const handleConfirmOrder = () => {
        console.log('Order Details:', order);
        console.log('Customer Info:', customerInfo);
        setOpenPopup(false);
    };

    return (
        <section id={id} className="catalogue-container">
            <h1 className='main-title catalogue-title' onClick={handleDrawer}>Catalogue</h1>
            <div className='catalogue-main-container'>
                <form onSubmit={handleSubmitOrder}>
                    <TextField select label="Product" name="product" value={order.product} onChange={handleOrderChange} fullWidth margin="normal">
                        {productOptions.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                    <TextField select label="Size" name="size" value={order.size} onChange={handleOrderChange} fullWidth margin="normal">
                        {sizeOptions.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                    <TextField select label="Frame" name="frame" value={order.frame} onChange={handleOrderChange} fullWidth margin="normal">
                        {frameOptions.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </TextField>
                    <TextField label="Price" name="price" value={order.price} fullWidth margin="normal" disabled />
                    <Button type="submit" variant="contained" color="primary">Place Order</Button>
                </form>
            </div>

            {/* Popup for customer details */}
            <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
                <DialogTitle>Enter Your Details</DialogTitle>
                <DialogContent>
                    {['name', 'address', 'contact', 'email'].map((field) => (
                        <TextField
                            key={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            value={customerInfo[field]}
                            onChange={handleCustomerInfoChange}
                            fullWidth
                            margin="normal"
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPopup(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleConfirmOrder} color="primary">Confirm Order</Button>
                </DialogActions>
            </Dialog>
        </section>
    );
}

export default CataloguePage;
