"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Grid, List, styled, ListItem } from '@mui/material';
import Image from 'next/image';
import Buttons from '../../../buttons';
import { useDispatch, useSelector } from 'react-redux';
import { setShowImageViewer, setShowInteriorImagesModal, setShowModelsModal } from '../../../../data/loader'
import { Box, SxProps } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IMAGES_BASE_URL } from '../../../../utils/env_vars';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';


const myLoader = () => {
  return `/img/card-loader.jpg`
}

const SimpleListItem = styled(ListItem)(
  ({ theme }) => `
      width: 56px;
      height: 56px;   
      border: 1px solid #e0e0e0;
      padding: 0;
      &.MuiListItem-slider__item--active{
          border-color: #7210be;
      }

      &.MuiListItem-slider__big--item{
          width: 100vw;
          height: 100dvh;   
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
      }
`
);

const SimpleImage = styled(Image)(
  ({ theme }) => `
          cursor: zoom-in;
          position: relative !important;
          inset: 0px;
          box-sizing: border-box;
          padding: 0px;
          border: none;
          margin: auto;
          display: block;
          width: 100%;
          height: 100%;
          min-width: 100%;
          max-width: 100%;
          min-height: 100%;
          max-height: 100%;
          object-fit: contain;
  `
)

const fakeModelImages = [1, 2, 3, 4, 5]

const SimpleSlider = ({ mainWidth, images }: { images: any[]; mainWidth: number }) => {
  const [sliderBtnHover, setSliderBtnHover] = useState(0)
  const dispatch = useDispatch<any>()
  const simple_model_status = useSelector((state: any) => state?.get_one_model?.status);
  const selectedSlide = useSelector((state: any) => state?.loader?.selected_interior_image);
  const matches = useMediaQuery('(max-width:600px)');

  const [sliderCount, setSliderCount] = React.useState(selectedSlide)
  const [sliderTransition, setSliderTransition] = React.useState(0.4)
  const show = useSelector((state: any) => state?.loader?.show_image_viewer)

  function SliderRightHandler() {
    if (sliderCount < images?.length - 2) {
      setSliderCount(sliderCount + 1)
    }
  }

  function SliderLeftHandler() {
    if (sliderCount >= 1) {
      setSliderCount(sliderCount - 1)
    }
  }

  const ButtonHover = {
    opacity: sliderBtnHover
  }

  function showViewer(image) {
    // dispatch(setShowInteriorImagesModal(false))
    dispatch(setShowImageViewer(true, image))
  }

  if ("succeeded") {
    return (
      <>
        <Grid
          sx={{
            width: '100vw',
            height: '100dvh',
            display: "flex",
            flexDirection: "column-reverse"
          }
          }
          item
          md={12}
          xs={12}
          className="products__slider"
        >

          <Grid
            sx={{
              padding: "0 !important",
              overflow: "hidden"
            }}
            item
            xs={12}
            md={12}
            onMouseEnter={() => setSliderBtnHover(1)}
            onMouseLeave={() => setSliderBtnHover(0)}
          >
            {/* <Box sx={ButtonHover}> */}
            <Buttons
              onClick={SliderRightHandler}
              type="button"
              className="slider__right--arrow"
              name=""
            >
              <NavigateNext sx={{ color: '#424242' }} />
            </Buttons>
            {/* </Box> */}
            {/* <Box sx={ButtonHover}> */}
            <Buttons
              onClick={SliderLeftHandler}
              type="button"
              className="slider__left--arrow"
              name=""
            >
              <NavigateBefore sx={{ color: '#424242' }} />
            </Buttons>
            {/* </Box> */}
            <List sx={{
              transform: `translateX(-${sliderCount * 100}vw)`,
              padding: "0 !important",
              display: "flex",
              position: 'relative',
              width: `calc(100vw * ${images.length})`,
              transition: `all ${sliderTransition}s ease`
            }}>
              {
                images?.map((slide: any, index: number) => (
                  <SimpleListItem
                    className="MuiListItem-slider__big--item"
                    onClick={(e) => { dispatch(setShowModelsModal(true)) }}
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        width: '90%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <SimpleImage
                        onClick={() => showViewer(slide)}
                        alt=''
                        layout='fill'
                        sx={{ objectFit: 'contain' }}
                        src={`${IMAGES_BASE_URL}/${slide?.image_src}`}
                        priority={true}
                      />
                    </Box>
                  </SimpleListItem>
                ))
              }

            </List>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default SimpleSlider