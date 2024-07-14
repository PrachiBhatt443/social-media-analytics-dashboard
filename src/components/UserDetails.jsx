// src/components/UserDetails.jsx
import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const UserDetails = ({ platform, details, color }) => {
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Facebook':
        return <FacebookIcon sx={{ fontSize: 50, color: color }} />;
      case 'Instagram':
        return <InstagramIcon sx={{ fontSize: 50, color: color }} />;
      case 'Twitter':
        return <TwitterIcon sx={{ fontSize: 50, color: color }} />;
      case 'YouTube':
        return <YouTubeIcon sx={{ fontSize: 50, color: color }} />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ 
      mb: 2, 
      p: 2, 
      boxShadow: 3, 
      border: `2px solid ${color}`,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: 6,
      },
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {getPlatformIcon(platform) && (
            <Box sx={{ mr: 2 }}>
              {getPlatformIcon(platform)}
            </Box>
          )}
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {platform} User Details
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>UserName:</strong> {details.userName}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Category:</strong> {details.category}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Bio:</strong> {details.bio}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Contact:</strong> {details.contact}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button variant="contained" color="primary" href={details.link} target="_blank">Platform Link</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
