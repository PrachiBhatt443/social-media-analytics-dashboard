import React from 'react';
import { Box, Card, CardContent, Typography, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

// Define the styles for the card
const statsCardStyles = (color) => ({
  marginBottom: 2,
  boxShadow: 2,
  borderRadius: 2,
  padding: 2,
  border: `2px solid ${color}`  // Add color prop to dynamically set the border color
});

const AccountStats = ({ stats, color }) => (
  <Box>
    <Divider sx={{ my: 2 }} />
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
      Account Insights
    </Typography>
    <Card sx={statsCardStyles(color)}>
      <CardContent>
        <Typography variant="body1">
          <strong>Followers:</strong> 
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <CountUp end={stats.followers} duration={2} />
          </motion.span>
        </Typography>
        <Typography variant="body1">
          <strong>Account Reach:</strong> {stats.accountReach}
        </Typography>
        <Typography variant="body1">
          <strong>Account Engagement:</strong> {stats.engagement}
        </Typography>
        <Typography variant="body1">
          <strong>Content Shared:</strong> {stats.contentShared}
        </Typography>
        <Typography variant="body1">
          <strong>Ads Run:</strong> {stats.adsRun}
        </Typography>
        <Typography variant="body1">
          <strong>Active Promotions:</strong> {stats.activePromotions}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default AccountStats;
