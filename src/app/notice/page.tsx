'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsIcon from '@mui/icons-material/Notifications';

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
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(noticeData.length > 0 ? [noticeData[0].id] : [])
  );

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <S.Wrapper>
      <Title
        title="Notice"
        icon={<NotificationsIcon style={{ fontSize: '24px' }} />}
      />
      <S.NoticeWrap>
        {noticeData?.map((notice: TNotice) => (
          <S.NoticeItem key={notice.id} $isOpen={openItems.has(notice.id)}>
            <S.NoticeHeader onClick={() => toggleItem(notice.id)}>
              <S.TitleSection>
                <span
                  style={{
                    display: 'block',
                    width: '30px',
                    color: Color.Gray300,
                  }}>
                  {notice.id + 1}
                </span>
                {notice.isNew && <S.NewBadge>New</S.NewBadge>}
                <S.NoticeTitle $isOpen={openItems.has(notice.id)}>
                  {notice.title}
                </S.NoticeTitle>
              </S.TitleSection>
              <S.HeaderRight>
                <S.NoticeDate>{notice.date}</S.NoticeDate>
                <S.IconWrapper>
                  {openItems.has(notice.id) ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </S.IconWrapper>
              </S.HeaderRight>
            </S.NoticeHeader>
            <S.NoticeContent $isOpen={openItems.has(notice.id)}>
              <S.ContentInner>{notice.content}</S.ContentInner>
            </S.NoticeContent>
          </S.NoticeItem>
        ))}
      </S.NoticeWrap>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    width: 60%;
    margin: 30px auto;
  `,

  NoticeWrap: styled.ul`
    margin: 0 auto;
    padding: 40px 0;
  `,

  NoticeItem: styled.li<{ $isOpen: boolean }>`
    border-bottom: 1px solid ${Color.Gray200};
    background-color: ${Color.White};
    overflow: hidden;
    transition: all 0.2s ease;

    &:last-child {
      margin-bottom: 0;
    }

    ${({ $isOpen }) =>
      $isOpen &&
      `
      border-color: ${Color.Primary || '#1976d2'};
    `}
  `,

  NoticeHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${Color.Bg200 || '#f5f5f5'};
    }
  `,

  TitleSection: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  NewBadge: styled.span`
    color: ${Color.Red100};
    font-weight: 600;
    font-size: 12px;
    background-color: ${Color.Red100}10;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid ${Color.Red100}30;
  `,

  NoticeTitle: styled.span<{ $isOpen: boolean }>`
    font-size: 16px;
    font-weight: 600;
    color: ${({ $isOpen }) => ($isOpen ? Color.Primary : Color.Black)};
  `,

  HeaderRight: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  NoticeDate: styled.small`
    color: ${Color.Gray300 || '#666'};
    font-size: 14px;
  `,

  IconWrapper: styled.div`
    display: flex;
    align-items: center;
    color: ${Color.Gray300 || '#666'};
    transition: transform 0.2s ease;
  `,

  NoticeContent: styled.div<{ $isOpen: boolean }>`
    overflow: hidden;
    transition:
      max-height 0.3s ease,
      padding 0.3s ease;
    max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  `,

  ContentInner: styled.p`
    font-size: 14px;
    white-space: pre-wrap;
    line-height: 1.5;
    margin: 0;
    padding: 10px 10px 20px;
    color: ${Color.Black || '#555'};
  `,
};
