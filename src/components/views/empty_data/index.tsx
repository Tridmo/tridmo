import SimpleTypography from '@/components/typography'
import { Box, SxProps, styled } from '@mui/material'
import Image from 'next/image'
import React, { ReactElement } from 'react'

interface Props {
  containerHeight?: string;
  boxShadow?: boolean;
  border?: boolean;
  sx?: SxProps;
  text?: string;
  button?: ReactElement;
}

export default function EmptyData({ boxShadow = true, border = true, ...props }: Props) {

  const Container = styled(Box)(
    () => `
            width: 100%;
            min-height: ${props?.containerHeight ? props?.containerHeight : '274px'};
            display: flex;
            align-items: center;
            justify-content: center;
            ${border ? 'border: 1px solid #F5F5F5;' : ''}
            ${boxShadow ? 'box-shadow: 0px 2px 18px 0px #00000012 inset;' : ''}
        `
  )

  return (
    <Container sx={{ ...props?.sx }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image priority width={props?.button ? 120 : 160} height={props?.button ? 120 : 160} alt='box' src='/img/empty-box.svg' />
        <SimpleTypography
          sx={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '22px',
            color: '#686868',
            textAlign: 'center',
          }}
          text={props?.text || 'Это место пусто'} />
        {
          props?.button &&
          <Box sx={{ mt: '24px' }}>
            {props?.button}
          </Box>
        }
      </Box>
    </Container>
  )
}