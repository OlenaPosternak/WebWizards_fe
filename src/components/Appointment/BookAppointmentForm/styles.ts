import styled from 'styled-components';
import {
  BORDER,
  DARK_BLUE,
  BLACK,
  PINK_SWAN,
  WHITE,
  NAVY_BLUE,
  CORNFLOWER_BLUE,
} from '@constants/colors';
import { XS_FONT_SIZE } from '@constants/fontSizes';
import FONT_ROBOTO from '@constants/fonts';

export const FormWrapper = styled.div`
  text-align: center;
  font-family: ${FONT_ROBOTO};
`;

export const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1.5px solid ${BORDER};
  margin-bottom: 16px;
`;

export const Text = styled.p`
  color: ${DARK_BLUE};
  font-weight: 100;
  font-style: italic;
`;

export const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const BntWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
`;
export const StepBtn = styled.button`
  :disabled {
    background: ${PINK_SWAN};
    color: ${WHITE};
    cursor: inherit;
  }
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px 14px 8px 8px;
  border-radius: 8px;
  font-family: ${FONT_ROBOTO};
  border: none;
  height: 36px;
  /* width: 112px; */

  line-height: 1.42;
  color: ${WHITE};
  font-size: ${XS_FONT_SIZE};
  font-weight: bold;
  cursor: pointer;
  /* background: ${PINK_SWAN}; */
  text-decoration: none;

  background: -webkit-linear-gradient(${NAVY_BLUE}, ${CORNFLOWER_BLUE});
`;

export const FormFooter = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormInfo = styled.div`
  text-align: left;
  border-left: 2px solid ${BLACK};
  padding-left: 7px;
`;

export const YouSelected = styled.p`
  font-weight: 500;
  font-size: ${XS_FONT_SIZE};
  width: max-content;
`;

export const SelectedDayTime = styled.p`
  width: max-content;
  font-weight: 100;
  font-style: italic;
  font-size: ${XS_FONT_SIZE};
`;
