import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';  
import axios from '../utils/axiosInstance';

const Header = ({ username }) => {

  const [platformData, setPlatformData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/analytics/1');
        setPlatformData(response.data.platformData);
      } catch (error) {
        setError('Failed to fetch data');
      }
    };

    fetchAnalytics();
  }, []);


  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Box sx={{ padding: 3, borderBottom: '1px solid #ddd' }}>
      <Typography variant="h4" sx={{ mb: 1, color: '#333', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.9 }}
        >
          Social Media Analytics Dashboard
        </motion.div>
      </Typography>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.9 }}
        >
          
        <Typography variant="h6" sx={{ color: '#555' }}>
          Hi {platformData.username} 👋 <br /> Welcome Back!
        </Typography>
        </motion.div>
        <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>
          {currentDate}
        </Typography>
        
      </Grid>
    </Box>
  );
};

export default Header;
