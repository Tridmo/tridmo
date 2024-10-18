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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInteriors,
  selectAllInteriors,
} from "../../../data/get_all_interiors";
import { getAllStyles } from "../../../data/get_all_styles";
import { set_interiors_name, setPageFilter } from "../../../data/handle_filters";
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
  const pathname = usePathname();
  const router = useRouter();
  const all__interiors = useSelector(selectAllInteriors);
  const keyword = searchParams.get("name") as string;
  const page = searchParams.get("page") as string;
  const matches = useMediaQuery('(max-width:743px)');
  const mdScreen = useMediaQuery("(max-width:900px)");
  const [searchValue, setSearchValue] = useState('')
  
  const IsFilterOpen = useSelector((state: any) => state?.modal_checker?.isFilterModal);
  const getInteriorsStatus = useSelector((state: any) => state?.get_all_interiors?.status);
  const getInteriorCategoryFilter = useSelector((state: any) => state?.handle_filters?.interior_categories);
  const getInteriorNameFilter = useSelector((state: any) => state?.handle_filters?.interiors_name);
  const getInteriorPageFilter = useSelector((state: any) => state?.handle_filters?.interiors_page);

  useEffect(() => {
    setSearchValue(searchParams.get('name') as string)
  }, [searchParams.toString()])
  
  const removeFromQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)
      return params.toString()
    },
    [searchParams]
  )

  async function clearSearch() {
    dispatch(set_interiors_name(''))
    dispatch(
      getAllInteriors({
        categories: getInteriorCategoryFilter,
        page: page || getInteriorPageFilter,
        name: '',
        limit: interiorsLimit,
      })
    )
    const newQuery = removeFromQuery('name')
    router.push(`${pathname}?${newQuery}`)
    setSearchValue('')
  }

  React.useEffect(() => {
    if (getInteriorsStatus === "idle") {
      dispatch(setPageFilter({ p: "interiors_page", n: parseInt(page) }));
      dispatch(
        getAllInteriors({
          categories: getInteriorCategoryFilter,
          page: page || getInteriorPageFilter,
          name: searchValue || getInteriorNameFilter,
          limit: interiorsLimit,
        })
      );
    }
    // if (StyleStatus === "idle") {
    //   dispatch(getAllStyles());
    // }
  }, [
    getInteriorPageFilter,
    getInteriorCategoryFilter,
    getInteriorsStatus,
  ]);

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
      <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
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

        
        <Grid item lg={9.5} md={9.5} sm={12} xs={12} sx={{ p: { lg: "0 0 0 16px", md: '0 0 0 16px', sm: '0', xs: '0' }, minHeight: "90dvh" }}>
          {
            searchValue ?
              <Box sx={{ borderBottom: '1px solid #e0e0e0', padding: '0 8px 10px', marginBottom: '10px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <SimpleTypography text={`Интерьеры  «${searchValue}»`} className='prodcts__result--title' variant="h2" />
                  <Buttons onClick={clearSearch} sx={{ color: '#646464', minWidth: '30px', width: '30px', height: '30px', borderRadius: '50%' }}>
                    <Close />
                  </Buttons>
                </Box>
                <SimpleTypography text={`найдено ${all__interiors?.data?.pagination?.data_count} результатов`} className='products__result--text' variant="h2" />
              </Box>
              : null
          }

          <Grid
            container
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #e0e0e0",
              marginBottom: "20px",
              paddingBottom:"10px",
            }}
          >
            
            <Grid item lg={12} md={9} sm={9} xs={9}>
              <Sorts route={'interiors'} dataCount={
                <Grid
                  sx={{ padding: "0 !important", display: "flex", alignItems: "baseline" }}
                >
                  <p>
                    <SimpleTypography
                      text={`Показаны ${dataItemIndex<string>(
                        all__interiors?.data?.pagination?.limit,
                        all__interiors?.data?.pagination?.current,
                        1
                      ) || 0
                        }–${dataItemIndex<string>(
                          all__interiors?.data?.pagination?.limit,
                          all__interiors?.data?.pagination?.current,
                          all__interiors?.data?.interiors?.length
                        ) || 0
                        } из ${all__interiors?.data?.pagination?.data_count || 0} интерьеров`}
                      className='pagenation__desc'
                    />
                  </p>
                </Grid>
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
