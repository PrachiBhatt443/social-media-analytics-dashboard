// src/components/PlatformContainer.jsx
import React from 'react';
import { Box, Grid } from '@mui/material';
import UserDetails from './UserDetails';
import AccountStats from './AccountStats';
import ComparisonChart from './ComparisonChart';
import UserBox from './UserBox';

const PlatformContainer = ({ platformData }) => {
  // Define platform colors
  const COLOR = (platform) => {
    switch (platform) {
      case 'Facebook':
        return '#3b5998';
      case 'Instagram':
        return '#E1306C';
      case 'Twitter':
        return '#1DA1F2';
      case 'YouTube':
        return '#FF0000';
      default:
        return 'black';
    }
  };

  // Get the color for the current platform
  const platformColor = COLOR(platformData.platform);

  return (
    <Box>
    <Grid sx={{display:"flex",gap:2}}>
        <UserDetails platform={platformData.platform} details={platformData.userDetails} color={platformColor}/>
        <Grid>
            <UserBox stats={platformData.accountStats} color={platformColor}/>
            <AccountStats stats={platformData.accountStats}  color={platformColor}/>
        </Grid>
        
    </Grid>
    
    
    <ComparisonChart totals={platformData.totals}  color={platformColor}/>
  </Box>
  );
};

export default PlatformContainer;
