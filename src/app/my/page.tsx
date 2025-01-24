'use client';

import { useSession } from 'next-auth/react';
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';

import { Color } from '@/styles/color';
import { Title } from '@/components/common/Title';
import { Profile } from '@/components/pages/my/Profile';
import { MakeTier } from '@/components/pages/my/MakeTier';

export default function myPage() {

  return(
    <S.Wrapper>
      <Title title="My Page" />
      <S.FlexBox>
        <Profile />
        <MakeTier />
      </S.FlexBox>
    </S.Wrapper>
  )
}

const S = {
  Wrapper: styled.div`
    width: 80%;
    margin: 0 auto;
  `,
  FlexBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 50px;
    > div{
      &:first-of-type{width: auto;}
      &:last-child{width: 70%;}
    }
  `,
  ProfileImg: styled(Avatar)`
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid ${Color.Primary};
    img{
      width: 100%;
      height: 100%;
    }
  `
}
