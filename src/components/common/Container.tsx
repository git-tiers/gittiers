'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';

import { Color } from '@/styles/color';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return(
    <Box component="main">
      <S.Inner>
        <Toolbar />
        {children}
      </S.Inner>
    </Box>
  )
}

const S = {
  Inner: styled.div`
    position: relative;
    padding: 32px 0 0;
    min-height: 100vh;
    background-color: ${Color.Bg100};
  `
}
