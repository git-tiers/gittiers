import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';

import { Color } from '@/styles/color';
import TierFlow from '@/assets/images/tier-flow.png';

export const FlowCont = () => {
  return (
    <S.FlowCont>
      <h3>TIER Step</h3>
      <div className="img-wrap">
        <Image src={TierFlow} alt="flow-img" />
      </div>
      <p>
        The more active you are in contributing to GitHub, the higher your tier
        will rise.
        <br />
        Contributions include commits, creating issues, pull requests, code
        reviews, and writing wikis.
      </p>
      <Link
        href="https://github.com/git-tiers/gittiers?tab=readme-ov-file#tier-table"
        rel="noopener noreferrer"
        target="_blank">
        <Button startIcon={<ArticleIcon />} variant="contained">
          Tiers Table
        </Button>
      </Link>
    </S.FlowCont>
  );
};

const S = {
  FlowCont: styled.div`
    padding: 150px 0;
    background-color: ${Color.Primary3};

    h3 {
      font-size: 50px;
      margin-bottom: 50px;
    }

    .img-wrap {
      margin: 0 auto;
      width: 22%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    p {
      margin: 50px 0;
      font-size: 18px;
      line-height: 1.5;
    }

    button {
      background-color: ${Color.Primary};
      width: 260px;
      padding: 10px 0;
      font-size: 18px;
    }
  `,
};
