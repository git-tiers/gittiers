'use client';

import React from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { Color } from '@/styles/color';
import ChallengerIcon from '@/assets/images/tiers/9_challenger.png';
import { FlowCont } from '@/components/organisms/main/FlowCont';
import { HowToCont } from '@/components/organisms/main/HowToCont';
import { Footer } from '@/components/common/Footer';

export default function MainPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGitLogin = async () => {
    await signIn('github', { callbackUrl: '/my' });
  };

  return (
    <S.Wrapper>
      <Image src={ChallengerIcon} alt="tier-icon" width={130} height={130} />
      <h2>
        <small>Get</small> TIER
        <br />
        <small>on</small> GitHub
      </h2>
      <h4>
        Prove your skills with daily commits.
        <br />
        The more commits you make on GitHub, the more splendid your tier
        becomes.
      </h4>
      {session ? (
        <Button
          className="main-button"
          startIcon={<AccountBoxIcon />}
          onClick={() => router.push('/my')}
          variant="contained">
          My Page
        </Button>
      ) : (
        <Button
          className="main-button"
          onClick={handleGitLogin}
          variant="contained">
          Login
        </Button>
      )}
      <FlowCont />
      <HowToCont />
      <Footer />
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    margin: 50px auto 0;
    text-align: center;

    h2 {
      font-size: 78px;
      line-height: 1.1;
      color: ${Color.Primary};

      small {
        font-size: 64px;
        color: ${Color.Black};
      }
    }

    h4 {
      font-weight: normal;
      line-height: 1.5;
      margin-top: 50px;
      font-size: 20px;
    }

    .main-button {
      margin: 100px 0;
      background-color: ${Color.Black};
      width: 260px;
      padding: 10px 0;
      font-size: 18px;
    }

    img {
      object-fit: contain;
      width: 100%;
    }
  `,
};
