import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { getContributeCount } from '@/utils/github';
import styled from '@emotion/styled';
import { Title } from '@/components/common/Title';

export const MakeTier = () => {

  const { data: session } = useSession();
  const [contributeCount, setContributeCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGithubData = async () => {
    if(session?.accessToken && session?.loginId){
      setLoading(true);
      const res = await getContributeCount({
        accessToken: session?.accessToken,
        loginId: session?.loginId
      });
      setLoading(false);
      if(res === "ERROR"){
        return toast.error("An error occurred. Please try again later.");
      }
      setContributeCount(res);
    }
  }

  useEffect(() => {
    handleGithubData();
  }, [session?.accessToken]);

  return(
    <S.Wrapper>
      <p>Total Contributions: <b>{contributeCount}</b></p>

    </S.Wrapper>
  )
}

const S = {
  Wrapper: styled.div`
      text-align: center;
    p{
      font-size: 20px;
    }
  `,
}