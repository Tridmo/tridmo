import React from 'react';
import {
  Button,
  CircularProgress,
  SxProps,
  styled,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import '@/styles/buttons.module.scss'
// import styled from '@emotion/styled';
import { ThemeProps } from '@/types/theme';
import CustomCircularProgress from '../circular_progress';
import { ButtonStyles } from '../../styles/styles';


const ButtonWrapper = styled(Button)(
  ({ theme }: ThemeProps) => ButtonStyles(theme)
)

type ButtonsProps = {
  id?: string,
  name?: string,
  sx?: SxProps,
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] | "button",
  className?: string,
  children?: any,
  disabled?: boolean,
  startIcon?: boolean,
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  endIcon?: string,
  bgColor?: string,
  childrenFirst?: boolean,
  loadingColor?: string,
  noLoadingMargin?: boolean,
};

export default function Buttons({ childrenFirst, ...props }: ButtonsProps) {

  return (
    <ButtonWrapper
      id={props?.id}
      className={`MuiButton-${props?.className}`}
      sx={{
        ...props?.sx,
        background: props?.bgColor,
        ":hover": { background: props?.bgColor },
        '& > .MuiButton-startIcon': {
          display: 'inherit',
          marginRight: '0px',
          marginLeft: '0px',
        }
      }}
      onClick={props?.onClick}
      startIcon={props?.startIcon ? <CustomCircularProgress sx={{}} size="1rem" color={props?.loadingColor} /> : null}
      endIcon={
        props?.endIcon === "right" ? <ArrowForwardIcon /> :
          props?.endIcon === "left" ? <ArrowBackIcon /> :
            props?.endIcon === "cart" ? <ShoppingCartCheckoutIcon /> :
              props?.endIcon === "checkout" ? <OpenInNewIcon /> : null
      }
      disabled={props?.disabled}
      type={props?.type}
    >
      {childrenFirst && !props?.startIcon && props?.children}
      {props?.startIcon && props?.className === 'confirm__btn' ? props?.startIcon : props?.name}
      {!childrenFirst && !props?.startIcon && props?.children}
    </ButtonWrapper >
  );
};
