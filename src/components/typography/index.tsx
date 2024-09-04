"use client"

import { ThemeProps } from '@/types/theme';
import { SxProps, Typography, styled } from '@mui/material';
import React from 'react'
import { TypographyStyles } from '../../styles/styles';

type TypographyProps = {
  text: string,
  sx?: SxProps,
  variant?: any,
  className?: string,
  classNames?: string,
  id?: string,
  title?: string,
  children?: any,
  paragraph?: any,
};

const TypographyWrapper = styled(Typography)(
  // text-transform: capitalize;
  ({ theme }: ThemeProps) => TypographyStyles(theme)
);

const SimpleTypography = (props: TypographyProps) => {
  return (
    // <Button className={`${classes.styles} MuiButton-text-${props.color} MuiButton-bg-${props.color}`}>{props?.name}</Button>
    <TypographyWrapper
      sx={{ ...props?.sx }}
      className={props?.className ? `MuiTypography-${props?.className}` : `${props?.classNames || ''}`}
      variant={props?.variant}
      paragraph={props?.paragraph}
      title={props?.title || ''}
    >
      {props?.text}
      {props?.children}
    </TypographyWrapper>
  )
}

export default SimpleTypography