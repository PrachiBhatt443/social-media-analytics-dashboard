// src/components/PlatformContainer.jsx
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import UserDetails from './UserDetails';
import AccountStats from './AccountStats';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const PlatformBox = ({ platform, details, stats }) => {
  // Chart data
  const chartData = {
    labels: ['Total Stories', 'Total Follows', 'Total Posts', 'Total Saves', 'Total Comments', 'Total Shares'],
    datasets: [
      {
        label: 'Total Metrics',
        data: [
          stats.totalStories,
          stats.totalFollows,
          stats.totalPosts,
          stats.totalSaves,
          stats.totalComments,
          stats.totalShares,
        ],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Total Metrics for ${platform}`,
        position: 'top',
      },
    },
  };

  return (
    <Box sx={{ mb: 3 }}>
      <UserDetails platform={platform} details={details} />
      <AccountStats stats={stats} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ p: 2, boxShadow: 2, borderRadius: 2, backgroundColor: '#fff' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Total Metrics Chart
            </Typography>
            <Line data={chartData} options={chartOptions} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlatformBox;
