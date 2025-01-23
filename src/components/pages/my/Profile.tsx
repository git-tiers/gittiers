import { signOut, useSession } from 'next-auth/react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogoutIcon from '@mui/icons-material/Logout';

import { Color } from '@/styles/color';
import Link from 'next/link';

export const Profile = () => {

  const { data: session } = useSession();

  const handleGitLogout = async () => {
    await signOut();
  }

  return (
    <S.Wrap>
      <S.ProfileImg alt="profile-image" src={session?.user.image} />
      <p>{session?.user.name || ''}</p>
      <h5>{session?.loginId || ''}</h5>
      <span>{session?.user.bio || '-'}</span>
      <S.SmallBox>
        <span><ApartmentIcon /> {session?.user.company || '-'}</span>
        <span><AlternateEmailIcon /> {session?.user.email || '-'}</span>
        <span><LocationOnIcon /> {session?.user.location || '-'}</span>
      </S.SmallBox>
      <S.ButtonWrap>
        <Link href={`https://github.com/${session?.loginId}`} target="_blank" rel="noopener noreferrer">
          <Button startIcon={<GitHubIcon />} variant="contained" color="primary" >My GitHub</Button>
        </Link>
        <Button startIcon={<LogoutIcon />}  variant="outlined" onClick={handleGitLogout}>Logout</Button>
      </S.ButtonWrap>
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div`
    p{
      font-size: 24px;
      margin-top: 20px;
      font-weight: 600;
    }
    h5{
      font-size: 20px;
      margin-top: 10px;
      font-weight: 400;
    }
    > span{
      font-size: 16px;
      margin-top: 30px;
      display: block;
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
  `,
  SmallBox: styled.div`
    margin-top: 30px;
    span{
      font-size: 12px;
      margin-top: 8px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      svg{
        font-size: 16px;
        margin-right: 8px;
      }
    }
  `,
  ButtonWrap: styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    button{
      width: 100%;
    }
    > button{
      margin-top: 10px;
    }
  `
}
