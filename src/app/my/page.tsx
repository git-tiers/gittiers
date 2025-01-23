'use client';

import { useSession } from 'next-auth/react';
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';

import { Color } from '@/styles/color';
import { Title } from '@/components/common/Title';
import { Profile } from '@/components/pages/my/Profile';

export default function myPage() {

  const { data: session } = useSession();

  console.log(session)
  return(
    <S.Wrap>
      <Title title="My Page" />
      <S.FlexBox>
        <Profile />
        <div>
d
        </div>
      </S.FlexBox>
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div`
    width: 80%;
    margin: 0 auto;
  `,
  FlexBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 50px;
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
