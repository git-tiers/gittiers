import React from 'react';
import { useSession } from 'next-auth/react';

import styled from '@emotion/styled';
import { Color } from '@/styles/color';
import { getTierBg } from '@/utils/getTierBg';

type TProps = {
  isMode: string;
  isCard: string;
  isText: string;
  tierImage: string;
  tierText: string;
  contributeCount: number;
};

export const TierImage = ({
  isMode,
  isCard,
  isText,
  tierImage,
  tierText,
  contributeCount,
}: TProps) => {
  const { data: session } = useSession();

  return (
    <div style={{ minHeight: '220px' }}>
      <div>
        <S.ImgWrap id="tierCard" form={isCard} text={isText} mode={isMode}>
          <div>
            {tierImage && <img src={tierImage} alt="tier-image" />}
            {isText === 'exist' && isCard === 'image' && (
              <span>{tierText}</span>
            )}
          </div>
          {isCard === 'card' && (
            <div className="right">
              {isText === 'exist' && <p className="tier-text">{tierText}</p>}
              <p className="login-id">{session?.loginId}</p>
              <p className="total">
                Total Contributions <b>{contributeCount || 0}</b>
              </p>
              <p className="footer">Created by Git TIERS</p>
            </div>
          )}
        </S.ImgWrap>
      </div>
    </div>
  );
};

const S = {
  ImgWrap: styled.div<{ form?: string; text?: string; mode?: string }>`
    color: ${(props) => (props.mode === 'light' ? '#0d1117' : '#ffffff')};
    background-color: ${(props) => getTierBg(props.mode || 'light')};
    min-width: 170px;
    min-height: 170px;
    border: 1px solid ${Color.Gray300};
    border-color: ${(props) =>
      props.mode === 'light' ? '#0d1117' : '#ffffff'};
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    img {
      width: 130px;
    }

    span {
      display: block;
      font-weight: 600;
      font-size: 14px;
    }

    .right {
      text-align: left;
      margin-left: 30px;

      p {
        font-size: 14px;
        margin-bottom: 6px;
      }

      p.tier-text {
        font-size: 14px;
        font-weight: 600;
      }

      p.login-id {
        font-size: 20px;
        font-weight: 600;
      }

      p.total {
        margin-top: 20px;
      }

      p.footer {
        position: absolute;
        right: 30px;
        bottom: 14px;
        font-size: 10px;
        font-weight: 300;
      }
    }
  `,
};
