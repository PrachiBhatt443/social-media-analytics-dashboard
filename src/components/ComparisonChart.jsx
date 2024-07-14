// src/components/ComparisonChart.jsx
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComparisonChart = ({ totals }) => {
  const data = {
    labels: ['Total Stories', 'Total Follows', 'Total Posts', 'Total Saves', 'Total Comments', 'Total Shares'],
    datasets: [
      {
        label: 'Totals',
        data: [totals.totalStories, totals.totalFollows, totals.totalPosts, totals.totalSaves, totals.totalComments, totals.totalShares],
        backgroundColor: '#3f51b5',  // Change color as needed
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Metrics',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Count',
        },
      },
    },
  };

  return (
    <Card sx={{ mb: 2, p: 2, boxShadow: 2 }}>
      {/* <CardContent> */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Comparison Chart
        </Typography>
        <Box sx={{ height: 400 }}>
          <Bar data={data} options={options} />
        </Box>
      {/* </CardContent> */}
    </Card>
  );
};

export default ComparisonChart;
