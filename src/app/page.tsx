'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InfoIcon from '@mui/icons-material/Info';

import { Color } from '@/styles/color';
import ChallengerIcon from '@/assets/images/tiers/9_challenger.png';
import SampleImg1 from '@/assets/images/sample-img1.png';
import SampleImg2 from '@/assets/images/sample-img2.png';
import TierFlow from '@/assets/images/tier-flow.png';
import HowToUse from '@/assets/images/how-to-use-img1.png';

export default function MainPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGitLogin = async () => {
    await signIn('github', {callbackUrl: '/my'});
  }

  return (
    <S.Wrapper>
      <Image src={ChallengerIcon} alt="tier-icon" width={130} height={130} />
      <h2><small>Get</small> TIER<br/><small>on</small> GitHub</h2>
      <h4>
        Prove your skills with daily commits.<br/>
        The more commits you make on GitHub, the more splendid your tier becomes.
      </h4>
      {session ?
        <Button className="main-button" startIcon={<AccountBoxIcon />} onClick={() => router.push('/my')} variant="contained" >My Page</Button> :
        <Button className="main-button" onClick={handleGitLogin} variant="contained" >Login</Button>
      }

      <S.MainCont>
        <h3>TIER Type</h3>
        <div>
          <h6>Simple Type</h6>
          <p>Simple Type is only show the <u>Tier Image</u> and <u>Tier Text.</u></p>
          <Image src={SampleImg2} alt="sample-img2" />
        </div>
        <div>
          <h6>Card Type</h6>
          <p>Card Type is shows <u>GitHub ID</u> and <u>Total Contributions.</u></p>
          <Image src={SampleImg1} alt="sample-img1" />
        </div>
      </S.MainCont>

      <S.FlowCont>
        <h3>TIER Step</h3>
        <div className="img-wrap">
          <Image src={TierFlow} alt="flow-img" />
        </div>
        <p>
          The more active you are in contributing to GitHub, the higher your tier will rise.<br/>
          Contributions include commits, creating issues, pull requests, code reviews, and writing wikis.
        </p>
        <Link href="https://github.com/git-tiers/gittiers?tab=readme-ov-file#tier-table" rel="noopener noreferrer" target="_blank">
          <Button startIcon={<ArticleIcon />} variant="contained">Tiers Table</Button>
        </Link>
      </S.FlowCont>

      <S.HowToCont>
        <h3>How To Use</h3>
        <ul>
          <li>1. Check your tier on the My Page after log in.</li>
          <li>2. Set the type and background color, then download the image.</li>
          <li>3. Attach the downloaded image to your GitHub README.</li>
          <li>4. Verify the updated display.</li>
        </ul>
        <Image src={HowToUse} alt="how-to-use-img" />
        <Link href="https://github.com/git-tiers/gittiers?tab=readme-ov-file#how-to-use" rel="noopener noreferrer" target="_blank">
          <Button startIcon={<InfoIcon />} variant="contained">How To Use</Button>
        </Link>
      </S.HowToCont>
      <S.Footer>
        <p>Git TIERS <span>by devwoodie</span></p>
      </S.Footer>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    margin: 50px auto 0;
    text-align: center;
    h2{
      font-size: 78px;
      line-height: 1.1;
      color: ${Color.Primary};
      small{
        font-size: 64px;
        color: ${Color.Black};
      }
    }
    h4{
      font-weight: normal;
      line-height: 1.5;
      margin-top: 50px;
      font-size: 20px;
    }
    .main-button{
      margin-top: 100px;
      background-color: ${Color.Primary};
      width: 260px;
      padding: 10px 0;
      font-size: 18px;
    }
  `,
  MainCont: styled.div`
    background-color: ${Color.Primary2};
    padding: 150px 0;
    margin-top: 150px;
    h3{
      font-size: 50px;
      margin-bottom: 100px;
    }
    > div{
      margin-bottom: 100px;
      &:last-child{
        margin: 0;
      }
      h6{
        font-size: 28px;
        color: ${Color.Primary};
      }
      p{
        font-size: 18px;
        margin: 22px 0;
        u{
          color: ${Color.Primary};      
        }
      }
    }
  `,
  FlowCont: styled.div`
    padding: 150px 0;
    h3{
      font-size: 50px;
      margin-bottom: 50px;
    }
    .img-wrap{
      margin: 0 auto;
      width: 22%;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    p{
      margin: 50px 0;
      font-size: 18px;
      line-height: 1.5;
    }
    button{
      background-color: ${Color.Primary};
      width: 260px;
      padding: 10px 0;
      font-size: 18px;
    }
  `,
  HowToCont: styled.div`
    background-color: ${Color.Primary3};
    padding: 100px 0;
    h3{
      font-size: 50px;
      margin-bottom: 50px;
    }
    ul{
      li{
        font-size: 20px;
        margin-bottom: 20px;
      }
    }
    img{
      display: block;
      margin: 0 auto;
      border: 2px solid ${Color.Black};
      border-radius: 12px;
    }
    button{
      background-color: ${Color.Primary};
      margin-top: 50px;
      width: 260px;
      padding: 10px 0;
      font-size: 18px;
    }
  `,
  Footer: styled.div`
    background-color: ${Color.Black};
    padding: 30px 0;
    color: ${Color.White};
    p{
      font-size: 24px;
      span{
        font-size: 16px;
      }
    }
  `
}
