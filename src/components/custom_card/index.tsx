import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, styled, Paper } from '@mui/material';
import Image from 'next/image';
import SimpleTypography from '../typography';
import Link from 'next/link';
import { ThemeProps } from '../../types/theme';
import { LazyLoadImage } from "react-lazy-load-image-component";

type InputProps = {
  item?: object,
};

const CustomBoxWrapper = styled(Box)(
  ({ theme }) =>
    `
      img {
        margin: 0;
        padding: 12px;
        margin-bottom: 4px;
        objec-fit:cover;
      }
    `
);
type CustomCardProps = {
  type?: any,
  model?: any,
  link?: any,
  img_height?: any,
}

function CustomCard({ type, model, link, img_height }: CustomCardProps) {

  const Label = styled(Paper)(({ theme }: ThemeProps) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }));

  const BoxStyle = {
    height: "280px",
    width: "100%",
    border: " 1px solid #e0e0e0",
    background: "#fff",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.4s ease",
    padding: "12px 12px 0 12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }

  const InteriorsBoxStyle = {
    height: "auto",
    width: "100%",
    border: " 1px solid #e0e0e0",
    background: "#fff",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.4s ease",
    padding: "12px 12px 0 12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }

  if (type === "interiors") {

    return (
      <Link key={model?.id} href={link ? link : ""} style={{ margin: '0 0 15px 0', textDecoration: "none" }}>
        <Box sx={InteriorsBoxStyle}>
          <SimpleTypography text='Интерьер' className='card__sale' />
          <LazyLoadImage
            src={`${model?.cover[0]?.image?.src}`}
            alt="Model"
            effect="blur"
            width={"100%"}
            placeholderSrc={"/img/card-loader.jpg"}
            height={img_height || `208px`}
            delayTime={500}
            style={{ objectFit: "cover" }}
          />
          <Label
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "13px 13px"
            }}
          >
            <SimpleTypography
              text={model?.name}
              className='card__title'
            />
          </Label>
        </Box>
      </Link>
    )
  }

  return (
    <Link key={model?.id} href={link ? link : ""} style={{ margin: '0 0 15px 0', textDecoration: "none" }}>
      <Box sx={BoxStyle}>
        <LazyLoadImage
          src={`${model?.cover[0]?.image?.src}`}
          alt="Model"
          effect="blur"
          width={"100%"}
          placeholderSrc={"/img/card-loader.jpg"}
          height={"208px !important"}
          delayTime={500}
          style={{ objectFit: "cover" }}
        />
        <Label
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "13px 13px"
          }}
        >
          <SimpleTypography
            text={model?.name}
            className='card__title'
          />
          <SimpleTypography
            text={`${model?.brand?.name}`}
            className='card__title-brand'
          />
        </Label>
      </Box>
    </Link>
  )
}



export default CustomCard