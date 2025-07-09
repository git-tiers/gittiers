import React from 'react';
import styled from '@emotion/styled';

import { Color } from '@/styles/color';

export const Footer = () => {
  return (
    <S.Footer>
      <p>
        Git TIERS <span>by devwoodie</span>
      </p>
    </S.Footer>
  );
};

const S = {
  Footer: styled.div`
    background-color: ${Color.Black};
    padding: 30px 0;
    color: ${Color.White};

    p {
      font-size: 24px;

      span {
        font-size: 16px;
      }
    }
  `,
};
