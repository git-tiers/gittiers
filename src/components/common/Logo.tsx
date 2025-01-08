import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

export const Logo = () => {

  const router = useRouter();

  return(
    <S.Logo onClick={() => router.push('/')}>Git TIERS</S.Logo>
  )
}

const S = {
  Logo: styled.h1`
    font-size: 24px;
    cursor: pointer;
  `
}