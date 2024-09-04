"use client";

import { selectAllBrands } from "@/data/get_all_brands";
import { liAvatarSx } from "@/styles/styles";
import { IMAGES_BASE_URL } from "@/utils/env_vars";
import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllModels, selectAllModels } from "../../../data/get_all_models";
import { getAllStyles } from "../../../data/get_all_styles";
import {
  setModelNameFilter,
  setPageFilter,
} from "../../../data/handle_filters";
import { modelsLimit } from "../../../types/filters";
import { dataItemIndex } from "../../../utils/utils";
import Buttons from "../../buttons";
import BasicPagination from "../../pagination/pagination";
import SimpleCard from "../../simple_card";
import SimpleTypography from "../../typography";
import Categories from "../../views/categories/model_categories";
import Sorts from "../../views/sorts";
import Style from "../../views/styles/model_styles";

export default function ModelsPage() {
  const IsFilterOpen = useSelector(
    (state: any) => state?.modal_checker?.isFilterModal
  );
  const searchedModels = useSelector(
    (state: any) => state?.search_models?.data
  );
  const matches = useMediaQuery("(max-width:600px)");
  const searchParams = useSearchParams();
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const getModelStatus = useSelector(
    (state: any) => state?.get_all_models?.status
  );
  const getColorStatus = useSelector(
    (state: any) => state?.get_all_colors?.status
  );
  const StyleStatus = useSelector(
    (state: any) => state?.get_all_styles?.status
  );
  const all__models = useSelector(selectAllModels);
  const getModelCategoryFilter = useSelector(
    (state: any) => state?.handle_filters?.categories
  );
  const getModelBrandFilter = useSelector(
    (state: any) => state?.handle_filters?.model_brand
  );
  const getModelCategoryNameFilter = useSelector(
    (state: any) => state?.handle_filters?.category_name
  );
  const getModelColorFilter = useSelector(
    (state: any) => state?.handle_filters?.colors
  );
  const getModelStyleFilter = useSelector(
    (state: any) => state?.handle_filters?.styles
  );
  const getModelPageFilter = useSelector(
    (state: any) => state?.handle_filters?.models_page
  );
  const getModelTopFilter = useSelector(
    (state: any) => state?.handle_filters?.model_top
  );
  const getModelNameFilter = useSelector(
    (state: any) => state?.handle_filters?.model_name
  );
  const getModelOrderBy = useSelector(
    (state: any) => state?.handle_filters?.model_orderby
  );
  const getModelOrder = useSelector(
    (state: any) => state?.handle_filters?.model_order
  );
  const page = searchParams.get("page") as string;
  const [keyword, setKeyword] = useState(getModelNameFilter);

  useEffect(() => {
    setKeyword(getModelNameFilter);
  }, [getModelNameFilter]);

  useEffect(() => {
    if (getModelStatus === "idle") {
      dispatch(setPageFilter({ p: "models_page", n: parseInt(page) }));
      dispatch(
        getAllModels({
          brand: getModelBrandFilter,
          categories: getModelCategoryFilter,
          colors: getModelColorFilter,
          styles: getModelStyleFilter,
          name: getModelNameFilter,
          top: getModelTopFilter,
          page: searchParams.get("page") || getModelPageFilter,
          orderBy: getModelOrderBy,
          order: getModelOrder,
          limit: modelsLimit,
        })
      );
    }
    if (StyleStatus === "idle") {
      dispatch(getAllStyles());
    }
  }, [
    dispatch,
    getModelStatus,
    StyleStatus,
    getModelCategoryFilter,
    getModelNameFilter,
    getModelColorFilter,
    getModelPageFilter,
    getModelStyleFilter,
  ]);

  async function clearSearch() {
    dispatch(setModelNameFilter(""));
    // setKeyword('')
    dispatch(
      getAllModels({
        brand: getModelBrandFilter,
        categories: getModelCategoryFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        name: "",
        top: getModelTopFilter,
        page: getModelPageFilter,
        orderBy: getModelOrderBy,
        order: getModelOrder,
      })
    );
    window.history.replaceState(
      { ...window.history.state, as: "/models", url: "/models" },
      "",
      "/models"
    );
  }

  const getAllBrandStatus = useSelector(
    (state: any) => state?.get_all_brands?.status
  );
  const all__brands = useSelector(selectAllBrands);
  const smallScreen = useMediaQuery("(max-width:768px)");

  const fakeBrands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
    <Box
      sx={{
        width: "1200px",
        minHeight: 829,
        display: "block",
        margin: "0 auto 32px auto",
      }}
    >
      <Grid spacing={2} container sx={{ marginTop: "32px", marginLeft: 0 }}>
        <Grid
          item
          className="models-page__filters"
          md={2.2}
          xs={12}
          sx={
            matches
              ? {
                  paddingRight: "10px",
                  borderRight: "1px solid #b3b3b3",
                  transform: `translate(-50%,${
                    IsFilterOpen ? "-50%" : "-200%"
                  })`,
                }
              : { paddingRight: "10px", borderRight: "1px solid #b3b3b3" }
          }
        >
          <Suspense>
            <Box className="models-page__filters--child">
              <Box className="models-page__filters--box">
                <Suspense>
                  <Categories />
                </Suspense>
              </Box>
              <Box className="models-page__filters--box">
                <Suspense>
                  <Style />
                </Suspense>
              </Box>
              <Box className="models-page__filters--box">
                <Suspense>
                  <SimpleTypography text="Бренды" className="section__title" sx={{marginTop: "16px"}} />
                  {getAllBrandStatus === "succeeded" ? (
                    <>
                      <List>
                        {all__brands?.data?.brands &&
                        all__brands?.data?.brands?.length != 0
                          ? all__brands?.data?.brands?.map(
                              (brand, index: any) => (
                                <Link key={index} href={`/${brand?.slug}`}>
                                  <ListItem
                                    key={index}
                                    alignItems="center"
                                    sx={{ paddingInline: "0" }}
                                  >
                                    <ListItemText
                                      sx={{
                                        m: 0,
                                        "& > span": {
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "flex-start",
                                        },
                                      }}
                                    >
                                      <ListItemAvatar
                                        sx={{
                                          minWidth: {
                                            lg: "40px",
                                            md: "40px",
                                            sm: "30px",
                                            xs: "30px",
                                          },
                                          maxWidth: {
                                            lg: "40px",
                                            md: "40px",
                                            sm: "30px",
                                            xs: "30px",
                                          },
                                          minHeight: {
                                            lg: "40px",
                                            md: "40px",
                                            sm: "30px",
                                            xs: "30px",
                                          },
                                          maxHeight: {
                                            lg: "40px",
                                            md: "40px",
                                            sm: "30px",
                                            xs: "30px",
                                          },

                                          border: "1px solid #E0E0E0",
                                          borderRadius: "50%",
                                        }}
                                      >
                                        <Avatar
                                          src={
                                            brand?.image_src
                                              ? `${IMAGES_BASE_URL}/${brand?.image_src}`
                                              : ""
                                          }
                                          alt="Landing image"
                                          sx={{
                                            ...liAvatarSx,
                                            borderRadius: "8px",
                                          }}
                                        />
                                      </ListItemAvatar>

                                      <ListItemText
                                        className="brand_name"
                                        sx={{
                                          marginLeft: {
                                            md: "16px",
                                            xs: "8px",
                                          },
                                        }}
                                      >
                                        <SimpleTypography
                                          text={brand?.name}
                                          sx={{
                                            fontSize: {
                                              lg: "16px",
                                              md: "16px",
                                              sm: "14px",
                                              xs: "14px",
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
                                            brand?.site_link.includes(
                                              "https://"
                                            ) ||
                                            brand?.site_link.includes("http://")
                                              ? brand?.site_link
                                                  .split("://")[1]
                                                  .replaceAll("/", "")
                                              : brand?.site_link
                                          }`}
                                          sx={{
                                            fontSize: {
                                              lg: "14px",
                                              md: "14px",
                                              sm: "12px",
                                              xs: "12px",
                                            },
                                            fontWeight: 400,
                                            letterSpacing: "-0.01em",
                                            textAlign: "start",
                                            color: "#848484",
                                          }}
                                        />
                                      </ListItemText>
                                    </ListItemText>
                                  </ListItem>
                                  {all__brands?.data?.brands?.length &&
                                  index !=
                                    all__brands?.data?.brands?.length - 1 ? (
                                    <Divider
                                      sx={{ margin: 0 }}
                                      variant="inset"
                                      component="li"
                                    />
                                  ) : null}
                                </Link>
                              )
                            )
                          : null}
                      </List>
                      {/* {all__brands?.data?.pagination?.pages > 1 ? (
                        <Grid
                          spacing={2}
                          container
                          sx={{
                            width: "100%",
                            margin: "0 auto",
                            padding: "17px 0 32px 0",
                          }}
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
                                page={
                                  parseInt(
                                    all__brands?.data?.pagination?.current
                                  ) + 1
                                }
                              />
                            </Suspense>
                          </Grid>
                        </Grid>
                      ) : null} */}
                    </>
                  ) : (
                    <>
                      <List sx={{ marginBottom: "32px" }}>
                        {fakeBrands?.map((i) => (
                          <Box key={i}>
                            <ListItem
                              key={i}
                              alignItems="center"
                              sx={{ paddingInline: "0" }}
                            >
                              <ListItemAvatar
                                sx={{
                                  minWidth: {
                                    lg: "40px",
                                    md: "40px",
                                    sm: "30px",
                                    xs: "30px",
                                  },
                                  maxWidth: {
                                    lg: "40px",
                                    md: "40px",
                                    sm: "30px",
                                    xs: "30px",
                                  },
                                  minHeight: {
                                    lg: "40px",
                                    md: "40px",
                                    sm: "30px",
                                    xs: "30px",
                                  },
                                  maxHeight: {
                                    lg: "40px",
                                    md: "40px",
                                    sm: "30px",
                                    xs: "30px",
                                  },

                                  border: "1px solid #E0E0E0",
                                  borderRadius: "50%",
                                }}
                              >
                                <Skeleton
                                  variant="rectangular"
                                  sx={liAvatarSx}
                                />
                              </ListItemAvatar>

                              <ListItemText
                                className="brand_name"
                                sx={{ marginLeft: "16px", minWidth: "380px" }}
                              >
                                <Skeleton
                                  variant="rectangular"
                                  width={100}
                                  height={20}
                                  sx={{ marginBottom: "5px" }}
                                />
                                <Skeleton
                                  variant="rectangular"
                                  width={80}
                                  height={18}
                                />
                              </ListItemText>
                            </ListItem>
                          </Box>
                        ))}
                      </List>
                    </>
                  )}
                </Suspense>
              </Box>
            </Box>
          </Suspense>
        </Grid>
        <Grid
          item
          xs={9.5}
          style={{ padding: "0 0 0 16px" }}
          sx={{ minHeight: "100vh" }}
        >
          {keyword ? (
            <Box
              sx={{
                borderBottom: "1px solid #e0e0e0",
                padding: "0 8px 10px",
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
                  text={`Модели «${keyword}»`}
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
                text={`найдено ${all__models?.data?.pagination?.data_count} результатов`}
                className="products__result--text"
                variant="h2"
              />
            </Box>
          ) : null}

          <Sorts
            route={"models"}
            dataCount={
              <Box
                sx={{
                  padding: "0 !important",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <SimpleTypography
                  text={`Показаны ${
                    dataItemIndex<string>(
                      all__models?.data?.pagination?.limit,
                      all__models?.data?.pagination?.current,
                      1
                    ) || 0
                  }–${
                    dataItemIndex<string>(
                      all__models?.data?.pagination?.limit,
                      all__models?.data?.pagination?.current,
                      all__models?.data?.models?.length
                    ) || 0
                  } из`}
                  className="pagenation__desc"
                />

                <SimpleTypography
                  text={`${
                    all__models?.data?.pagination?.data_count || 0
                  } моделей`}
                  className="pagenation__desc--bold"
                />
              </Box>
            }
          />

          {/* ---- MODEL CARDS ---- */}

          <SimpleCard cols={5} route={"models"} cardImgHeight={"154px"} />

          {/* ---- MODEL CARDS ---- */}

          <Grid
            spacing={2}
            container
            sx={{ width: "100%", margin: "0 auto", padding: "32px 0 0 0" }}
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
                  dataSource="models"
                  count={all__models?.data?.pagination?.pages}
                  page={parseInt(all__models?.data?.pagination?.current) + 1}
                />
              </Suspense>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
