'use client';

import { useSession, signOut } from 'next-auth/react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { Color } from '@/styles/color';

export default function myPage() {

  const { data: session } = useSession();

  const handleGitLogout = async () => {
    await signOut();
  }

  return(
    <S.Wrap>
      <Button onClick={handleGitLogout}>Logout</Button>
    </S.Wrap>
  )
}

const S = {
  Wrap: styled.div`

  `
}
