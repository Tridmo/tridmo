import { Box, Grid, List, ListItem, styled, useMediaQuery } from '@mui/material';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTopModels } from '../../data/get_top_models';
import Link from 'next/link';
import Image from 'next/image';
import { IMAGES_BASE_URL } from '../../utils/image_src';
import SimpleTypography from '../typography';


export const Carousel = ({
  slides = [],
  speed = 3000,
  transitionSpeed = 500,
  slideWidth = 300,
  slideHeight = 300,
  autoScroll,
  manualMode,
  displayDots,
}: {
  slides: any[],
  speed?: number,
  transitionSpeed?: number,
  slideWidth?: number,
  slideHeight?: number,
  autoScroll?: boolean,
  manualMode?: boolean,
  displayDots?: boolean,
}) => {

  if (slides.length < 2) {
    console.error("Please provide more slides")
    return null
  }

  const [visibleSlide, setVisibleSlide] = useState(1)
  const [hasTransitionClass, setHasTransitionClass] = useState(true)
  const [stateSlides, setStateSlides] = useState<any[]>([])
  const [leftAndRightDisabled, setLeftAndRightDisabled] = useState(false)
  const intervalId = useRef<any>(null)

  // useEffect with an empty array as the second parameter
  // will run only once, when the component mounts 
  // this makes it an ideal place to trigger this functionality
  useEffect(() => {
    const slidesWithClones = [...slides]
    slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 1])
    slidesWithClones.push(slidesWithClones[1])
    setStateSlides(slidesWithClones)
  }, [])
  useMemo(() => {
    if (!!autoScroll && stateSlides.length) {
      start()
    }
  }, [stateSlides])

  // Monitor changes for the visibleSlide value and react accordingly
  // We need to loop back to the first slide when scrolling right
  // from the last slide (and vice-versa for the other direction)
  // And we also need to disable the animations (by removing the
  // transition class from the relevant element) in order to give
  // the impression that the carousel is scrolling infinitely 
  // during our slide-cloning/swapping mechanism
  useEffect(() => {
    if (visibleSlide == stateSlides.length - 1) {
      setLeftAndRightDisabled(true)
      setTimeout(() => {
        setHasTransitionClass(false)
        setVisibleSlide(1)
      }, transitionSpeed)
    }

    if (visibleSlide === 1) {
      setTimeout(() => {
        setHasTransitionClass(true)
      }, transitionSpeed)
    }

    if (visibleSlide === 0) {
      setLeftAndRightDisabled(true)
      setTimeout(() => {
        setHasTransitionClass(false)
        setVisibleSlide(stateSlides.length - 2)
      }, transitionSpeed)
    }

    if (visibleSlide == stateSlides.length - 2) {
      setTimeout(() => {
        setHasTransitionClass(true)
      }, transitionSpeed)
    }
  }, [visibleSlide])

  // Whenever the left and right arrows are disabled
  // We want to enable them again after a specific 
  // period of time, this is to prevent problematic
  // spamming of these controls during our clone 
  // slide-cloning/swapping mechanism
  // Probably a better way to handle this though
  useEffect(() => {
    if (leftAndRightDisabled) {
      setTimeout(() => {
        setLeftAndRightDisabled(false)
      }, transitionSpeed * 2)
    }
  }, [leftAndRightDisabled])

  function start() {
    if (intervalId.current != null) {
      return
    }
    intervalId.current = setInterval(() => {
      setVisibleSlide(prevVisibleSlide => {
        if (prevVisibleSlide + 1 === stateSlides.length) {
          return 0
        }
        return prevVisibleSlide + 1
      })
    }, speed)
  }

  const stop = () => {
    clearInterval(intervalId.current)
  }

  const calculateLeftMargin = () => {
    return "-" + (visibleSlide * slideWidth) + "px"
  }

  const slideDimensionStyles = () => {
    return { width: slideWidth + "px", height: slideHeight + "px" }
  }

  const scrollLeft = () => {
    setVisibleSlide(visibleSlide - 1)
  }

  const scrollRight = () => {
    setVisibleSlide(visibleSlide + 1)
  }

  const dotIsActive = (index) => {
    return (
      index === visibleSlide ||
      (index === 1 && visibleSlide === stateSlides.length - 1) ||
      (index === stateSlides.length - 2 && visibleSlide === 0)
    )
  }

  return (
    <div className="carousel">
      {!autoScroll && !manualMode && (
        <div className="controls">
          <button onClick={start}>Start</button>{" "}
          <button onClick={stop}>Stop</button>
        </div>
      )}

      <div className="slidesContainer" style={slideDimensionStyles()}>
        {!!manualMode && (
          <Fragment>
            <a
              onClick={!leftAndRightDisabled ? scrollLeft : () => { }}
              href="#"
              className={`scrollLeft ${leftAndRightDisabled ? "disabled" : ""}`}>
              Left
            </a>
            <a
              onClick={!leftAndRightDisabled ? scrollRight : () => { }}
              href="#" className={`scrollRight ${leftAndRightDisabled ? "disabled" : ""}`}>
              Right
            </a>
          </Fragment>
        )}
        {
          !!displayDots && (
            <div className="slideIndicator">
              {stateSlides.map((slide, index) => {
                if (index === 0 || index === stateSlides.length - 1) {
                  return null
                }
                return (
                  <div
                    key={index}
                    onClick={() => setVisibleSlide(index)}
                    className={`dot ${dotIsActive(index) ? "active" : ""}`}
                  />
                )
              })}
            </div>
          )
        }

        <div
          id="slides"
          className={`slides ${hasTransitionClass ? "transition" : ""}`}
          style={{ left: calculateLeftMargin() }}>
          {stateSlides.map((model: any, index) => {
            return (
              <div
                key={index}
                className={"slide"}
                style={slideDimensionStyles()}
              >
                <Link
                  className={"slideInner"}
                  href={`/models/${model?.slug}`}
                  key={index}
                  style={{
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      p: '16px',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Image
                      src={`${IMAGES_BASE_URL}/${model?.cover[0]?.image_src}`}
                      alt='Model image'
                      width={322}
                      height={322}
                      style={{
                        marginBottom: '24px',
                      }}
                    />
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                      }}
                    >
                      <SimpleTypography
                        text={model?.name}
                        className='card__title'
                      />
                    </Box>
                  </Box>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}