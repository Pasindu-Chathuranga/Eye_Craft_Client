import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Slide,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-scroll';

const SECTIONS = [
    { label: 'Home', id: 'home' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Book Now', id: 'book-now' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Connect with Us', id: 'connect-with-us' },
];

export default function Navbar({ logo, onMenuClick }) {
    return (
        <Slide direction="down" in mountOnEnter unmountOnExit>
            <AppBar position="sticky" sx={{ bgcolor: '#0D0D0D', transition: 'all 0.3s ease' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onMenuClick}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <img src={logo} height={50} alt="Logo" style={{ padding: 10 }} />

                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 2,
                            }}
                        >
                            {SECTIONS.map(({ label, id }) => (
                                <Link
                                    key={id}
                                    to={id}
                                    smooth
                                    offset={-70}
                                    duration={500}
                                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                                >
                                    <Button color="inherit">{label}</Button>
                                </Link>
                            ))}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Slide>
    );
}
