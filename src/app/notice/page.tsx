'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';

import { Title } from '@/components/common/Title';
import { Color } from '@/styles/color';
import noticeData from "../../data/notice.json";

type TNotice = {
  title: string;
  content: string;
  isNew: boolean;
  date: string;
}

export default function NoticePage() {

  return(
    <S.Wrapper>
      <Title title="Notice" />
      <S.NoticeWrap>
        {noticeData?.map((notice: TNotice) => (
          <li>
            <div>
              <div><span>{notice.title}</span> {notice.isNew && <Chip label="N" color="error" />}</div>
              <small>{notice.date}</small>
            </div>
            <p>{notice.content}</p>
          </li>
        ))}
      </S.NoticeWrap>
    </S.Wrapper>
  )
}

const S = {
  Wrapper: styled.div`
      width: 40%;
      margin: 0 auto;
  `,
  NoticeWrap: styled.ul`
    margin: 60px auto 0;
    li {
      border: 1px solid ${Color.Gray200};
      border-radius: 12px;
      background-color: ${Color.White};
      padding: 30px;
      position: relative;
      margin-bottom: 20px;
      &:last-child{
        margin: 0;
      }
      > div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          > span{
            font-size: 20px;   
            margin-right: 10px;
            font-weight: 600;
          }
        }
      }
      > p{
        margin-top: 20px;
        background-color: ${Color.Bg100};
        border: 1px solid ${Color.Gray200};
        padding: 30px;
        border-radius: 12px;
        white-space: pre-wrap;
        line-height: 1.5;
      }
    }
  `
}
