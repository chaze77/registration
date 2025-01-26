import { useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import SideBar from '@/components/dashboard/SideBar';
import TopBar from '@/components/dashboard/TopBar';
import { Outlet } from 'react-router-dom';

import useAuthStore from '@/store/useAuthStore';

const DashboardLayout = () => {
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [fetchUser, user]);

  return (
    <Grid
      container
      sx={{
        height: '100vh',
      }}
    >
      {/* Sidebar */}
      <Grid
        size={2}
        sx={{
          backgroundColor: '#002f62',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <SideBar />
      </Grid>

      {/* Main Area (TopBar + Content) */}
      <Grid
        container
        direction='column'
        sx={{
          flex: 1,
        }}
      >
        {/* TopBar */}
        <Grid>
          <TopBar user={user} />
        </Grid>

        {/* Content */}
        <Grid
          sx={{
            flex: 1,
            backgroundColor: 'white',
            padding: 2,
            border: `10px solid lightgray`,
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
