import SimpleTypography from '@/components/typography'
import { Box, styled } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface Props {
    containerHeight?: string;
}

export default function EmptyData(props: Props) {

    const Container = styled(Box)(
        () => `
            width: 100%;
            min-height: ${props?.containerHeight ? props?.containerHeight : '274px'};
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #F5F5F5;
            box-shadow: 0px 2px 18px 0px #00000012 inset;
        `
    )

    return (
        <Container>
            <Box>
                <Image width={160} height={160} alt='box' src='/img/empty-box.svg' />
                <SimpleTypography
                    sx={{
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '22px',
                        color: '#686868',
                        textAlign: 'center',
                    }}
                    text='Это место пусто' />
            </Box>
        </Container>
    )
}