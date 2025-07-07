import React from 'react';
import Grid from "@mui/material/Grid2";
import AppHeader from "../components/AppHeader";
import Dashboard from '../components/dashboard/Dashboard';
import { MenuProvider } from '../contexts/MenuContext';
const DashboardPage = () => {
    return (
        <MenuProvider>
            <Grid>
                <AppHeader />
                <Dashboard />
            </Grid>
        </MenuProvider>
    );
};

export default DashboardPage;
