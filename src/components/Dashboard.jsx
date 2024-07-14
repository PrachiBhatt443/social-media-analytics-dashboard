import React, { useEffect, useState } from 'react';
import { Box, Grid ,Typography} from '@mui/material';
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
      {/* {error ? (
        <p>{error}</p>
      ) : (
        <Box sx={{
          // display:'flex',
          flex: '1 1 calc(100% - 16px)', // 2 items per row
          boxSizing: 'border-box',
          maxWidth: 'calc(50% - 40px)',
          mb: 2,
        }}>
            {platformData.map((data, index) => (
              <PlatformContainer key={index} platformData={data} />
            ))}
      
        </Box>
      )} */}
    {error ? (
        <Typography variant="h6" color="error">{error}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: 2 }}>
          {platformData && platformData.length > 0 ? (
            platformData.map((data, index) => (
              <Box
                key={index}
                sx={{
                  flex: '1 1 calc(50% - 16px)', // 2 items per row
                  boxSizing: 'border-box',
                  maxWidth: 'calc(50% - 16px)',
                  mb: 2,
                }}
              >
                <PlatformContainer key={index} platformData={data} />
              </Box>
            ))
          ) : (
            <Typography variant="h6">No data available</Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default Dashboard;
