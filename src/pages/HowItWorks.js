import React from 'react';
import { Typography, Grid, Card, CardContent, Box, Fade, Slide } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import h1 from '../assets/howitworks/h1.JPG';
import h2 from '../assets/howitworks/h2.WEBP';
import h3 from '../assets/howitworks/h3.JPG';
import { useInView } from 'react-intersection-observer';

const Step = ({ icon, title, content, image, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Enable re-trigger on re-entry
    threshold: 0.5,     // Trigger animation when 50% of the component is in view
  });

  return (
    <Grid item xs={12} sm={4} ref={ref}>
      <Slide direction={index % 2 === 0 ? "right" : "left"} in={inView} timeout={1000}>
        <Card
          borderRadius={2}
          sx={{
            bgcolor: '#fff',
            color: 'text.secondary',
            height: '100%',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)', // Light gray box shadow
            transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition
            '&:hover': {
              transform: 'translateY(-10px)', // Lift effect on hover
              boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.45)', // Slightly darker shadow on hover
            },
          }}
        >
          <Fade in={inView} timeout={1000}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                {icon}
                <Typography variant="h6" sx={{ ml: 2, color: '#333533' }}>
                  {title}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ height: '100px', marginBottom: '10px', color: 'rgba(0, 47, 73,0.7)' }} pb={2}>
                {content}
              </Typography>
              <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                  width: '100%',
                  height: '200px',
                  mt: 3,
                  borderRadius: '5px',
                  objectFit: 'cover',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '20px'
                }}
              />
            </CardContent>
          </Fade>
        </Card>
      </Slide>
    </Grid>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <EventIcon sx={{ fontSize: 40, color: '#333533' }} />,
      title: "Book Your Appointment",
      content:
        "Customize your EyeCraft experience by selecting your preferred eye count and size. Explore various print and frame styles, and enjoy complimentary iris effects of your choice when placing your order with EyeCraft.",
      image: h1,
    },
    {
      icon: <CameraAltIcon sx={{ fontSize: 40, color: '#333533' }} />,
      title: "Capture Your Iris",
      content:
        "Experience the convenience of our mobile iris photography service. We bring state-of-the-art equipment to your location for a quick session capturing every detail of your iris in just minutes.",
      image: h2,
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: '#333533' }} />,
      title: "Delivered to Your Doorstep",
      content:
        "We print your high-quality image with precision, frame it with our special materials in-house, and deliver the final product to your doorstep within 3-4 working days.",
      image: h3,
    },
  ];

  return (
    <Box id="how-it-works" py={5} bgcolor="#E0E0E0" borderRadius={2} px={3}>
      <Typography variant="h4" gutterBottom sx={{ color: "#333533", mb: 4 }}>
        How It Works
      </Typography>
      <Grid container spacing={3}>
        {steps.map((step, index) => (
          <Step
            key={index}
            icon={step.icon}
            title={step.title}
            content={step.content}
            image={step.image}
            index={index}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
