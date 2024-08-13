"use client"

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, useMediaQuery } from '@mui/material'
import SimpleCard from '../../simple_card'
import SimpleTypography from '../../typography'
import Pagination from '../../pagination/pagination'
import Categories from '../../views/categories/model_categories'
import { getAllModels, selectAllModels } from '../../../data/get_all_models';
import Style from '../../views/styles/model_styles'
import { useRouter, useSearchParams } from 'next/navigation'
import { searchModels, setSearchVal } from '../../../data/search_model'
import { Close } from '@mui/icons-material'
import Buttons from '../../buttons'
import Sorts from '../../views/sorts'
import ModelCrumb from '../../breadcrumbs/model_crumb'
import { getAllStyles } from '../../../data/get_all_styles'
import { setModelNameFilter } from '../../../data/handle_filters'
import { useNavigate } from 'react-router-dom'
import { modelsLimit } from '../../../types/filters'
import { dataItemIndex } from '../../../utils/utils'

export default function ModelsPage() {
  const IsFilterOpen = useSelector((state: any) => state?.modal_checker?.isFilterModal)
  const searchedModels = useSelector((state: any) => state?.search_models?.data)
  const matches = useMediaQuery('(max-width:600px)');

  const searchParams = useSearchParams();
  const dispatch = useDispatch<any>();
  const router = useRouter();


  // ---- intial staters ---- //

  const getModelStatus = useSelector((state: any) => state?.get_all_models?.status);
  const getColorStatus = useSelector((state: any) => state?.get_all_colors?.status);
  const StyleStatus = useSelector((state: any) => state?.get_all_styles?.status)
  const all__models = useSelector(selectAllModels)

  // ---- filters selector ----- //

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelBrandFilter = useSelector((state: any) => state?.handle_filters?.model_brand)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)
  const getModelTopFilter = useSelector((state: any) => state?.handle_filters?.model_top)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.model_name)
  const getModelOrderBy = useSelector((state: any) => state?.handle_filters?.model_orderby)
  const getModelOrder = useSelector((state: any) => state?.handle_filters?.model_order)

  const [keyword, setKeyword] = useState(getModelNameFilter)

  useEffect(() => {
    setKeyword(getModelNameFilter)
  }, [getModelNameFilter])

  useEffect(() => {
    if (getModelStatus === "idle") {
      dispatch(getAllModels({
        brand: getModelBrandFilter,
        categories: getModelCategoryFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        name: getModelNameFilter,
        top: getModelTopFilter,
        page: getModelPageFilter,
        orderBy: getModelOrderBy,
        order: getModelOrder,
        limit: modelsLimit
      }))
    }
    if (StyleStatus === "idle") {
      dispatch(getAllStyles());
    }

  }, [dispatch, getModelStatus, StyleStatus, getModelCategoryFilter, getModelNameFilter, getModelColorFilter, getModelPageFilter, getModelStyleFilter])


  async function clearSearch() {
    dispatch(setModelNameFilter(''))
    // setKeyword('')
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

  return (
    <Box sx={{ width: '1200px', minHeight: 829, display: "block", margin: "0 auto 32px auto" }}>

      <Grid spacing={2} container sx={{ marginTop: "32px", marginLeft: 0 }} >
        <Grid item className='models-page__filters' md={2.2} xs={12} sx={matches ? { paddingRight: "10px", borderRight: "1px solid #b3b3b3", transform: `translate(-50%,${IsFilterOpen ? "-50%" : "-200%"})` } : { paddingRight: "10px", borderRight: "1px solid #b3b3b3", }}>

          <Suspense>
            <Box className='models-page__filters--child'>
              <Box className='models-page__filters--box'>
                <Suspense>
                  <Categories />
                </Suspense>
              </Box>
              <Box className='models-page__filters--box'>

                <Suspense>
                  <Style />
                </Suspense>
              </Box>

            </Box>
          </Suspense>

        </Grid>
        <Grid item xs={9.5} style={{ padding: "0 0 0 16px" }} sx={{ minHeight: "100vh" }}>
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

          <Sorts route={'models'} dataCount={
            <Box
              sx={{ padding: "0 !important", display: "flex", alignItems: "baseline" }}
            >
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
                  } из`}
                className='pagenation__desc'
              />

              <SimpleTypography
                text={`${all__models?.data?.pagination?.data_count || 0} моделей`}
                className='pagenation__desc--bold' />
            </Box>
          } />

          {/* ---- MODEL CARDS ---- */}

          <SimpleCard cols={5} route={"models"} cardImgHeight={'154px'} />

          {/* ---- MODEL CARDS ---- */}

          <Grid spacing={2} container sx={{ width: '100%', margin: "0 auto", padding: "32px 0 0 0" }}>
            <Grid item xs={12}
              sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }}
            >
              <Pagination
                dataSource='models'
                count={all__models?.data?.pagination?.pages}
                page={parseInt(all__models?.data?.pagination?.current) + 1}
              />
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Box>
  )
}
