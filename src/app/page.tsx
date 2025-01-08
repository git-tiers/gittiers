'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styled from '@emotion/styled';

import ChallengerIcon from '@/assets/images/tiers/9_challenger.png';
import { Color } from '@/styles/color';

export default function MainPage() {
  const { data: session } = useSession();

  return (
    <S.Wrapper>
      <Image src={ChallengerIcon} alt="tier-icon" width={130} height={130} />
      <h2><small>Get</small> Tier<br/><small>on</small> GitHub</h2>
      <h4>
        Prove your skills with daily commits.<br/>
        The more commits you make on GitHub, the more splendid your tier becomes.
      </h4>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    width: 70%;
    margin: 30px auto;
    text-align: center;
    h2{
      font-size: 72px;
      line-height: 1.1;
      color: ${Color.Primary};
      small{
        font-size: 62px;
        color: ${Color.Black};
      }
    }
    h4{
      font-weight: normal;
      line-height: 1.5;
      margin-top: 20px;
    }
  `,
}
