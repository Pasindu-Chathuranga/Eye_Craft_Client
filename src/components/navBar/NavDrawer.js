import React from 'react';
import {
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const SECTIONS = [
    'Home',
    'How It Works',
    'Book Now',
    'Gallery',
    'Connect with Us',
];

export default function NavDrawer({ open, onClose }) {
    // Safely handle close event (keyboard/mouse)
    const handleClose = (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        onClose();
    };

    return (
        <Drawer anchor="left" open={open} onClose={handleClose} sx={{ width: '100%' }}>
            <Box
                sx={{
                    width: '100vw',
                    height: '100%',
                    bgcolor: '#000000',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
                role="presentation"
                onClick={handleClose}
                onKeyDown={handleClose}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{ position: 'absolute', top: 5, left: 5, color: '#e0e0e0' }}
                >
                    <CloseIcon />
                </IconButton>

                <List sx={{ width: '100%' }}>
                    {SECTIONS.map((text) => (
                        <ListItem
                            button
                            key={text}
                            onClick={() => {
                                const sectionId = text.toLowerCase().replace(/\s+/g, '-');
                                onClose();
                                const el = document.getElementById(sectionId);
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            sx={{ justifyContent: 'center' }}
                        >
                            <ListItemText
                                primary={text}
                                sx={{ textAlign: 'center', color: '#e0e0e0' }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
