'use client';

import styled from '@emotion/styled';

import { Title } from '@/components/common/Title';
import { Color } from '@/styles/color';
import noticeData from '../../data/notice.json';

type TNotice = {
  id: number;
  title: string;
  content: string;
  isNew: boolean;
  date: string;
};

export default function NoticePage() {
  return (
    <S.Wrapper>
      <Title title="Notice" />
      <S.NoticeWrap>
        {noticeData?.map((notice: TNotice) => (
          <li key={notice.id}>
            <div>
              <div>
                {notice.isNew && <i>New</i>} <span>{notice.title}</span>
              </div>
              <small>{notice.date}</small>
            </div>
            <p>{notice.content}</p>
          </li>
        ))}
      </S.NoticeWrap>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    width: 60%;
    margin: 0 auto;
  `,
  NoticeWrap: styled.ul`
    margin: 0 auto;
    padding: 40px 0;

    li {
      border: 1px solid ${Color.Gray200};
      border-radius: 12px;
      background-color: ${Color.White};
      padding: 30px;
      position: relative;
      margin-bottom: 20px;

      i {
        color: ${Color.Red100};
        font-weight: 600;
        font-size: 12px;
      }

      &:last-child {
        margin: 0;
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        > div {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          > span {
            font-size: 16px;
            margin-left: 6px;
            font-weight: 600;
          }
        }
      }

      > p {
        margin-top: 20px;
        font-size: 14px;
        background-color: ${Color.Bg100};
        border: 1px solid ${Color.Gray200};
        padding: 20px;
        border-radius: 12px;
        white-space: pre-wrap;
        line-height: 1.5;
      }
    }
  `,
};
