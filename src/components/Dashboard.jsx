import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; 
import { keyframes } from '@emotion/react'; 
import styled from '@emotion/styled';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Tooltip,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
} from '@mui/material';
import {
    AccountCircle as AccountCircleIcon,
    Category as CategoryIcon,
    Info as InfoIcon,
    Link as LinkIcon,
    People as PeopleIcon,
    PostAdd as PostAddIcon,
    BarChart as BarChartIcon,
    Campaign as CampaignIcon,
    Share as ShareIcon,
    Comment as CommentIcon,
    Save as SaveIcon,
    ThumbUp as ThumbUpIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title);

// Keyframes for animation
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

// Styled components
const AnimatedCard = styled(Card)`
    animation: ${fadeIn} 0.5s ease-in-out;
    background-color: #f7f7f7; // Sober background color
    margin-bottom: 1rem;
`;

const DashboardContainer = styled(Container)`
    margin-top: 4rem;
    background-color: #fff;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.span`
    margin-right: 1rem;
    color: ${(props) => props.color};
`;

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(1); // Default user ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user information
                const userResponse = await axiosInstance.get(`/api/users/${selectedUserId}`);
                setUser(userResponse.data);

                // Fetch analytics data
                const analyticsResponse = await axiosInstance.get(`/api/analytics/${selectedUserId}`);
                setAnalytics(analyticsResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedUserId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error: {error.message}</Typography>;
    }

    if (!user || !analytics) {
        return <Typography>No data available</Typography>;
    }

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Followers Over Time',
                data: [100, 200, 150, 300, 250, 400, 350], // Example data
                fill: false,
                backgroundColor: '#1E88E5',
                borderColor: '#1E88E5',
            },
        ],
    };

    return (
        <DashboardContainer maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                {user.name}'s Dashboard
            </Typography>
            
            <FormControl fullWidth margin="normal">
                <InputLabel id="user-select-label">Select User</InputLabel>
                <Select
                    labelId="user-select-label"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                >
                    <MenuItem value={1}>User 1</MenuItem>
                    <MenuItem value={2}>User 2</MenuItem>
                    {/* Add more users here */}
                </Select>
            </FormControl>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <AnimatedCard>
                        <CardHeader
                            title="User Information"
                            subheader="Details about the user"
                            avatar={<AccountCircleIcon />}
                        />
                        <CardContent>
                            <Typography variant="h6" color="text.primary">
                                <IconWrapper color="primary.main">
                                    <CategoryIcon />
                                </IconWrapper>
                                Category: {user.category}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                                <IconWrapper color="primary.main">
                                    <InfoIcon />
                                </IconWrapper>
                                Bio: {user.bio}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                                <IconWrapper color="primary.main">
                                    <LinkIcon />
                                </IconWrapper>
                                Links: <a href={user.links} target="_blank" rel="noopener noreferrer">{user.links}</a>
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                                <IconWrapper color="primary.main">
                                    <PeopleIcon />
                                </IconWrapper>
                                Followers: {user.followers}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                                <IconWrapper color="primary.main">
                                    <PeopleIcon />
                                </IconWrapper>
                                Following: {user.following}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                                <IconWrapper color="primary.main">
                                    <PostAddIcon />
                                </IconWrapper>
                                Posts: {user.posts}
                            </Typography>
                        </CardContent>
                    </AnimatedCard>
                </Grid>

                <Grid item xs={12} md={8}>
                    <AnimatedCard>
                        <CardHeader
                            title="Analytics Overview"
                            subheader="Metrics for the user"
                            avatar={<BarChartIcon />}
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <AnimatedCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <Tooltip title="Account Reach">
                                                    <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                                                </Tooltip>
                                                Account Reach
                                            </Typography>
                                            <Typography variant="h5">{analytics.accountReach}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <AnimatedCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <Tooltip title="Account Engagement">
                                                    <ThumbUpIcon sx={{ mr: 1, color: 'secondary.main' }} />
                                                </Tooltip>
                                                Account Engagement
                                            </Typography>
                                            <Typography variant="h5">{analytics.accountEngagement}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <AnimatedCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <Tooltip title="Content Shared">
                                                    <ShareIcon sx={{ mr: 1, color: 'info.main' }} />
                                                </Tooltip>
                                                Content Shared
                                            </Typography>
                                            <Typography variant="h5">{analytics.contentShared}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <AnimatedCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <Tooltip title="Ads Run">
                                                    <CampaignIcon sx={{ mr: 1, color: 'warning.main' }} />
                                                </Tooltip>
                                                Ads Run
                                            </Typography>
                                            <Typography variant="h5">{analytics.adsRun}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <AnimatedCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <Tooltip title="New Comments">
                                                    <CommentIcon sx={{ mr: 1, color: 'error.main' }} />
                                                </Tooltip>
                                                New Comments
                                            </Typography>
                                            <Typography variant="h5">{analytics.newComments}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <AnimatedCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <Tooltip title="Saved Posts">
                                                    <SaveIcon sx={{ mr: 1, color: 'text.primary' }} />
                                                </Tooltip>
                                                Saved Posts
                                            </Typography>
                                            <Typography variant="h5">{analytics.savedPosts}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </AnimatedCard>
                </Grid>

                {/* Example Graph */}
                <Grid item xs={12}>
                    <AnimatedCard>
                        <CardHeader
                            title="Follower Growth"
                            subheader="Growth of followers over the past months"
                            avatar={<BarChartIcon />}
                        />
                        <CardContent>
                            <Line data={chartData} />
                        </CardContent>
                    </AnimatedCard>
                </Grid>
            </Grid>
        </DashboardContainer>
    );
};

export default Dashboard;
