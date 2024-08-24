"use client";

import Buttons from "@/components/buttons";
import SearchInput from "@/components/inputs/search";
import { Box, Grid, IconButton, Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllModels } from "../../../data/get_all_models";
import { selectTopModels } from "../../../data/get_top_models";
import { setModelNameFilter } from "../../../data/handle_filters";
import { Carousel } from "../../custom_card/carousel";
import SimpleCard from "../../simple_card";
import SimpleTypography from "../../typography";

const MorePages = [
  {
    path: "/designers",
    title: "Дизайнеры",
    desc: "Дизайнеры интерьера, работающие с нами, и их работы.",
    imageRounded: true,
    preview: [
      { image_src: "/img/person1.jpg" },
      { image_src: "/img/person2.jpg" },
      { image_src: "/img/person3.jpg" },
    ],
  },
  {
    path: "/brands",
    title: "Бренды",
    desc: "Продукция ведущих мебельных брендов Узбекистана.",
    imageRounded: false,
    preview: [
      { image_src: "/img/brand1.jpg" },
      { image_src: "/img/brand2.jpg" },
      { image_src: "/img/brand3.png" },
    ],
  },
];

const WhyUsDatas = [
  {
    id: 1,
    title: "Разнообразие выбора",
    desc: "На этой платформе вы можете найти множество 3D-моделей и дизайнов на свой вкус.",
    icon: "/icons/why-us-check.svg",
  },
  {
    id: 2,
    title: "Простое решение",
    desc: "Не нужно бояться, что продукцию, использованную в вашем дизайне, не найдут в Узбекистане. Вы будете пользоваться продукцией лучших производителей в Узбекистане.",
    icon: "/icons/why-us-label.svg",
  },
  {
    id: 3,
    title: "Уникальность и удобство",
    desc: "Вы можете выполнить свою работу быстро, комфортно и легко через платформу, не имеющую аналогов на рынке Узбекистана.",
    icon: "/icons/why-us-cursor.svg",
  },
  {
    id: 4,
    title: "Экспертная команда",
    desc: "Команда платформы может помочь вам на каждом этапе. Это ещё больше ускорит процесс.",
    icon: "/icons/why-us-message.svg",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const topModels = useSelector(selectTopModels);

  function handleSearch(e) {
    e.preventDefault();
    dispatch(setModelNameFilter(searchVal));
    const newUrl = `/models/?name=${searchVal}`;
    router.push(newUrl);
    dispatch(
      getAllModels({
        name: searchVal,
      })
    );
  }

  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: "#fff" }}>
        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "1200px",
            },
            minHeight: 507,
            display: "flex",
            margin: { xs: "0 16px", lg: "0 auto" },
            alignItems: "center",
          }}
        >
          <Grid
            spacing={2}
            container
            columns={{ xs: 1, sm: 2 }}
            padding={{ xs: "0 0 30px 0", lg: 0 }}
            sx={{
              marginLeft: 0,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid width={{ xs: "90%", sm: "590px" }}>
              <Box
                my={4}
                display="flex"
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <SimpleTypography
                  text="Теперь дизайн не только на бумаге."
                  className="hero__title"
                  variant={"h1"}
                />
                <SimpleTypography
                  text="Единственная площадка для дизайнеров и производителей мебели в Узбекистане."
                  className="hero__desc"
                />
                <Grid>
                  <Box width={{ xs: "100%", md: "590px" }}>
                    <form onSubmit={handleSearch}>
                      <SearchInput
                        sx={{
                          width: "100%",
                          p: "12px 14px",
                        }}
                        startIcon={false}
                        withButton={true}
                        onChange={setSearchVal}
                        clic={setSearchClicked}
                        placeHolder="Поиск..."
                      />
                    </form>
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid
              width={"auto"}
              margin={{ xs: "0", sm: "auto", lg: "0px 44px 0px 0px" }}
            >
              {topModels && topModels?.data?.models?.length ? (
                // <IntervalRotateCard
                //   slides={topModels?.data?.models}
                //   autoScroll={true}
                // />
                <Carousel
                  slides={topModels?.data?.models}
                  speed={5000}
                  slideWidth={354}
                  slideHeight={396}
                  manualMode={false}
                  autoScroll
                />
              ) : (
                <Skeleton variant="rectangular" width={354} height={396} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "1200px",
            },
            display: "flex",
            margin: "0 auto",
            padding: { xs: "0 18px", lg: 0 },
            justifyItems: "center",
          }}
        >
          <Box
            width="100%"
            marginTop={{ xs: "30px", md: "40px" }}
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            gap={4}
          >
            {MorePages.map((item, index) => (
              <Link key={index} href={item?.path}>
                <Box
                  sx={{
                    width: "100%",
                    padding: "20px",
                    display: "flex",
                    flexDirection: {
                      xs: "column-reverse",
                      sm: "row",
                      md: "column-reverse",
                      lg: "row",
                    },
                    justifyContent: "space-between",
                    gap: 2,
                    backgroundColor: "#fff",
                    border: "1px solid transparent",
                    borderRadius: "4px",
                    boxShadow: "0px 2px 8px 0px #0000000D",

                    "&:hover": {
                      borderColor: "#E0E0E0",
                      boxShadow: "0px 6px 10px 0px #0000000F",
                    },
                    "&:hover .landing_section_text .landing_section_name": {
                      color: "#7210BE !important",
                    },
                    "&:hover .preview_images .arrow_button": {
                      backgroundColor: "#7210BE",
                    },
                    "&:hover .preview_images .arrow_button svg path": {
                      fill: "#fff",
                    },
                  }}
                >
                  <Box
                    className="landing_section_text"
                    sx={{
                      maxWidth: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <SimpleTypography
                      text={item?.title}
                      className="landing_section_name"
                      variant={"h2"}
                    />
                    <SimpleTypography
                      text={item?.desc}
                      className="landing_section_desc"
                    />
                  </Box>
                  <Box
                    className="preview_images"
                    sx={{
                      height: 64,
                      width: 64 * 3 - (64 - 50),
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      position: "relative",
                    }}
                  >
                    {item?.preview.map((model, index) => (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "64px",
                          height: "64px",
                          padding: item?.imageRounded ? "0px" : "6px",
                          border: item?.imageRounded ? "" : "1px solid #E0E0E0",
                          borderRadius: item?.imageRounded ? "50%" : "5px",
                          position: "absolute",
                          top: 0,
                          left: `${index * 50}px`,
                          zIndex: index + 1,
                        }}
                      >
                        <Image
                          src={model.image_src}
                          alt="Landing image"
                          width={item?.imageRounded ? 64 : 52}
                          height={item?.imageRounded ? 64 : 52}
                          style={{
                            borderRadius: item?.imageRounded ? "50%" : "5px",
                            border: item?.imageRounded ? "1px solid #fff" : "",
                          }}
                        />
                      </Box>
                    ))}
                    <IconButton
                      className="arrow_button"
                      aria-label="menu"
                      sx={{
                        marginRight: "16px",
                        backgroundColor: "#F3E5FF",
                        border: "2px solid #fff",
                        zIndex: 5,
                        position: "absolute",
                        right: "-12%",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.9766 9.99962L6.85156 5.87462L8.0299 4.69629L13.3332 9.99962L8.0299 15.303L6.85156 14.1246L10.9766 9.99962Z"
                          fill="#7210BE"
                        />
                      </svg>
                    </IconButton>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
        {/* Models */}
        <Box
          sx={{
            maxWidth: "1200px",
            display: "block",
            margin: "0 auto",
            padding: { xs: "0 18px", lg: 0 },
            alignItems: "flex-start",
            marginTop: "64px",
          }}
        >
          <Grid container>
            {/* 3D MODELS */}

            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              container
              spacing={2}
              className="texts__wrap"
            >
              <Grid item xs={10}>
                <SimpleTypography
                  text="3D модели"
                  className="section__title"
                  variant="h2"
                />
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  marginBottom: "12px",
                  display: { xs: "none", sm: "flex" },
                  justifyContent: "flex-end",
                }}
              >
                <Link href={`models`}>
                  <Buttons
                    name={"Узнайте больше"}
                    endIcon={"right"}
                    className={`bordered__btn--explore`}
                    sx={{ textWrap: "nowrap" }}
                  />
                </Link>
              </Grid>
            </Grid>

            {/* 3D MODELS MAP */}

            <SimpleCard cols={5} route={"landing_models"} />

            <Box width={"100%"}>
              <Link href={`models`}>
                <Buttons
                  name={"Узнайте больше"}
                  endIcon={"right"}
                  className={`bordered__btn--explore`}
                  sx={{
                    width: "100%",
                    textWrap: "nowrap",
                    display: { xs: "flex", sm: "none" },
                  }}
                />
              </Link>
            </Box>
          </Grid>
        </Box>
        {/* Why Us */}
        <Box
          sx={{
            width: "1200px",
            display: "flex",
            margin: "0 auto",
            alignItems: "flex-start",
            marginTop: "64px",
          }}
        >
          <Grid container>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              container
              spacing={2}
              className="texts__wrap"
            >
              <Grid item xs={10}>
                <SimpleTypography
                  text="Почему именно demod?"
                  className="section__title"
                  variant="h2"
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              className="why-us__wrapper"
              sx={{ marginTop: "4px", marginBottom: "40px" }}
            >
              {WhyUsDatas.map((item) => (
                <Grid
                  key={item.id}
                  item
                  md={3}
                  xs={12}
                  sx={{
                    minHeight: "300px",
                  }}
                >
                  <Box
                    sx={{ background: "#fff", padding: "16px", height: "100%" }}
                    className="why-us__card"
                  >
                    <Box
                      sx={{
                        background: "#F3E5FF",
                        borderRadius: "8px",
                        width: "48px",
                        height: "48px",
                        marginBottom: "13px",
                        backgroundImage: `url(${item.icon})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                      }}
                    ></Box>
                    <SimpleTypography
                      text={item.title}
                      className="why-us__title"
                      variant="h2"
                    />
                    <SimpleTypography
                      text={item.desc}
                      className="why-us__desc"
                      variant="p"
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
        {/* Inter */}
        <Box
          sx={{
            width: "1200px",
            display: "flex",
            margin: "0 auto",
            alignItems: "flex-start",
            marginTop: "64px",
            mb: "56px",
          }}
        >
          <Grid container>
            {/* INTERIORS */}

            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              container
              spacing={2}
              className="texts__wrap"
            >
              <Grid item xs={10}>
                <SimpleTypography
                  text="Интерьеры"
                  className="section__title"
                  variant="h2"
                />
              </Grid>

              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "12px",
                }}
              >
                <Link href={`interiors`}>
                  <Buttons
                    name={"Узнайте больше"}
                    endIcon={"right"}
                    className={`bordered__btn--explore`}
                  />
                </Link>
              </Grid>
            </Grid>

            {/* INTERIORS MAP */}

            <SimpleCard cols={4} route={"interiors"} sliced={12} />
          </Grid>
        </Box>
      </Box>
    </>
  );
}
