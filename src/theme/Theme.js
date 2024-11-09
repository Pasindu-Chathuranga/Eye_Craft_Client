
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#D3D4D9', secondary: '#748D92' },
  },
  typography: {
    h3: { fontWeight: 600, color: '#ffffff' },
    h4: { fontWeight: 500, color: '#e0e0e0' },
    body1: { color: '#bdbdbd' },
    button: { textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#90caf9',
          color: '#121212',
          '&:hover': {
            backgroundColor: '#64b5f6',
          },
        },
        containedSecondary: {
          backgroundColor: '#f48fb1',
          color: '#121212',
          '&:hover': {
            backgroundColor: '#f06292',
          },
        },
        outlinedPrimary: {
          borderColor: '#90caf9',
          color: '#90caf9',
          '&:hover': {
            backgroundColor: 'rgba(144, 202, 249, 0.08)',
          },
        },
        textPrimary: {
          color: '#90caf9',
          '&:hover': {
            backgroundColor: 'rgba(144, 202, 249, 0.08)',
          },
        },
        textSecondary: {
          color: '#f48fb1',
          '&:hover': {
            backgroundColor: 'rgba(244, 143, 177, 0.08)',
          },
        },
      },
    },
  },
});

export default theme;