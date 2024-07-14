import React from 'react';
import { Typography, Grid } from '@mui/material';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

// Define the UserBox component
const UserBox = ({ stats, color }) => {
  // Create a lighter gradient version of the color
  const gradientColor = `${color}10`; // Adding alpha to make it lighter

  const statsCardStyles = {
    borderRadius: 2,
    padding: 2,
    boxShadow: 2,
    marginBottom: 2,
    background: `linear-gradient(135deg, ${gradientColor} 0%, ${color} 190%)`, // Gradient background
    border: `4px solid ${color}`,  // Border color
  };

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontSize: '1.5rem', color: color }}>
        Account Stats
      </Typography>
      <Grid sx={{ display: "flex", gap: 1 }}>
        <Grid sx={statsCardStyles}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: '#333', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Followers
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              <CountUp end={stats.followers} duration={2} />
            </Typography>
          </motion.div>
        </Grid>
        <Grid sx={statsCardStyles}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: '#333', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Total Posts
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              <CountUp end={stats.posts} duration={2} />
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserBox;
