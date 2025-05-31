import { Box } from "@mui/material";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGES_BASE_URL } from "../../utils/env_vars";
import SimpleTypography from "../typography";

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
  slides: any[];
  speed?: number;
  transitionSpeed?: number;
  slideWidth?: number;
  slideHeight?: number;
  autoScroll?: boolean;
  manualMode?: boolean;
  displayDots?: boolean;
}) => {
  const [visibleSlide, setVisibleSlide] = useState(1);
  const [hasTransitionClass, setHasTransitionClass] = useState(true);
  const [stateSlides, setStateSlides] = useState<any[]>([]);
  const [leftAndRightDisabled, setLeftAndRightDisabled] = useState(false);
  const intervalId = useRef<any>(null);

  useEffect(() => {
    const slidesWithClones = [...slides];
    slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 1]);
    slidesWithClones.push(slidesWithClones[1]);
    setStateSlides(slidesWithClones);
  }, []);
  useMemo(() => {
    if (!!autoScroll && stateSlides.length) {
      start();
    }
  }, [stateSlides]);

  useEffect(() => {
    if (visibleSlide == stateSlides.length - 1) {
      setLeftAndRightDisabled(true);
      setTimeout(() => {
        setHasTransitionClass(false);
        setVisibleSlide(1);
      }, transitionSpeed);
    }

    if (visibleSlide === 1) {
      setTimeout(() => {
        setHasTransitionClass(true);
      }, transitionSpeed);
    }

    if (visibleSlide === 0) {
      setLeftAndRightDisabled(true);
      setTimeout(() => {
        setHasTransitionClass(false);
        setVisibleSlide(stateSlides.length - 2);
      }, transitionSpeed);
    }

    if (visibleSlide == stateSlides.length - 2) {
      setTimeout(() => {
        setHasTransitionClass(true);
      }, transitionSpeed);
    }
  }, [visibleSlide]);

  useEffect(() => {
    if (leftAndRightDisabled) {
      setTimeout(() => {
        setLeftAndRightDisabled(false);
      }, transitionSpeed * 2);
    }
  }, [leftAndRightDisabled]);

  function start() {
    if (intervalId.current != null) {
      return;
    }
    intervalId.current = setInterval(() => {
      setVisibleSlide((prevVisibleSlide) => {
        if (prevVisibleSlide + 1 === stateSlides.length) {
          return 0;
        }
        return prevVisibleSlide + 1;
      });
    }, speed);
  }

  const stop = () => {
    clearInterval(intervalId.current);
  };

  const calculateLeftMargin = () => {
    return "-" + visibleSlide * slideWidth + "px";
  };

  const slideDimensionStyles = () => {
    return { width: slideWidth + "px", height: slideHeight + "px" };
  };

  const scrollLeft = () => {
    setVisibleSlide(visibleSlide - 1);
  };

  const scrollRight = () => {
    setVisibleSlide(visibleSlide + 1);
  };

  const dotIsActive = (index) => {
    return (
      index === visibleSlide ||
      (index === 1 && visibleSlide === stateSlides.length - 1) ||
      (index === stateSlides.length - 2 && visibleSlide === 0)
    );
  };

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
            <button
              onClick={!leftAndRightDisabled ? scrollLeft : () => {}}
              className={`scrollLeft ${leftAndRightDisabled ? "disabled" : ""}`}
              type="button"
              aria-label="Previous slide"
              disabled={leftAndRightDisabled}
              onKeyDown={(e) =>
                e.key === "Enter" && !leftAndRightDisabled && scrollLeft()
              }
            >
              Left
            </button>
            <button
              onClick={!leftAndRightDisabled ? scrollRight : () => {}}
              className={`scrollRight ${
                leftAndRightDisabled ? "disabled" : ""
              }`}
              type="button"
              aria-label="Next slide"
              disabled={leftAndRightDisabled}
              onKeyDown={(e) =>
                e.key === "Enter" && !leftAndRightDisabled && scrollRight()
              }
            >
              Right
            </button>
          </Fragment>
        )}
        {!!displayDots && (
          <div className="slideIndicator">
            {stateSlides.map((slide, index) => {
              if (index === 0 || index === stateSlides.length - 1) {
                return null;
              }
              return (
                <div
                  aria-label="Slide indicator"
                  key={slide.id + index}
                  onClick={() => setVisibleSlide(index)}
                  className={`dot ${dotIsActive(index) ? "active" : ""}`}
                />
              );
            })}
          </div>
        )}
        <div
          id="slides"
          className={`slides ${hasTransitionClass ? "transition" : ""}`}
          style={{ left: calculateLeftMargin() }}
        >
          {stateSlides.map((model: any, index) => {
            return (
              <div
                key={model.id + index}
                className={"slide"}
                style={slideDimensionStyles()}
              >
                <Link
                  className={"slideInner"}
                  href={`/models/${model?.slug}`}
                  key={model.id + index}
                  style={{
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      p: "16px",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LazyLoadImage
                      src={
                        model?.cover
                          ? model?.cover[0]?.image_src
                            ? `${IMAGES_BASE_URL}/${model?.cover[0]?.image_src}`
                            : ""
                          : ""
                      }
                      style={{ objectFit: "cover" }}
                      alt=""
                      effect="blur"
                      width={"322px"}
                      height={"322px"}
                      placeholderSrc="/img/placeholder.svg"
                      delayTime={100}
                    />
                    {/* <Image
                      priority
                      src={`${IMAGES_BASE_URL}/${model?.cover[0]?.image_src}`}
                      alt='Model image'
                      width={322}
                      height={322}
                      style={{
                        marginBottom: '24px',
                      }}
                    /> */}
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        mt: "24px",
                      }}
                    >
                      <SimpleTypography
                        text={model?.name}
                        className="card__title"
                      />
                    </Box>
                  </Box>
                </Link>
              </div>
            );
          })}
        </div>
        ; ; ; ;
      </div>
    </div>
  );
};
