"use client"

import Buttons from "@/components/buttons";
import BasicPagination from "@/components/pagination/pagination";
import SimpleTypography from "@/components/typography";
import { setBrandNameFilter } from "@/data/handle_filters";
import { brandsLimit } from "@/types/filters";
import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands, selectAllBrands } from "../../../data/get_all_brands";
import {
  ContainerStyle,
  liAvatarSx,
  liAvatarWrapper,
  liHeaderSx,
  liHeaderTextSx,
  listSx,
  liSx,
} from "../../../styles/styles";
import { IMAGES_BASE_URL } from "../../../utils/env_vars";
import { dataItemIndex } from "../../../utils/utils";
import EmptyData from "../../views/empty_data";

export default function BrandsPage() {
  const getAllBrandStatus = useSelector(
    (state: any) => state?.get_all_brands?.status
  );
  const getBrandsNameFilter = useSelector(
    (state: any) => state?.handle_filters?.brand_name
  );
  const getBrandsPageFilter = useSelector(
    (state: any) => state?.handle_filters?.brands_page
  );

  const dispatch = useDispatch<any>();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const all__brands = useSelector(selectAllBrands);
  const smallScreen = useMediaQuery("(max-width:768px)");
  const fakeBrands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [searchValue, setSearchValue] = useState("");
  const page = searchParams.get("page") as string;

  useEffect(() => {
    setSearchValue(searchParams.get("name") as string);
  }, [searchParams.toString()]);

  React.useEffect(() => {
    if (getAllBrandStatus === "idle") {
      dispatch(
        getAllBrands({
          name: searchParams.get("name") || getBrandsNameFilter,
          page: page || getBrandsPageFilter,
          orderBy: "models_count",
          limit: brandsLimit,
        })
      );
    }
  }, [getAllBrandStatus, searchParams.toString()]);

  const removeFromQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  async function clearSearch() {
    dispatch(setBrandNameFilter(""));
    dispatch(
      getAllBrands({
        name: "",
        orderBy: "models_count",
        limit: brandsLimit,
        page: page || getBrandsPageFilter,
      })
    );
    const newQuery = removeFromQuery("name");
    router.push(`${pathname}?${newQuery}`);
    setSearchValue("");
  }

  const widthControl = {
    "&:nth-of-type(1)": {
      minWidth: { lg: "56px", md: "56px", sm: "30px", xs: "30px" },
      maxWidth: { lg: "56px", md: "56px", sm: "30px", xs: "30px" },
    },
    "&:nth-of-type(2)": {
      minWidth: smallScreen
        ? "60%"
        : { lg: "40%", md: "40%", sm: "40%", xs: "60%" },
      maxWidth: smallScreen
        ? "60%"
        : { lg: "40%", md: "40%", sm: "40%", xs: "60%" },
    },
    "&:nth-of-type(3)": {
      minWidth: smallScreen
        ? "30%"
        : { lg: "25%", md: "25%", sm: "25%", xs: "30%" },
      maxWidth: smallScreen
        ? "30%"
        : { lg: "25%", md: "25%", sm: "25%", xs: "30%" },
    },
    "&:nth-of-type(4)": {
      minWidth: "25%",
      maxWidth: "25%",
    },
  };

  return (
    <Box sx={ContainerStyle}>
      <SimpleTypography
        text="Бренды"
        className="section__title"
        sx={{ margin: "32px auto !important" }}
      />
      {getAllBrandStatus == "succeeded" ? (
        <>
          <Grid
            container
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #e0e0e0",
              marginBottom: "20px",
              paddingBottom: "10px",
            }}
          >
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ padding: "0 !important", alignItems: "center" }}
            >
              {searchValue ? (
                <Box
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                    padding: "10px 0",
                    marginBottom: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <SimpleTypography
                      text={`Дизайнеры  «${searchValue}»`}
                      className="prodcts__result--title"
                      variant="h2"
                    />
                    <Buttons
                      onClick={clearSearch}
                      sx={{
                        color: "#646464",
                        minWidth: "30px",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    >
                      <Close />
                    </Buttons>
                  </Box>
                  <SimpleTypography
                    text={`найдено ${all__brands?.data?.pagination?.data_count} результатов`}
                    className="products__result--text"
                    variant="h2"
                  />
                </Box>
              ) : null}

              <SimpleTypography
                text={`Показаны ${
                  dataItemIndex<string>(
                    all__brands?.data?.pagination?.limit,
                    all__brands?.data?.pagination?.current,
                    1
                  ) || 0
                }–${
                  dataItemIndex<string>(
                    all__brands?.data?.pagination?.limit,
                    all__brands?.data?.pagination?.current,
                    all__brands?.data?.brands?.length
                  ) || 0
                } из ${all__brands?.data?.pagination?.data_count || 0} брендов`}
                className="pagenation__desc"
              />
            </Grid>
          </Grid>
          {all__brands?.data?.brands &&
          all__brands?.data?.brands?.length != 0 ? (
            <List sx={listSx}>
              <ListItem alignItems="center" key={-1} sx={liHeaderSx}>
                <SimpleTypography
                  text="№"
                  sx={{
                    ...liHeaderTextSx,
                    ...widthControl,
                    marginRight: {
                      lg: "16px",
                      md: "16px",
                      sm: "12px",
                      xs: "8px",
                    },
                  }}
                />
                <SimpleTypography
                  text="Бренд"
                  sx={{
                    ...liHeaderTextSx,
                    ...widthControl,
                    textAlign: "start !important",
                  }}
                />
                {smallScreen ? (
                  <>
                    <SimpleTypography
                      text="Кол-во моделей"
                      sx={{
                        ...liHeaderTextSx,
                        ...widthControl,
                        fontSize: {
                          lg: "20px",
                          md: "18px",
                          sm: "16px",
                          xs: "14px",
                        },
                      }}
                    />
                  </>
                ) : (
                  <>
                    <SimpleTypography
                      text="Страна"
                      sx={{
                        ...liHeaderTextSx,
                        ...widthControl,
                        textAlign: "start !important",
                      }}
                    />
                    <SimpleTypography
                      text="Количество моделей"
                      sx={{ ...liHeaderTextSx, ...widthControl }}
                    />
                  </>
                )}
              </ListItem>
              {all__brands?.data?.brands &&
              all__brands?.data?.brands?.length != 0
                ? all__brands?.data?.brands?.map((brand, index: any) => (
                    <Link key={index} href={`/${brand?.slug}`}>
                      <ListItem key={index} alignItems="center" sx={liSx}>
                        <ListItemText
                          sx={{
                            ...widthControl,
                            marginRight: {
                              lg: "16px",
                              md: "16px",
                              sm: "12px",
                              xs: "8px",
                            },
                          }}
                        >
                          <SimpleTypography
                            text={dataItemIndex<string>(
                              all__brands?.data?.pagination?.limit,
                              all__brands?.data?.pagination?.current,
                              index + 1
                            )}
                            sx={{
                              textAlign: "center",
                              color: "#B3B3B3",
                              fontWeight: {
                                lg: "500",
                                md: "500",
                                sm: "400",
                                xs: "400",
                              },
                              fontSize: {
                                lg: "22px",
                                md: "20px",
                                sm: "18px",
                                xs: "16px",
                              },
                              lineHeight: "26px",
                              letterSpacing: "-0.02em",
                            }}
                          />
                        </ListItemText>

                        <ListItemText
                          sx={{
                            ...widthControl,
                            m: 0,
                            "& > span": {
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            },
                          }}
                        >
                          <ListItemAvatar
                            sx={{ ...liAvatarWrapper, borderRadius: "8px" }}
                          >
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              src={
                                brand?.image_src
                                  ? `${IMAGES_BASE_URL}/${brand?.image_src}`
                                  : "/img/no-image.png"
                              }
                              alt="Landing image"
                              style={{
                                borderRadius: "8px",
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </ListItemAvatar>

                          <ListItemText
                            className="brand_name"
                            sx={{
                              marginLeft: {
                                lg: "16px",
                                md: "16px",
                                sm: "12px",
                                xs: "8px",
                              },
                            }}
                          >
                            <SimpleTypography
                              text={brand?.name}
                              sx={{
                                fontSize: {
                                  lg: "22px",
                                  md: "20px",
                                  sm: "18px",
                                  xs: "18px",
                                },
                                fontWeight: 400,
                                lineHeight: "26px",
                                letterSpacing: "-0.02em",
                                textAlign: "start",
                                color: "#141414",
                              }}
                            />
                            <SimpleTypography
                              text={`${
                                brand?.site_link.includes("https://") ||
                                brand?.site_link.includes("http://")
                                  ? brand?.site_link
                                      .split("://")[1]
                                      .replaceAll("/", "")
                                  : brand?.site_link
                              }`}
                              sx={{
                                fontSize: {
                                  lg: "18px",
                                  md: "18px",
                                  sm: "16px",
                                  xs: "14px",
                                },
                                fontWeight: 400,
                                lineHeight: "24px",
                                letterSpacing: "-0.01em",
                                textAlign: "start",
                                color: "#848484",
                              }}
                            />
                          </ListItemText>
                        </ListItemText>

                        {smallScreen ? (
                          <>
                            <ListItemText sx={{ ...widthControl }}>
                              <SimpleTypography
                                text={brand?.models_count}
                                sx={{
                                  fontSize: {
                                    lg: "22px",
                                    md: "20px",
                                    sm: "18px",
                                    xs: "16px",
                                  },
                                  fontWeight: 400,
                                  lineHeight: "26px",
                                  letterSpacing: "-0.02em",
                                  textAlign: "center",
                                }}
                              />
                            </ListItemText>
                          </>
                        ) : (
                          <>
                            <ListItemText sx={{ ...widthControl }}>
                              <SimpleTypography
                                text=""
                                sx={{
                                  fontSize: {
                                    lg: "22px",
                                    md: "20px",
                                    sm: "18px",
                                    xs: "16px",
                                  },
                                  fontWeight: 400,
                                  lineHeight: "26px",
                                  letterSpacing: "-0.02em",
                                  textAlign: "start",
                                }}
                              >
                                {brand?.country}
                              </SimpleTypography>
                            </ListItemText>

                            <ListItemText sx={{ ...widthControl }}>
                              <SimpleTypography
                                text={brand?.models_count}
                                sx={{
                                  fontSize: {
                                    lg: "22px",
                                    md: "20px",
                                    sm: "18px",
                                    xs: "16px",
                                  },
                                  fontWeight: 400,
                                  lineHeight: "26px",
                                  letterSpacing: "-0.02em",
                                  textAlign: "center",
                                }}
                              />
                            </ListItemText>
                          </>
                        )}
                      </ListItem>
                      {all__brands?.data?.brands?.length &&
                      index != all__brands?.data?.brands?.length - 1 ? (
                        <Divider
                          sx={{ margin: 0 }}
                          variant="inset"
                          component="li"
                        />
                      ) : null}
                    </Link>
                  ))
                : null}
            </List>
          ) : (
            <EmptyData sx={{ marginTop: "8px" }} />
          )}
          <Grid
            spacing={2}
            container
            sx={{ width: "100%", margin: "0 auto", padding: "17px 0 32px 0" }}
          >
            <Grid
              item
              xs={12}
              sx={{
                padding: "0 !important",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Suspense>
                <BasicPagination
                  dataSource="brands"
                  count={all__brands?.data?.pagination?.pages}
                  page={parseInt(all__brands?.data?.pagination?.current) + 1}
                />
              </Suspense>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <List sx={{ ...listSx, marginBottom: "32px" }}>
            <ListItem alignItems="center" key={-1} sx={liHeaderSx}>
              <Box
                sx={{
                  ...liHeaderTextSx,
                  textAlign: "center !important",
                  minWidth: "30px",
                  marginRight: "16px",
                }}
              >
                <Skeleton variant="rectangular" width={20} height={20} />
              </Box>
              <Box sx={{ ...liHeaderTextSx, minWidth: "490px" }}>
                <Skeleton variant="rectangular" width={56} height={20} />
              </Box>
              <Box sx={{ ...liHeaderTextSx, minWidth: "400px" }}>
                <Skeleton variant="rectangular" width={56} height={20} />
              </Box>
              <Box sx={{ ...liHeaderTextSx, minWidth: "180px" }}>
                <Skeleton variant="rectangular" width={56} height={20} />
              </Box>
            </ListItem>
            {fakeBrands?.map((i) => (
              <Box key={i}>
                <ListItem key={i} alignItems="center" sx={liSx}>
                  <ListItemText sx={{ maxWidth: 30, marginRight: "16px" }}>
                    <Skeleton variant="rectangular" width={20} height={20} />
                  </ListItemText>

                  <ListItemAvatar
                    sx={{ ...liAvatarWrapper, borderRadius: "8px" }}
                  >
                    <Skeleton variant="rectangular" sx={liAvatarSx} />
                  </ListItemAvatar>

                  <ListItemText
                    className="brand_name"
                    sx={{ marginLeft: "24px", minWidth: "380px" }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={100}
                      height={20}
                      sx={{ marginBottom: "5px" }}
                    />
                    <Skeleton variant="rectangular" width={80} height={18} />
                  </ListItemText>

                  <ListItemText sx={{ minWidth: "400px" }}>
                    <Skeleton variant="rectangular" width={56} height={20} />
                  </ListItemText>
                  <ListItemText sx={{ minWidth: "180px" }}>
                    <Skeleton variant="rectangular" width={56} height={20} />
                  </ListItemText>
                </ListItem>
              </Box>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}
