import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import styled from '@emotion/styled';
import { Color } from '@/styles/color';

type TProps = {
  isCard: string;
  isText: string;
  isMode: string;
  setIsCard: React.Dispatch<React.SetStateAction<string>>;
  setIsText: React.Dispatch<React.SetStateAction<string>>;
  setIsMode: React.Dispatch<React.SetStateAction<string>>;
};

export const TierController = ({
  isCard,
  isText,
  isMode,
  setIsCard,
  setIsText,
  setIsMode,
}: TProps) => {
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCard(event.target.value);
  };
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsText(event.target.value);
  };
  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMode(event.target.value);
  };

  return (
    <S.Controller>
      <FormControl>
        <FormLabel id="form-group-label">Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="form-group-label"
          defaultValue={isCard}
          name="form-group"
          value={isCard}
          onChange={handleFormChange}
          sx={{
            '& .MuiRadio-root': {
              color: Color.Gray300,
              '&.Mui-checked': {
                color: Color.Primary,
              },
            },
          }}>
          <FormControlLabel value="image" control={<Radio />} label="SIMPLE" />
          <FormControlLabel value="card" control={<Radio />} label="CARD" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="text-group-label">Tier Text</FormLabel>
        <RadioGroup
          row
          aria-labelledby="text-group-label"
          defaultValue={isText}
          name="text-group"
          value={isText}
          onChange={handleTextChange}
          sx={{
            '& .MuiRadio-root': {
              color: Color.Gray300,
              '&.Mui-checked': {
                color: Color.Primary,
              },
            },
          }}>
          <FormControlLabel value="exist" control={<Radio />} label="EXIST" />
          <FormControlLabel value="delete" control={<Radio />} label="DELETE" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="mode-group-label">Background</FormLabel>
        <RadioGroup
          row
          aria-labelledby="mode-group-label"
          defaultValue={isMode}
          name="mode-group"
          value={isMode}
          onChange={handleModeChange}
          sx={{
            '& .MuiRadio-root': {
              color: Color.Gray300,
              '&.Mui-checked': {
                color: Color.Primary,
              },
            },
          }}>
          <FormControlLabel value="light" control={<Radio />} label="LIGHT" />
          <FormControlLabel value="dark" control={<Radio />} label="DARK" />
        </RadioGroup>
      </FormControl>
    </S.Controller>
  );
};

const S = {
  Controller: styled.div`
    margin-top: 10px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    width: 55%;

    > div {
      display: flex;
      flex-direction: column;
      align-items: start;

      > label {
        font-size: 12px;
      }

      > div {
        display: flex;
        width: 100%;
        flex-direction: column;
      }
    }
  `,
};
