import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';

import { Color } from '@/styles/color';

export const HowToCont = () => {
  return (
    <S.HowToCont>
      <h3>How To Use</h3>
      <ul>
        <li>1. Check your tier on the My Page after log in.</li>
        <li>2. Set the font and background color, then click Save Image.</li>
        <li>
          3. Click the Copy Code button, then attach the copied code to GitHub
          README.
        </li>
        <li>4. Check the updated screen.</li>
      </ul>
      <Link
        href="https://github.com/git-tiers/gittiers?tab=readme-ov-file#how-to-use"
        rel="noopener noreferrer"
        target="_blank">
        <Button startIcon={<InfoIcon />} variant="contained">
          How To Use
        </Button>
      </Link>
    </S.HowToCont>
  );
};

const S = {
  HowToCont: styled.div`
    background-color: ${Color.Bg200};
    padding: 150px 0;

    h3 {
      font-size: 50px;
      margin-bottom: 50px;
    }

    ul {
      margin-bottom: 50px;

      li {
        font-size: 20px;
        margin-bottom: 20px;
      }
    }

    img {
      display: block;
      margin: 0 auto;
    }

    button {
      background-color: ${Color.Primary};
      margin-top: 60px;
      width: 260px;
      padding: 10px 0;
      font-size: 18px;
    }
  `,
};
