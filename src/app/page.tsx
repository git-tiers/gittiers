'use client';

import styled from '@emotion/styled';

import { Color } from '@/styles/color';

export default function MainPage() {
  return (
    <S.Wrapper>
      <h1>Git Tiers</h1>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    position: relative;
    width: 100vw;
    min-height: 100vh;
    background-color: ${Color.Bg100};
  `,
}
