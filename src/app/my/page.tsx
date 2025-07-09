'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import { Color } from '@/styles/color';
import { Title } from '@/components/common/Title';
import { Profile } from '@/components/pages/my/Profile';
import { MakeTier } from '@/components/pages/my/MakeTier';

export default function MyPage() {
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  return (
    <S.Wrapper>
      <Title
        title="My Page"
        icon={<PersonRoundedIcon style={{ fontSize: '36px' }} />}
      />
      <S.FlexBox>
        <Profile />
        <MakeTier />
      </S.FlexBox>
    </S.Wrapper>
  );
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
    margin-top: 10px;

    > div {
      &:first-of-type {
        width: auto;
      }

      &:last-child {
        width: 70%;
      }
    }
  `,
  ProfileImg: styled(Avatar)`
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid ${Color.Primary};

    img {
      width: 100%;
      height: 100%;
    }
  `,
};
