'use client';

import styled from '@emotion/styled';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function MainPage() {
  const { data: session } = useSession();

  const fetchGitHubData = async () => {
    if (!session?.accessToken) return;

    const res = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const repos = await res.json();
    console.log(repos);
  }

  // useEffect(() => {
  //   fetchGitHubData()
  // }, [session]);
  return (
    <S.Wrapper>
      contents
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`

  `,
}
