import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import LinkIcon from '@mui/icons-material/Link';
import SaveIcon from '@mui/icons-material/Save';
import ArticleIcon from '@mui/icons-material/Article';
import { doc, setDoc } from 'firebase/firestore';

import { getContributeCount } from '@/utils/github';
import { getTierImage, getTierText } from '@/utils/getTier';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { firestore } from '../../../../firebase/firebase';
import { TierImage } from '@/components/organisms/my/TierImage';
import { TierController } from '@/components/organisms/my/TierController';

export const MakeTier = () => {
  const { data: session } = useSession();
  const [contributeCount, setContributeCount] = useState<number>(0);
  const [tierImage, setTierImage] = useState<string>('');
  const [tierText, setTierText] = useState<string>('');
  const [isCard, setIsCard] = useState<string>('card');
  const [isText, setIsText] = useState<string>('exist');
  const [isMode, setIsMode] = useState<string>('light');
  const [loading, setLoading] = useState<boolean>(true);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [userImageUrl, setUserImageUrl] = useState<string>('');

  const handleGithubData = async () => {
    if (session?.accessToken && session?.loginId) {
      setLoading(true);
      const res = await getContributeCount({
        accessToken: session?.accessToken,
        loginId: session?.loginId,
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
      if (res === 'ERROR') {
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return toast.error('An error occurred. Please try again later.');
      }
      setContributeCount(res);
    }
  };

  const handleSaveImage = async () => {
    if (!session?.loginId) {
      toast.error('Please log in first.');
      return;
    }

    setSaveLoading(true);
    try {
      const element = document.getElementById('tierCard');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
        scale: 1, // 스케일을 1로 제한해서 크기 줄이기
        useCORS: true,
      });

      const base64Image = canvas.toDataURL('image/jpeg', 0.8); // 80% 품질로 압축

      const imageSizeInBytes = (base64Image.length * 3) / 4;
      if (imageSizeInBytes > 900000) {
        toast.error('Image is too large. Please try with simpler settings.');
        return;
      }

      const userRef = doc(firestore, 'users', session.loginId);
      await setDoc(
        userRef,
        {
          tierImageBase64: base64Image,
          lastUpdated: new Date().toISOString(),
          imageSettings: {
            isCard,
            isText,
            isMode,
            contributeCount,
          },
        },
        { merge: true }
      );

      const baseUrl = window.location.origin;
      setUserImageUrl(`${baseUrl}/api/tier/${session.loginId}`);

      toast.success('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error('Failed to save image. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (userImageUrl) {
      navigator.clipboard.writeText(
        `<a href="https://github.com/git-tiers/gittiers"><img src="${userImageUrl}" alt="Git-TIERS" /></a>`
      );
      toast.success('Image tag copied to clipboard!');
    }
  };

  useEffect(() => {
    handleGithubData();
  }, [session?.accessToken]);

  useEffect(() => {
    if (contributeCount) {
      const imgUrl = getTierImage(contributeCount);
      const text = getTierText(contributeCount);
      setTierImage(imgUrl);
      setTierText(text);
    }
  }, [contributeCount]);

  useEffect(() => {
    if (session?.loginId) {
      const baseUrl = window.location.origin;
      setUserImageUrl(`${baseUrl}/api/tier/${session.loginId}`);
    }
  }, [session?.loginId]);

  return (
    <S.Wrapper>
      <p>
        Total Contributions: <b>{contributeCount || 0}</b>
      </p>
      <S.TierWrap>
        <TierImage
          isMode={isMode}
          isCard={isCard}
          isText={isText}
          tierImage={tierImage}
          tierText={tierText}
          contributeCount={contributeCount}
        />
        <TierController
          isCard={isCard}
          isText={isText}
          isMode={isMode}
          setIsCard={setIsCard}
          setIsText={setIsText}
          setIsMode={setIsMode}
        />
      </S.TierWrap>
      {userImageUrl && (
        <Button
          startIcon={<LinkIcon />}
          size="medium"
          onClick={copyToClipboard}>
          Copy Tag
        </Button>
      )}
      <S.ButtonWrap>
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={handleSaveImage}
          disabled={saveLoading}
          color="primary">
          {saveLoading ? 'Saving...' : 'Save Image'}
        </Button>
        <Link
          href="https://github.com/git-tiers/gittiers?tab=readme-ov-file#tier-table"
          rel="noopener noreferrer"
          target="_blank">
          <Button startIcon={<ArticleIcon />} variant="outlined">
            Tiers Table
          </Button>
        </Link>
      </S.ButtonWrap>

      <LoadingSpinner loading={loading} />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    text-align: center;

    p {
      font-size: 20px;
    }
  `,
  TierWrap: styled.div`
    margin: 30px auto 0;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    #tierCard {
      padding: 5px;
    }
  `,

  ButtonWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  `,
};
