"use client"

import {
  getAllCountries,
  selectAllCountries_status,
} from "@/data/get_all_countries";
import { Close, FilterAlt } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterBrands,
  selectFilterBrands_status,
} from "../../../data/get_all_brands";
import { getAllModels, selectAllModels } from "../../../data/get_all_models";
import { getAllStyles } from "../../../data/get_all_styles";
import {
  setModelNameFilter,
  setPageFilter,
} from "../../../data/handle_filters";
import { setFiltersModal } from "../../../data/modal_checker";
import { ContainerStyle } from "../../../styles/styles";
import { modelsLimit } from "../../../types/filters";
import { dataItemIndex } from "../../../utils/utils";
import Buttons from "../../buttons";
import BasicPagination from "../../pagination/pagination";
import SimpleCard from "../../simple_card";
import SimpleTypography from "../../typography";
import ModelFilters from "../../views/filters/models_filters";
import Sorts from "../../views/sorts";

export default function ModelsPage() {
  const IsFilterOpen = useSelector(
    (state: any) => state?.modal_checker?.isFilterModal
  );
  const smScreen = useMediaQuery("(max-width:600px)");
  const mdScreen = useMediaQuery("(max-width:960px)");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const getModelStatus = useSelector(
    (state: any) => state?.get_all_models?.status
  );
  const StyleStatus = useSelector(
    (state: any) => state?.get_all_styles?.status
  );
  const BrandsStatus = useSelector(selectFilterBrands_status);
  const CountriesStatus = useSelector(selectAllCountries_status);
  const all__models = useSelector(selectAllModels);
  const getModelCategoryFilter = useSelector(
    (state: any) => state?.handle_filters?.categories
  );
  const getModelBrandFilter = useSelector(
    (state: any) => state?.handle_filters?.model_brand
  );
  const getModelCountryFilter = useSelector(
    (state: any) => state?.handle_filters?.model_country
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
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue(searchParams.get("name") as string);
  }, [searchParams.toString()]);

  const removeFromQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (getModelStatus === "idle") {
      dispatch(setPageFilter({ p: "models_page", n: parseInt(page) }));
      dispatch(
        getAllModels({
          brand: getModelBrandFilter,
          categories: getModelCategoryFilter,
          country_id: getModelCountryFilter,
          colors: getModelColorFilter,
          styles: getModelStyleFilter,
          name: searchValue || getModelNameFilter,
          top: getModelTopFilter,
          page: page || getModelPageFilter,
          orderBy: getModelOrderBy,
          order: getModelOrder,
          limit: modelsLimit,
        })
      );
    }
    if (StyleStatus === "idle") {
      dispatch(getAllStyles());
    }

    if (BrandsStatus === "idle") {
      dispatch(getFilterBrands({ country_id: getModelCountryFilter }));
    }

    if (CountriesStatus === "idle") {
      dispatch(getAllCountries());
    }
  }, [
    dispatch,
    getModelStatus,
    StyleStatus,
    BrandsStatus,
    CountriesStatus,
    getModelCategoryFilter,
    getModelNameFilter,
    getModelColorFilter,
    getModelPageFilter,
    getModelStyleFilter,
  ]);

  async function clearSearch() {
    dispatch(setModelNameFilter(""));
    dispatch(
      getAllModels({
        brand: getModelBrandFilter,
        categories: getModelCategoryFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        name: "",
        top: getModelTopFilter,
        page: getModelPageFilter || 1,
        orderBy: getModelOrderBy,
        order: getModelOrder,
      })
    );
    const newQuery = removeFromQuery("name");
    router.push(`${pathname}?${newQuery}`);
    setSearchValue("");
  }

  return (
    <Box sx={ContainerStyle}>
      <SimpleTypography
        text="Модели"
        className="section__title"
        sx={{
          width: "100%",
          marginTop: "32px !important",
          marginBottom: { md: "32px !important", lg: "0 !important" },
          textAlign: "start",
        }}
      />

      <Grid
        spacing={{ lg: 2, md: 2, sm: 0, xs: 0 }}
        container
        sx={{ margin: "24px 0 !important" }}
      >
        {mdScreen ? (
          <Box>
            <React.Fragment>
              <SwipeableDrawer
                sx={
                  smScreen
                    ? {
                        "& .MuiDrawer-paper": {
                          width: "100%",
                          p: "24px",
                        },
                      }
                    : {
                        "& .MuiDrawer-paper": {
                          width: "300px",
                          p: "24px",
                        },
                      }
                }
                anchor={"left"}
                open={IsFilterOpen}
                onClose={() => dispatch(setFiltersModal(false))}
                onOpen={() => dispatch(setFiltersModal(true))}
              >
                <Box sx={{ width: "100%" }}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <SimpleTypography
                      text="Фильтры"
                      sx={{ fontSize: "28px" }}
                    />
                    <IconButton
                      onClick={() => dispatch(setFiltersModal(false))}
                    >
                      <Close />
                    </IconButton>
                  </Grid>
                  <ModelFilters />
                </Box>
              </SwipeableDrawer>
            </React.Fragment>
          </Box>
        ) : (
          <Grid
            item
            className="models-page__filters"
            md={2.2}
            xs={12}
            sx={{
              paddingRight: "10px",
              borderRight: "1px solid #b3b3b3",
            }}
          >
            <ModelFilters />
          </Grid>
        )}
        <Grid
          item
          lg={9.5}
          md={9.5}
          sm={12}
          xs={12}
          sx={{
            p: { lg: "0 0 0 16px", md: "0 0 0 16px", sm: "0", xs: "0" },
            minHeight: "90dvh",
          }}
        >
          {searchValue ? (
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
                  text={`Модели «${searchValue}»`}
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

          <Grid
            container
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #e0e0e0",
              marginBottom: "20px",
            }}
          >
            <Grid item lg={12} md={9} sm={9} xs={9}>
              <Sorts
                route={"models"}
                dataCount={
                  <Grid
                    sx={{
                      padding: "0 !important",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                  >
                    <p>
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
                        } из ${
                          all__models?.data?.pagination?.data_count || 0
                        } моделей`}
                        className="pagenation__desc"
                      />
                    </p>
                  </Grid>
                }
              />
            </Grid>
            {mdScreen && (
              <Grid
                md={3}
                sm={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Buttons
                  name={smScreen ? "" : "Фильтры"}
                  childrenFirst
                  className="bookmark__btn"
                  onClick={() => dispatch(setFiltersModal(true))}
                >
                  <FilterAlt />
                </Buttons>
              </Grid>
            )}
          </Grid>

          {/* ---- MODEL CARDS ---- */}

          <SimpleCard cols={5} route={"models"} cardImgHeight={"208px"} />

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
