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

const SimpleListItem = styled(ListItem)(
    ({ theme }) => `
        width: 56px;
        height: 56px;   
        border: 1px solid #e0e0e0;
        padding: 0;
        cursor: pointer;

        &.MuiListItem-slider__item--active{
            border-color: #7210be;
        }

      

        &.MuiListItem-slider__big--item{
            width: 100%;
            height: 558px;
            border: none;

            &:hover{
                
            }
        }

        img{
            object-fit: contain !important;
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

const SimpleSlider = ({ name }: any) => {
    const [sliderBtnHover, setSliderBtnHover] = useState(0)
    const dispatch = useDispatch<any>()

    // const simpleModel = useSelector(selectOneModel);
    const simpleModel = sampleModel;

    const simple_model_status = useSelector((state: any) => state?.get_one_model?.status);
    const matches = useMediaQuery('(max-width:600px)');
    const [sliderCount, setSliderCount] = React.useState(0)
    const [sliderTransition, setSliderTransition] = React.useState(0.4)

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

    const wdth = name === "slider" && !matches ? 507 : name !== "slider" ? 720 : window.innerWidth

    const ListStyle: SxProps = {
        transform: `translateX(-${sliderCount * wdth}px)`,
        padding: "0 !important",
        display: "flex",
        position: 'relative',
        width: `${simpleModel?.images?.length * wdth}px`,
        transition: `all ${sliderTransition}s ease`
    }

    const ButtonHover = {
        opacity: sliderBtnHover
    }

    if ("succeeded") {
        return (
            <>
                <Grid
                    sx={
                        name === "slider" ? {
                            display: "flex",
                            flexDirection: "unset",
                            marginTop: "20px",
                        } : {
                            display: "flex",
                            flexDirection: "column-reverse"
                        }
                    }
                    container={name === "slider" ? true : false}
                    spacing={name === "slider" ? 2 : 1}
                    item
                    md={name === "slider" ? 6 : 12}
                    xs={12}
                    className="products__slider"
                >
                    <Grid
                        className='products__small--wrap'
                        sx={name === "slider" ?
                            { padding: "0 0 0 18px !important" } :
                            {
                                padding: "11px !important",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        item
                        md={name === "slider" ? 2 : 12}
                        xs={12}
                    >
                        <List
                            className='products__small-items'
                            sx={{ display: `${name === "slider" ? "block" : "flex"}` }}
                        >
                            {
                                simpleModel?.images?.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        sx={name === "slider" ? { margin: "0 0 8px 0" } : { margin: "0 8px 0 0" }}
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
                                            src={`${slide?.image?.src}`}
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                    </Grid>
                    <Grid
                        sx={name === "slider" ?
                            { overflow: "hidden", position: "relative", padding: "0 0 18px 0 !important" } : { padding: "0 !important", overflow: "hidden" }}
                        item
                        xs={12}
                        md={name === "slider" ? 10 : 12}
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
                        <List sx={ListStyle}>
                            {
                                simpleModel?.images?.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        className="MuiListItem-slider__big--item"
                                        onClick={(e) => { dispatch(setShowModelsModal(true)) }}
                                        key={index}
                                    >
                                        <SimpleImage
                                            alt=''
                                            layout='fill'
                                            sx={{ objectFit: 'contain' }}
                                            src={`${slide?.image?.src}`}
                                            priority={true}
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                        {
                            name === "slider" ?
                                <Buttons
                                    name='Сохранять'
                                    className='bookmark__btn'
                                    sx={{ margin: '0 2px' }}
                                    childrenFirst={true}
                                >
                                    <Image
                                        alt='bookmark'
                                        width={18}
                                        height={18}
                                        src={'/icons/bookmark-line.svg'}
                                    />
                                </Buttons>
                                : null
                        }

                    </Grid>

                </Grid>
            </>
        )
    } else {
        ListStyle.width = 5 * wdth;
        return (
            <>
                <Grid
                    sx={
                        name === "slider" ? {
                            display: "flex",
                            flexDirection: "unset",
                            marginTop: "20px"
                        } : {
                            display: "flex",
                            flexDirection: "column-reverse"
                        }
                    }
                    container={name === "slider" ? true : false}
                    spacing={name === "slider" ? 2 : 1}
                    item
                    xs={name === "slider" ? 6 : 12}
                >
                    <Grid
                        sx={name === "slider" ? { padding: "0 0 0 18px !important" } :
                            {
                                padding: "11px !important",
                                display: "flex",
                                justifyContent: "center"
                            }
                        }
                        xs={name === "slider" ? 2 : 12}
                        item
                    >
                        <List
                            sx={{
                                padding: "0 !important",
                                display: `${name === "slider" ? "block" : "flex"}`
                            }}
                        >
                            {
                                fakeModelImages.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        sx={name === "slider" ? { margin: "0 0 8px 0" } : { margin: "0 8px 0 0" }}
                                        className={`${sliderCount == index ? "MuiListItem-slider__item--active" : ""}`}
                                        onClick={() => setSliderCount(index)}
                                        key={index}
                                    >
                                        <Image
                                            loader={myLoader}
                                            width={56}
                                            height={56}
                                            alt="slider"
                                            src={`/../../../../img/card-loader.jpg`}
                                        />
                                    </SimpleListItem>
                                ))
                            }

                        </List>
                    </Grid>
                    <Grid
                        sx={name === "slider" ?
                            { overflow: "hidden", position: "relative", padding: "0 0 18px 0 !important" } : { padding: "0 !important", overflow: "hidden" }}
                        item
                        xs={name === "slider" ? 10 : 12}
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
                        <List sx={ListStyle}>
                            {
                                fakeModelImages.map((slide: any, index: number) => (
                                    <SimpleListItem
                                        className="MuiListItem-slider__big--item"
                                        onClick={(e) => { dispatch(setShowModelsModal(true)) }}
                                        key={index}
                                    >
                                        <SimpleImage
                                            loader={myLoader}
                                            width={497}
                                            height={558}
                                            // layout='fill'
                                            sx={{ objectFit: 'contain' }}
                                            priority={true}
                                            src={`/img/card-loader.jpg`}
                                            alt="card-loader"
                                        />
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