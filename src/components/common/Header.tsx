'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoginIcon from '@mui/icons-material/Login';

import { Color } from '@/styles/color';
import { Logo } from '@/components/common/Logo';

interface Props {
  window?: () => Window;
}

const drawerWidth = 250;

export const Header = (props: Props) => {
  const { window } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left' }}>
      <Box sx={{ padding: 2 }}>
        <Logo />
      </Box>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon style={{minWidth: "30px"}}>
            <LoginIcon />
          </ListItemIcon>
          <ListItemButton sx={{ textAlign: 'left' }}>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemIcon style={{minWidth: "30px"}}>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemButton sx={{ textAlign: 'left' }}>
            <ListItemText primary="Language" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemIcon style={{minWidth: "30px"}}>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemButton sx={{ textAlign: 'left' }}>
            <ListItemText primary="GitHub" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  // pc
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar component="nav" style={{background: Color.Primary, padding: "0 10px"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex-box space-between">
            <Logo />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <IconButton
                sx={{ color: '#fff' }}
                onClick={() => router.push('https://github.com/git-tiers/gittiers')}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                sx={{ color: '#fff', margin: '0 10px' }}
                onClick={() => {}}
              >
                <LanguageIcon />
              </IconButton>
              <Button
                sx={{ color: '#fff' }}
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}