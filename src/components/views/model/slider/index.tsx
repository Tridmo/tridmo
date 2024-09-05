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

const mainWidth = 558;

const CustomListItem = styled(ListItem)(
  ({ theme }) => `
        min-width: 56px;
        max-width: 56px;
        min-height: 56px;   
        max-height: 56px;   
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

const SimpleSlider = () => {
  const [sliderBtnHover, setSliderBtnHover] = useState(0)
  const dispatch = useDispatch<any>()

  const simpleModel = useSelector(selectOneModel);
  const currentUser = useSelector(selectMyProfile);
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const simple_model_status = useSelector((state: any) => state?.get_one_model?.status);

  const xsScreen = useMediaQuery('(max-width:600px)');
  const buttonReplace = useMediaQuery('(max-width:1280px)');
  const imageResizeSm = useMediaQuery('(max-width:1060px)');
  const imageResizeXs = useMediaQuery('(max-width:548px)');
  const imageResizeXxs = useMediaQuery('(max-width:500px)');
  const imageResizeXxxs = useMediaQuery('(max-width:460px)');
  const imageResizeXxxxs = useMediaQuery('(max-width:416px)');
  const [sliderCount, setSliderCount] = React.useState(0)
  const [sliderTransition, setSliderTransition] = React.useState(0.4)
  const [isSaved, setIsSaved] = useState<any>(false)
  const wdth =
    imageResizeXxxxs ? mainWidth - 200
      : imageResizeXxxs ? mainWidth - 180
        : imageResizeXxs ? mainWidth - 140
          : imageResizeXs ? mainWidth - 100
            : imageResizeSm ? mainWidth - 60
              : mainWidth;

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

  function handleListProjects() {
    dispatch(setProjectsListState(true))
    dispatch(setOpenModal(true))
  }

  const handleSave = () => {

    if (!isAuthenticated) {
      dispatch(setLoginState(true))
      dispatch(setOpenModal(true))
      return;
    }

    if (!isSaved) {
      setIsSaved(true)
      instance.post(
        '/saved/models',
        { model_id: simpleModel?.id }
      ).then(res => {
        setIsSaved(res?.data?.success)
        dispatch(getSavedModels())
        // toast.success(res?.data?.message)
      }).catch(err => {
        setIsSaved(false)
        // toast.error(err?.response?.data?.message)
      })
    }
    else if (isSaved) {
      setIsSaved(false)
      instance.delete(
        '/saved/models/' + simpleModel?.id
      ).then(res => {
        setIsSaved(!res?.data?.success)
        dispatch(getSavedModels())
        // toast.success(res?.data?.message)
      }).catch(err => {
        setIsSaved(true)
        // toast.error(err?.response?.data?.message)
      })
    }
  };

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
            alignItems: { lg: 'flex-start', md: 'flex-start', sm: 'center', xs: 'center' },
            flexDirection: { lg: "unset", md: 'column-reverse', sm: 'column-reverse', xs: 'column-reverse' },
            mt: "20px",
            ml: '0'
          }}
          container
          spacing={2}
          className="products__slider"
        >
          <Grid
            className='products__small--wrap'
            sx={{
              padding: "0 !important",
              width: imageResizeSm ? wdth : '',
              margin: { lg: "0 14px !important", md: "14px 0 !important", sm: "14px 0 !important", xs: "14px 0 !important" },
            }}
            item
            lg={1}
            md={12}
            sm={12}
            xs={12}
          >
            <List
              className='products__small-items'
              sx={{ display: 'flex', flexDirection: { lg: 'column', md: 'row', }, paddingTop: 0 }}
            >
              {
                simpleModel?.images?.map((slide: any, index: number) => (
                  <CustomListItem
                    sx={{ margin: { lg: "0 0 8px 0", md: "0 8px 0 0", sm: "0 8px 0 0", xs: "0 8px 0 0" } }}
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
              overflow: "hidden",
              position: "relative",
              padding: "0 !important",
              minWidth: `${wdth}px !important`,
              maxWidth: `${wdth}px !important`,
              maxHeight: `${wdth}px !important`
            }
            }
            item
            lg={10}
            md={10}
            sm={10}
            xs={10}
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
              transform: `translateX(-${sliderCount * wdth}px)`,
              padding: "0 !important",
              display: "flex",
              position: 'relative',
              width: `${simpleModel?.images?.length * wdth}px`,
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
                      sx={{ objectFit: 'cover' }}
                      src={`${IMAGES_BASE_URL}/${slide?.image_src}`}
                      priority={true}
                    />
                  </CustomListItemBig>
                ))
              }

            </List>
          </Grid>

          {
            !buttonReplace &&
            <Box>
              {
                !!isAuthenticated && (
                  <Buttons
                    name={'Добавить в проект'}
                    className='bookmark__btn'
                    childrenFirst={true}
                    onClick={handleListProjects}
                    sx={{
                      marginLeft: '90px',
                    }}
                  >
                    <Image
                      alt='icon'
                      width={18}
                      height={18}
                      src={'/icons/plus-bordered-gray.svg'}
                    />
                  </Buttons>
                )
              }

              <Buttons
                name={isSaved ? 'Сохранено' : 'Сохранить'}
                className='bookmark__btn'
                childrenFirst={true}
                onClick={handleSave}
                sx={{
                  marginLeft: '18px',
                  // position: 'absolute'
                }}
              >
                <Image
                  alt='bookmark'
                  width={18}
                  height={18}
                  src={isSaved ? '/icons/bookmark-full.svg' : '/icons/bookmark-line.svg'}
                />
              </Buttons>
            </Box>
          }

        </Grid>

        {
          buttonReplace &&
          <Box>
            {
              !!isAuthenticated && (
                <Buttons
                  name={'Добавить в проект'}
                  className='bookmark__btn'
                  childrenFirst={true}
                  onClick={handleListProjects}
                >
                  <Image
                    alt='icon'
                    width={18}
                    height={18}
                    src={'/icons/plus-bordered-gray.svg'}
                  />
                </Buttons>
              )
            }

            <Buttons
              name={isSaved ? 'Сохранено' : 'Сохранить'}
              className='bookmark__btn'
              childrenFirst={true}
              onClick={handleSave}
              sx={{
                marginLeft: '18px',
                // position: 'absolute'
              }}
            >
              <Image
                alt='bookmark'
                width={18}
                height={18}
                src={isSaved ? '/icons/bookmark-full.svg' : '/icons/bookmark-line.svg'}
              />
            </Buttons>
          </Box>
        }

      </>
    )
  } else {
    return (
      <Grid
        sx={{
          display: "flex",
          flexDirection: "unset",
          marginTop: "20px"
        }}
        container
        spacing={2}
        item
        xs={6}
      >
        <Grid
          sx={{ padding: "0 0 0 18px !important" }}
          xs={2}
          item
        >
          <List
            sx={{
              padding: "0 !important",
              display: `${"block"}`
            }}
          >
            {
              fakeModelImages.map((slide: any, index: number) => (
                <CustomListItem
                  sx={{ margin: "0 0 8px 0" }}
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
          sx={{ overflow: "hidden", position: "relative", padding: "0 0 18px 0 !important" }}
          item
          xs={10}
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
            transform: `translateX(-${sliderCount * wdth}px)`,
            padding: "0 !important",
            display: "flex",
            position: 'relative',
            width: `${simpleModel?.images?.length * wdth}px`,
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
                    width={wdth}
                    height={wdth}
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
    )
  }
}

export default SimpleSlider