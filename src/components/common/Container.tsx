'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';

import { Color } from '@/styles/color';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return(
    <Box component="main">
      <Toolbar />
      <S.Inner>
        {children}
      </S.Inner>
    </Box>
  )
}

const S = {
  Inner: styled.div`
    padding: 32px;
    position: relative;
    min-height: 100vh;
    background-color: ${Color.Bg100};
  `
}