"use client";

import Buttons from "@/components/buttons";
import InteriorsFilters from "@/components/views/filters/interiors_filters";
import { setFiltersModal } from "@/data/modal_checker";
import { ContainerStyle } from "@/styles/styles";
import { Close, FilterAlt } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInteriors,
  selectAllInteriors,
} from "../../../data/get_all_interiors";
import { getAllStyles } from "../../../data/get_all_styles";
import { setPageFilter } from "../../../data/handle_filters";
import { setSearchVal } from "../../../data/search_interior";
import { interiorsLimit } from "../../../types/filters";
import { dataItemIndex } from "../../../utils/utils";
import BasicPagination from "../../pagination/pagination";
import SimpleCard from "../../simple_card";
import SimpleTypography from "../../typography";
import InteriorCategories from "../../views/categories/interior_categories";
import Sorts from "../../views/sorts";

export default function InteriorsPage() {
  const dispatch = useDispatch<any>();
  const searchParams = useSearchParams();
  const matches = useMediaQuery('(max-width:743px)');

  const IsFilterOpen = useSelector(
    (state: any) => state?.modal_checker?.isFilterModal
  );
  const searchedInteriors = useSelector(
    (state: any) => state?.search_interiors?.data
  );
  const StyleStatus = useSelector(
    (state: any) => state?.get_all_styles?.status
  );
  const getInteriorsStatus = useSelector(
    (state: any) => state?.get_all_interiors?.status
  );
  const getInteriorCategoryFilter = useSelector(
    (state: any) => state?.handle_filters?.interior_categories
  );
  const getInteriorPageFilter = useSelector(
    (state: any) => state?.handle_filters?.interiors_page
  );
  const all__interiors = useSelector(selectAllInteriors);
  const keyword = searchParams.get("name") as string;
  const page = searchParams.get("page") as string;
  const mdScreen = useMediaQuery("(max-width:900px)");
  const smScreen = useMediaQuery("(max-width:600px)");

  const width = window.outerWidth;

  React.useEffect(() => {
    if (getInteriorsStatus === "idle") {
      dispatch(setPageFilter({ p: "interiors_page", n: parseInt(page) }));
      dispatch(
        getAllInteriors({
          categories: getInteriorCategoryFilter,
          page: page || getInteriorPageFilter,
          limit: interiorsLimit,
        })
      );
    }
    if (StyleStatus === "idle") {
      dispatch(getAllStyles());
    }
  }, [
    getInteriorPageFilter,
    getInteriorCategoryFilter,
    StyleStatus,
    getInteriorsStatus,
  ]);

  useMemo(() => {
    dispatch(setSearchVal(keyword));
  }, [keyword]);

  return (
    <Box sx={ContainerStyle}>
      <SimpleTypography
        text="Интерьеры"
        className="section__title"
        sx={{
          width: "100%",
          marginTop: "32px !important",
          marginBottom: { md: "32px !important" },
          textAlign: "start",
        }}
      />
      <Grid spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
        {mdScreen ? (
          <Box>
            <React.Fragment>
              <SwipeableDrawer
                anchor={"left"}
                open={IsFilterOpen}
                onClose={() => dispatch(setFiltersModal(false))}
                onOpen={() => dispatch(setFiltersModal(true))}
              >
                <Box sx={{ width: "100%", padding: "24px" }}>
                  <Grid
                    item
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
                  <InteriorsFilters />
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
            <Suspense>
              <Box className="models-page__filters--child">
                <Box className="models-page__filters--box">
                  <InteriorCategories />
                </Box>
              </Box>
            </Suspense>
          </Grid>
        )}

        <Grid
          container
          item
          md={9.5}
          sm={12}
          xs={12}
          sx={{
            maxWidth: "100vw",
            padding: { md: "0 0 0 16px", sm: "0 16px 0 16px", xs: "0" },
          }}
        >
          {keyword ? (
            <Box
              sx={{
                borderBottom: "1px solid #e0e0e0",
                padding: "0 8px 10px",
                marginBottom: "10px",
              }}
            >
              <SimpleTypography
                text={`Интерьеры «${keyword}»`}
                className="prodcts__result--title"
                variant="h2"
              />
              <SimpleTypography
                text={`найдено ${searchedInteriors?.pagination?.data_count} результатов`}
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
              paddingBottom: { xs: "10px", sm: 0 },
            }}
          >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Sorts route={'interiors'} dataCount={
                <>
                  <p style={{ margin: matches ? '0 0 auto 0' : 'auto 0' }}>
                    <SimpleTypography
                      text={`Показаны ${dataItemIndex<string>(
                        all__interiors?.data?.pagination?.limit,
                        all__interiors?.data?.pagination?.current,
                        1
                      ) || 0
                        }–${dataItemIndex<string>(
                          all__interiors?.data?.pagination?.limit,
                          all__interiors?.data?.pagination?.current,
                          all__interiors?.data?.models?.length
                        ) || 0
                        } из ${all__interiors?.data?.pagination?.data_count || 0
                        } моделей`}
                      className="pagenation__desc"
                    />
                  </p>
                  {
                    matches &&
                    <Buttons
                      name={'Фильтры'}
                      childrenFirst
                      className='bookmark__btn'
                      onClick={() => dispatch(setFiltersModal(true))}
                    >
                      <FilterAlt />
                    </Buttons>

                  }
                </>
              } />
            </Grid>

            {(mdScreen && !matches) && (
              <Grid
                md={3}
                sx={{
                  width: '100%',
                  marginBottom: 1,
                  display: { md: "flex", sm: 'flex', xs: 'none' },
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Buttons
                  name={'Фильтры'}
                  childrenFirst
                  className='bookmark__btn'
                  onClick={() => dispatch(setFiltersModal(true))}
                >
                  <FilterAlt />
                </Buttons>
              </Grid>
            )}
          </Grid>

          {/* ---- MODEL CARDS ---- */}

          <SimpleCard
            cols={4}
            route="interiors"
            cardImgHeight={
              mdScreen
                ? {
                  xs: "156px",
                }
                : null
            }
          />

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
                  dataSource="interiors"
                  count={all__interiors?.data?.pagination?.pages}
                  page={parseInt(all__interiors?.data?.pagination?.current) + 1}
                />
              </Suspense>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
