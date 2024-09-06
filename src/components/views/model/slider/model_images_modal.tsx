import React, { useEffect, useRef, useState } from 'react'
import { Grid, List, styled, ListItem, Breadcrumbs } from '@mui/material';
import Image from 'next/image';
import Buttons from '../../../buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getOneModel, selectOneModel } from '../../../../data/get_one_model';
import { setShowModelsModal } from '../../../../data/loader'
import { Box, SxProps } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import SimpleTypography from '../../../typography';
import { sampleModel } from '@/data/samples/sample_model';
import { IMAGES_BASE_URL } from '../../../../utils/env_vars';
import { selectMyProfile } from '../../../../data/me';
import instance from '../../../../utils/axios';
import { setLoginState, setOpenModal, setProjectsListState } from '../../../../data/modal_checker';
import { toast } from 'react-toastify';
import { getSavedModels } from '../../../../data/get_saved_models';

const mainWidth = 720;

const CustomListItem = styled(ListItem)(
  ({ theme }) => `
        width: 56px;
        height: 56px;   
        border: 1px solid #e0e0e0;
        padding: 0;
        cursor: pointer;

        &.MuiListItem-slider__item--active{
            border-color: #7210be;
        }
  `
);

const SimpleImage = styled(Image)(
  ({ theme }) => `
            position: absolute;
            inset: 0px;
            box-sizing: border-box;
            padding: 0px;
            border: none;
            margin: auto;
            display: block;
            width: 0px;
            height: 0px;
            min-width: 100%;
            max-width: 100%;
            min-height: 100%;
            max-height: 100%;
            object-fit: contain;
    `
)
const myLoader = () => {
  return `/img/card-loader.jpg`
}

const fakeModelImages = [1, 2, 3, 4, 5]

export default function SimpleSliderModal() {
  const [sliderBtnHover, setSliderBtnHover] = useState(0)
  const dispatch = useDispatch<any>()

  const simpleModel = useSelector(selectOneModel);
  const currentUser = useSelector(selectMyProfile);
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const simple_model_status = useSelector((state: any) => state?.get_one_model?.status);

  const matches = useMediaQuery('(max-width:600px)');
  const imageResizeLg = useMediaQuery('(max-width:1440px)');
  const imageResizeSm = useMediaQuery('(max-width:1060px)');
  const imageResizeXs = useMediaQuery('(max-width:768px)');
  const imageResizeXxs = useMediaQuery('(max-width:660px)');
  const imageResizeXxxs = useMediaQuery('(max-width:600px)');
  const imageResizeXxxxs = useMediaQuery('(max-width:540px)');
  const imageResizeXxxxxs = useMediaQuery('(max-width:460px)');
  const [sliderCount, setSliderCount] = React.useState(0)
  const [sliderTransition, setSliderTransition] = React.useState(0.4)
  const [isSaved, setIsSaved] = useState<any>(false)

  const wdth =
    imageResizeXxxxxs ? 360
      : imageResizeXxxxs ? 420
        : imageResizeXxxs ? 480
          : imageResizeXxs ? 540
            : imageResizeXs ? 600
              : imageResizeSm ? 660
                : imageResizeLg ? 720
                  : 1200;

  const CustomListItemBig = styled(ListItem)(
    ({ theme }) => `
                      width: 100%;
                      height: ${wdth}px;
                      border: none;
                `
  );

  useEffect(() => {
    if (simpleModel && isAuthenticated && currentUser) {
      setIsSaved(simpleModel?.is_saved)
    }
  }, [isAuthenticated, currentUser, simpleModel])

  function SliderRightHandler() {
    if (sliderCount < simpleModel?.images?.length - 1) {
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

  if (simple_model_status == "succeeded") {
    return (
      <>
        <Grid
          sx={{
            width: '100%',
            display: "flex",
            flexDirection: "column-reverse"
          }}
          item
          spacing={1}
          className="products__slider"
        >
          <Grid
            className='products__small--wrap'
            sx={{
              padding: "11px !important",
              display: "flex",
              justifyContent: "center"
            }}
            item
            xs={12}
            md={12}
          >
            <List
              className='products__small-items'
              sx={{ display: `${"flex"}`, paddingTop: 0 }}
            >
              {
                simpleModel?.images?.map((slide: any, index: number) => (
                  <CustomListItem
                    sx={{ margin: "0 8px 0 0" }}
                    className={`${sliderCount == index ? "MuiListItem-slider__item--active products__small--item" : "products__small--item"}`}
                    onClick={() => setSliderCount(index)}
                    key={index}
                  >
                    <Image
                      width={56}
                      height={56}
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                      priority={true}
                      alt="slider"
                      src={`${IMAGES_BASE_URL}/${slide?.image_src}`}
                    />
                  </CustomListItem>
                ))
              }

            </List>
          </Grid>

          <Grid
            sx={{
              padding: "0 !important",
              overflow: "hidden"
            }}
            item
            md={12}
            xs={12}
            onMouseEnter={() => setSliderBtnHover(1)}
            onMouseLeave={() => setSliderBtnHover(0)}
          >
            <Box sx={ButtonHover}>
              <Buttons
                onClick={SliderRightHandler}
                type="button"
                className="slider__right--arrow"
                name=""
              >
                <Image
                  alt="Icons"
                  src="/icons/slider-arrow-right.svg"
                  width={9}
                  height={14}
                />
              </Buttons>
            </Box>
            <Box sx={ButtonHover}>
              <Buttons
                onClick={SliderLeftHandler}
                type="button"
                className="slider__left--arrow"
                name=""
              >
                <Image
                  alt="Icons"
                  src="/icons/slider-arrow-left.svg"
                  width={9}
                  height={14}
                />
              </Buttons>
            </Box>
            <List sx={{
              transform: `translateX(-${sliderCount * 90}vw)`,
              padding: "0 !important",
              display: "flex",
              position: 'relative',
              width: `${simpleModel?.images?.length * 90}vw`,
              transition: `all ${sliderTransition}s ease`
            }}>
              {
                simpleModel?.images?.map((slide: any, index: number) => (
                  <CustomListItemBig
                    className="MuiListItem-slider__big--item"
                    onClick={(e) => { dispatch(setShowModelsModal(true)) }}
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <SimpleImage
                      alt=''
                      sizes='100%'
                      fill
                      sx={{ objectFit: 'contain' }}
                      src={`${IMAGES_BASE_URL}/${slide?.image_src}`}
                      priority={true}
                    />
                  </CustomListItemBig>
                ))
              }

            </List>
          </Grid>

        </Grid>
      </>
    )
  } else {
    return (
      <>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column-reverse"
          }}
          spacing={1}
          item
          xs={12}
        >
          <Grid
            sx={{
              padding: "11px !important",
              display: "flex",
              justifyContent: "center"
            }}
            xs={12}
            item
          >
            <List
              sx={{
                padding: "0 !important",
                display: `${"flex"}`
              }}
            >
              {
                fakeModelImages.map((slide: any, index: number) => (
                  <CustomListItem
                    sx={{ margin: "0 8px 0 0" }}
                    className={`${sliderCount == index ? "MuiListItem-slider__item--active" : ""}`}
                    onClick={() => setSliderCount(index)}
                    key={index}
                  >
                    <Image
                      loader={myLoader}
                      width={56}
                      height={56}
                      alt="slider"
                      src={`/img/card-loader.jpg`}
                    />
                  </CustomListItem>
                ))
              }

            </List>
          </Grid>
          <Grid
            sx={{ padding: "0 !important", overflow: "hidden" }}
            item
            xs={12}
          >
            <Buttons
              onClick={SliderRightHandler}
              type="button"
              className="slider__right--arrow"
              name=""
            >
              <Image
                alt="Icons"
                src="/icons/slider-arrow-right.svg"
                width={9}
                height={14}
              />
            </Buttons>
            <Buttons
              onClick={SliderLeftHandler}
              type="button"
              className="slider__left--arrow"
              name=""
            >
              <Image
                alt="Icons"
                src="/icons/slider-arrow-left.svg"
                width={9}
                height={14}
              />
            </Buttons>
            <List sx={{
              transform: `translateX(-${sliderCount * 90}vw)`,
              padding: "0 !important",
              display: "flex",
              position: 'relative',
              width: `${simpleModel?.images?.length * 90}vw`,
              transition: `all ${sliderTransition}s ease`
            }}>
              {
                fakeModelImages.map((slide: any, index: number) => (
                  <CustomListItemBig
                    className="MuiListItem-slider__big--item"
                    onClick={(e) => { dispatch(setShowModelsModal(true)) }}
                    key={index}
                  >
                    <SimpleImage
                      loader={myLoader}
                      sizes='100%'
                      fill
                      sx={{ objectFit: 'contain' }}
                      priority={true}
                      src={`/img/card-loader.jpg`}
                      alt="card-loader"
                    />
                  </CustomListItemBig>
                ))
              }

            </List>
          </Grid>
        </Grid>
      </>
    )
  }
}