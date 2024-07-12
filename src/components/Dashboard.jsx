import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Tooltip,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8080/api/users/1');
                setUser(userResponse.data);

                const analyticsResponse = await axios.get('http://localhost:8080/api/analytics/1');
                setAnalytics(analyticsResponse.data);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error: {error.message}</Typography>;
    }

    if (!user || !analytics) {
        return <Typography>No data available</Typography>;
    }

    return (
        <DashboardContainer maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                {user.name}'s Dashboard
            </Typography>

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
                                                <Tooltip title="Active Promotions">
                                                    <CampaignIcon sx={{ mr: 1, color: 'success.main' }} />
                                                </Tooltip>
                                                Active Promotions
                                            </Typography>
                                            <Typography variant="h5">{analytics.activePromotions}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <AnimatedCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <Tooltip title="Total Follows">
                                                    <PeopleIcon sx={{ mr: 1, color: 'info.main' }} />
                                                </Tooltip>
                                                Total Follows
                                            </Typography>
                                            <Typography variant="h5">{analytics.totalFollows}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <AnimatedCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <Tooltip title="Total Posts">
                                                    <PostAddIcon sx={{ mr: 1, color: 'info.main' }} />
                                                </Tooltip>
                                                Total Posts
                                            </Typography>
                                            <Typography variant="h5">{analytics.totalPosts}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <AnimatedCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <Tooltip title="Total Saves">
                                                    <SaveIcon sx={{ mr: 1, color: 'info.main' }} />
                                                </Tooltip>
                                                Total Saves
                                            </Typography>
                                            <Typography variant="h5">{analytics.totalSaves}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <AnimatedCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                <Tooltip title="Total Comments">
                                                    <CommentIcon sx={{ mr: 1, color: 'info.main' }} />
                                                </Tooltip>
                                                Total Comments
                                            </Typography>
                                            <Typography variant="h5">{analytics.totalComments}</Typography>
                                        </CardContent>
                                    </AnimatedCard>
                                </Grid>
                                {/* Add more metrics as needed */}
                            </Grid>
                        </CardContent>
                    </AnimatedCard>
                </Grid>
            </Grid>
        </DashboardContainer>
    );
};

export default Dashboard;
