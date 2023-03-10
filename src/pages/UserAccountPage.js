import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Tab, Tabs, Box } from '@mui/material';
// routes
import { useNavigate, useOutletContext } from 'react-router-dom';
import { PATH_PAGE } from '../routes/paths';
// components
import Iconify from '../components/iconify';
import CustomBreadcrumbs from '../components/custom-breadcrumbs';
import { useSettingsContext } from '../components/settings';
// sections
import { AccountGeneral, AccountChangePassword } from '../sections/account';
// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState('general');
  const navigate = useNavigate();
  const [count, setCount] = useOutletContext();

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate(PATH_PAGE.home)
    }
  }, [navigate])

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral setCount={setCount} />,
    },
    {
      value: 'change_password',
      label: 'Change password',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <>
      <Helmet>
        <title> User: Account Settings | English learn</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Account"
          links={[{ name: 'Home', href: PATH_PAGE.home }, { name: 'Account Settings' }]}
        />

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
