import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import axios from '../utils/axiosInstance'; // import your axios instance
import PlatformContainer from './PlatformContainer';

const Dashboard = () => {
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

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <Box sx={{ display: 'flex', gap: 9 }}>
          {platformData.map((data, index) => (
            <PlatformContainer key={index} platformData={data} />
          ))}
        </Box>
      )}
    </>
  );
};

export default Dashboard;
