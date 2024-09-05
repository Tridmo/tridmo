"use client"

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, useMediaQuery, IconButton, SwipeableDrawer } from '@mui/material'
import SimpleCard from '../../simple_card'
import SimpleTypography from '../../typography'
import BasicPagination from '../../pagination/pagination'
import Categories from '../../views/categories/model_categories'
import { getAllModels, selectAllModels } from '../../../data/get_all_models';
import Style from '../../views/styles/model_styles'
import { useRouter, useSearchParams } from 'next/navigation'
import { searchModels, setSearchVal } from '../../../data/search_model'
import { Close, FilterAlt } from '@mui/icons-material'
import Buttons from '../../buttons'
import Sorts from '../../views/sorts'
import ModelCrumb from '../../breadcrumbs/model_crumb'
import { getAllStyles } from '../../../data/get_all_styles'
import { setModelNameFilter, setPageFilter } from '../../../data/handle_filters'
import { useNavigate } from 'react-router-dom'
import { modelsLimit } from '../../../types/filters'
import { dataItemIndex } from '../../../utils/utils'
import { ContainerStyle } from '../../../styles/styles'
import { getAllBrands, selectAllBrands, selectAllBrands_status } from '../../../data/get_all_brands'
import BrandsFilter from '../../views/brands/brand_filter'
import { setFiltersModal } from '../../../data/modal_checker'
import ModelFilters from '../../views/filters/model_filters'

export default function ModelsPage() {
  const IsFilterOpen = useSelector((state: any) => state?.modal_checker?.isFilterModal)
  const searchedModels = useSelector((state: any) => state?.search_models?.data)
  const matches = useMediaQuery('(max-width:600px)');
  const mdScreen = useMediaQuery('(max-width:960px)');
  const searchParams = useSearchParams();
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const getModelStatus = useSelector((state: any) => state?.get_all_models?.status);
  const getColorStatus = useSelector((state: any) => state?.get_all_colors?.status);
  const StyleStatus = useSelector((state: any) => state?.get_all_styles?.status)
  const BrandsStatus = useSelector(selectAllBrands_status)
  const all__models = useSelector(selectAllModels)
  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelBrandFilter = useSelector((state: any) => state?.handle_filters?.model_brand)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.models_page)
  const getModelTopFilter = useSelector((state: any) => state?.handle_filters?.model_top)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.model_name)
  const getModelOrderBy = useSelector((state: any) => state?.handle_filters?.model_orderby)
  const getModelOrder = useSelector((state: any) => state?.handle_filters?.model_order)
  const page = searchParams.get('page') as string
  const [keyword, setKeyword] = useState(getModelNameFilter)

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

    if (BrandsStatus === "idle") {
      dispatch(getAllBrands());
    }

  }, [dispatch, getModelStatus, StyleStatus, BrandsStatus, getModelCategoryFilter, getModelNameFilter, getModelColorFilter, getModelPageFilter, getModelStyleFilter])


  async function clearSearch() {
    dispatch(setModelNameFilter(''))
    dispatch(getAllModels({
      brand: getModelBrandFilter,
      categories: getModelCategoryFilter,
      colors: getModelColorFilter,
      styles: getModelStyleFilter,
      name: '',
      top: getModelTopFilter,
      page: getModelPageFilter,
      orderBy: getModelOrderBy,
      order: getModelOrder,
    }))
    window.history.replaceState({ ...window.history.state, as: '/models', url: '/models' }, '', '/models');
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
    <Box sx={ContainerStyle}>
      <SimpleTypography text='Модели' className='section__title' sx={{ margin: '32px auto !important' }} />

      <Grid spacing={{ lg: 2, md: 2, sm: 0, xs: 0 }} container sx={{ margin: "24px 0 !important" }} >
        {
          mdScreen ? (
            <Box>
              <React.Fragment>
                <SwipeableDrawer
                  anchor={'left'}
                  open={IsFilterOpen}
                  onClose={() => dispatch(setFiltersModal(false))}
                  onOpen={() => dispatch(setFiltersModal(false))}
                >
                  <Box sx={{ width: '100%', p: '24px' }}>
                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <SimpleTypography text='Фильтры' sx={{ fontSize: '28px' }} />
                      <IconButton onClick={() => dispatch(setFiltersModal(false))}>
                        <Close />
                      </IconButton>
                    </Grid>
                    <ModelFilters />
                  </Box>
                </SwipeableDrawer>
              </React.Fragment>
            </Box>
          ) : (
            <Grid item className='models-page__filters' md={2.2} xs={12}
              sx={{
                paddingRight: "10px",
                borderRight: "1px solid #b3b3b3",
              }}>
              <ModelFilters />
            </Grid>
          )
        }
        <Grid item lg={9.5} md={9.5} sm={12} xs={12} sx={{ p: { lg: "0 0 0 16px", md: '0 0 0 16px', sm: '0', xs: '0' }, minHeight: "90dvh" }}>
          {
            keyword ?
              <Box sx={{ borderBottom: '1px solid #e0e0e0', padding: '0 8px 10px', marginBottom: '10px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <SimpleTypography text={`Модели «${keyword}»`} className='prodcts__result--title' variant="h2" />
                  <Buttons onClick={clearSearch} sx={{ color: '#646464', minWidth: '30px', width: '30px', height: '30px', borderRadius: '50%' }}>
                    <Close />
                  </Buttons>
                </Box>
                <SimpleTypography text={`найдено ${all__models?.data?.pagination?.data_count} результатов`} className='products__result--text' variant="h2" />
              </Box>
              : null
          }

          <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', marginBottom: "20px" }}>
            <Grid item lg={12} md={9} sm={9} xs={9}>
              <Sorts route={'models'} dataCount={
                <Grid
                  sx={{ padding: "0 !important", display: "flex", alignItems: "baseline" }}
                >
                  <p>
                    <SimpleTypography
                      text={`Показаны ${dataItemIndex<string>(
                        all__models?.data?.pagination?.limit,
                        all__models?.data?.pagination?.current,
                        1
                      ) || 0
                        }–${dataItemIndex<string>(
                          all__models?.data?.pagination?.limit,
                          all__models?.data?.pagination?.current,
                          all__models?.data?.models?.length
                        ) || 0
                        } из ${all__models?.data?.pagination?.data_count || 0} моделей`}
                      className='pagenation__desc'
                    />
                  </p>
                </Grid>
              } />
            </Grid>
            {
              mdScreen && (
                <Grid md={3} sm={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Buttons
                    name={matches ? '' : 'Фильтры'}
                    childrenFirst
                    className='bookmark__btn'
                    onClick={() => dispatch(setFiltersModal(true))}
                  >
                    <FilterAlt />
                  </Buttons>
                </Grid>
              )
            }
          </Grid>

          {/* ---- MODEL CARDS ---- */}

          <SimpleCard cols={5} route={"models"} cardImgHeight={{ lg: '154px', md: '208px', sm: '208px', xs: '208px' }} />

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
