import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import html2canvas from "html2canvas";
import styled from '@emotion/styled';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';

import { getContributeCount } from '@/utils/github';
import { getTierImage, getTierText } from '@/utils/getTier';
import { Color } from '@/styles/color';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const MakeTier = () => {
  const { data: session } = useSession();
  const [contributeCount, setContributeCount] = useState<number>(0);
  const [tierImage, setTierImage] = useState<string>('');
  const [tierText, setTierText] = useState<string>('');
  const [isCard, setIsCard] = useState<string>("card");
  const [isText, setIsText] = useState<string>("exist");
  const [isMode, setIsMode] = useState<string>("light");
  const [loading, setLoading] = useState<boolean>(true);

  const handleGithubData = async () => {
    if(session?.accessToken && session?.loginId){
      setLoading(true);
      const res = await getContributeCount({
        accessToken: session?.accessToken,
        loginId: session?.loginId
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
      if(res === "ERROR"){
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return toast.error("An error occurred. Please try again later.");
      }
      setContributeCount(res);
    }
  }

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCard(event.target.value);
  };
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsText(event.target.value);
  };
  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMode(event.target.value);
  };

  const handleDownload = async () => {
    const element = document.getElementById("tierCard");
    if (!element) return;
    const canvas = await html2canvas(element, {
      scrollX: 0,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    });
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${session?.loginId}-tiers.png`;
    link.click();
  };

  useEffect(() => {
    handleGithubData();
  }, [session?.accessToken]);

  useEffect(() => {
    if(contributeCount){
      const imgUrl = getTierImage(contributeCount);
      const text = getTierText(contributeCount);
      setTierImage(imgUrl);
      setTierText(text);
    }
  }, [contributeCount]);

  return(
    <S.Wrapper>
      <p>Total Contributions: <b>{contributeCount || 0}</b></p>
      <S.TierWrap>
        <div style={{minHeight: "220px"}}>
          <div id="tierCard" style={{backgroundColor: isMode === "light" ? "#ffffff" : "#0d1117"}}>
            <S.ImgWrap form={isCard} text={isText} mode={isMode}>
              <div>
                {tierImage && <img src={tierImage} alt="tier-image" />}
                {(isText === "exist" && isCard === "image") && <span>{tierText}</span>}
              </div>
              {isCard === "card" &&
                <div className="right">
                  {isText === 'exist' && <p className="tier-text">{tierText}</p>}
                  <p className="login-id">{session?.loginId}</p>
                  <p className="total">Total Contributions <b>{contributeCount || 0}</b></p>
                  <p className="footer">Created by Git TIERS</p>
                </div>
              }
          </S.ImgWrap>
          </div>
        </div>
        <S.Controller>
          <FormControl>
            <FormLabel id="form-group-label">Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="form-group-label"
              defaultValue="card"
              name="form-group"
              value={isCard}
              onChange={handleFormChange}
            >
              <FormControlLabel value="image" control={<Radio />} label="SIMPLE" />
              <FormControlLabel value="card" control={<Radio />} label="CARD" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="text-group-label">Tier Text</FormLabel>
            <RadioGroup
              row
              aria-labelledby="text-group-label"
              defaultValue="exist"
              name="text-group"
              value={isText}
              onChange={handleTextChange}
            >
              <FormControlLabel value="exist" control={<Radio />} label="EXIST" />
              <FormControlLabel value="delete" control={<Radio />} label="DELETE" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="mode-group-label">Background</FormLabel>
            <RadioGroup
              row
              aria-labelledby="mode-group-label"
              defaultValue="light"
              name="mode-group"
              value={isMode}
              onChange={handleModeChange}
            >
              <FormControlLabel value="light" control={<Radio />} label="LIGHT" />
              <FormControlLabel value="dark" control={<Radio />} label="DARK" />
            </RadioGroup>
          </FormControl>
        </S.Controller>
      </S.TierWrap>
      <S.ButtonWrap>
        <Button startIcon={<DownloadIcon />} variant="contained" onClick={handleDownload}>Image Download</Button>
        <Link href="https://github.com/git-tiers/gittiers?tab=readme-ov-file#tier-table" rel="noopener noreferrer" target="_blank">
          <Button startIcon={<ArticleIcon />} variant="outlined">Tiers Table</Button>
        </Link>
      </S.ButtonWrap>

      <LoadingSpinner loading={loading} />
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
  TierWrap: styled.div`
    margin: 30px auto 0;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    #tierCard{
      padding: 5px;
    }
  `,
  ImgWrap: styled.div<{ form?: string, text?: string, mode?: string }>`
    color: ${(props) => props.mode === "light" ? "#0d1117" : "#ffffff"};
    background-color: ${(props) => props.mode === "light" ? "#ffffff" : "#0d1117"};
    min-width: 170px;
    min-height: 170px;
    border: 2px solid ${Color.Gray300};
    border-color: ${(props) => props.mode === "light" ? "#0d1117" : "#ffffff"};
    border-radius: 12px;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    img{
      width: 130px;
    }
    span{
      display: block;
      font-weight: 600;
      font-size: 14px;
    }
    .right{
      text-align: left;
      margin-left: 30px;
      p{
        font-size: 14px;
        margin-bottom: 6px;
      }
      p.tier-text{
        font-size: 14px;
        font-weight: 600;  
      }
      p.login-id{
        font-size: 20px;
        font-weight: 600;
      }
      p.total{
        margin-top: 20px;
      }
      p.footer{
        position: absolute;
        right: 30px;
        bottom: 14px;
        font-size: 10px;
        font-weight: 300;
      }
    }
  `,
  CardWrap: styled.div`
    border: 2px solid ${Color.Gray300};
    border-radius: 12px;
    padding: 20px 30px;
    img{
      width: 130px;
    }
    span{
      display: block;
      font-weight: 600;
      font-size: 14px;
    }
  `,
  Controller: styled.div`
    margin-top: 20px;
    text-align: left;
    > div{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 14px;
      &:last-child{
        margin: 0;
      }
      > label{
        width: 120px;
      }
    }
  `,
  ButtonWrap: styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    > button{
      margin: 0 5px;
    }
  `
}