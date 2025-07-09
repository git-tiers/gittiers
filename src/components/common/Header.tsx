'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GitHubIcon from '@mui/icons-material/GitHub';

import { Color } from '@/styles/color';
import { Logo } from '@/components/common/Logo';

export const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userImg, setUserImg] = useState<string>('');

  const handleGitLogin = async () => {
    await signIn('github', { callbackUrl: '/my' });
  };

  const handleNotice = () => {
    router.push('/notice');
  };

  const handleMyPage = () => {
    router.push('/my');
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLogin(true);
      if (session) {
        setUserImg(session?.user?.image);
      }
    } else {
      setIsLogin(false);
    }
  }, [status]);

  // pc
  return (
    <S.Header>
      <CssBaseline />
      <AppBar
        component="nav"
        style={{
          background: Color.White,
          padding: '4px 10px',
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 6px',
        }}>
        <Toolbar>
          <div className="flex-box space-between">
            <Logo />
            <S.Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {/*notification*/}
              <IconButton onClick={handleNotice}>
                <Badge badgeContent={1} color="error">
                  <NotificationsIcon sx={{ color: Color.Black }} />
                </Badge>
              </IconButton>

              {/*github*/}
              <Link
                href="https://github.com/git-tiers/gittiers?tab=readme-ov-file#git-tiers"
                rel="noopener noreferrer"
                target="_blank">
                <IconButton>
                  <GitHubIcon sx={{ color: Color.Black }} />
                </IconButton>
              </Link>
              {/*language*/}
              {/*<IconButton*/}
              {/*  onClick={() => {}}*/}
              {/*>*/}
              {/*  <LanguageIcon />*/}
              {/*</IconButton>*/}
              {/*login*/}
              {isLogin ? (
                <IconButton onClick={handleMyPage}>
                  <Avatar alt="user-profile" src={userImg} />
                </IconButton>
              ) : (
                <Button onClick={handleGitLogin} style={{ color: 'black' }}>
                  Login
                </Button>
              )}
            </S.Box>
          </div>
        </Toolbar>
      </AppBar>
    </S.Header>
  );
};

const S = {
  Header: styled(Box)``,
  Box: styled(Box)`
    > button {
      color: #fff;
      margin-right: 10px;

      &:last-child {
        margin: 0;
      }
    }

    > a {
      button {
        color: #fff;
        margin-right: 10px;
      }
    }
  `,
};
