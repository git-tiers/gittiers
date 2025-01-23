'use client';

import styled from '@emotion/styled';

import { Color } from '@/styles/color';

type TProps = {
  title: string;
}

export const Title = ({
  title
}: TProps) => {
  return(
    <S.Title>{title}</S.Title>
  )
}

const S = {
  Title: styled.h3`
    font-size: 28px;
    color: ${Color.Black}
  `
}