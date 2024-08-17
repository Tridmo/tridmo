"use client"

import React, { Suspense, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, useMediaQuery } from '@mui/material'
import SimpleCard from '../../simple_card'
import SimpleTypography from '../../typography'
import BasicPagination from '../../pagination/pagination'
import { getAllInteriors, selectAllInteriors } from '../../../data/get_all_interiors';
import { useSearchParams } from 'next/navigation'
import { searchInteriors, setSearchVal } from '../../../data/search_interior'
import Sorts from '../../views/sorts'
import InteriorCategories from '../../views/categories/interior_categories'
import InteriorStyles from '../../views/styles/interior_styles'
import { dataItemIndex } from '../../../utils/utils'
import { interiorsLimit } from '../../../types/filters'
import { getAllStyles } from '../../../data/get_all_styles'
import { setPageFilter } from '../../../data/handle_filters'


export default function InteriorsPage() {
  const dispatch = useDispatch<any>();
  const searchParams = useSearchParams();
  const IsFilterOpen = useSelector((state: any) => state?.modal_checker?.isFilterModal)
  const searchedInteriors = useSelector((state: any) => state?.search_interiors?.data)
  const StyleStatus = useSelector((state: any) => state?.get_all_styles?.status)
  const getInteriorsStatus = useSelector((state: any) => state?.get_all_interiors?.status);
  const getInteriorCategoryFilter = useSelector((state: any) => state?.handle_filters?.interior_categories)
  const getInteriorPageFilter = useSelector((state: any) => state?.handle_filters?.interiors_page)
  const matches = useMediaQuery('(max-width:600px)');
  const all__interiors = useSelector(selectAllInteriors)
  const keyword = searchParams.get('name') as string
  const page = searchParams.get('page') as string

  React.useEffect(() => {
    if (getInteriorsStatus === "idle") {
      dispatch(setPageFilter({ p: 'interiors_page', n: parseInt(page) }))
      dispatch(getAllInteriors({
        categories: getInteriorCategoryFilter,
        page: page || getInteriorPageFilter,
        limit: interiorsLimit,
      }))
    }
    if (StyleStatus === "idle") {
      dispatch(getAllStyles());
    }
  }, [getInteriorPageFilter, getInteriorCategoryFilter, StyleStatus, getInteriorsStatus])

  useMemo(() => {
    dispatch(setSearchVal(keyword))
  }, [keyword])

  return (
    <Box sx={{ width: '1200px', minHeight: '80dvh', display: "block", margin: "0 auto 32px auto" }}>
      <Grid spacing={2} container sx={{ marginTop: "32px", marginLeft: 0 }} >
        <Grid item className='models-page__filters' md={2.2} xs={12} sx={matches ? { paddingRight: "10px", borderRight: "1px solid #b3b3b3", transform: `translate(-50%,${IsFilterOpen ? "-50%" : "-200%"})` } : { paddingRight: "10px", borderRight: "1px solid #b3b3b3", }}>

          <Suspense>
            <Box className='models-page__filters--child'>
              <Box className='models-page__filters--box'>
                <InteriorCategories />
              </Box>

            </Box>
          </Suspense>

        </Grid>
        <Grid item xs={9.5} style={{ padding: "0 0 0 16px" }} sx={{ minHeight: "100vh" }}>
          {
            keyword ?
              <Box sx={{ borderBottom: '1px solid #e0e0e0', padding: '0 8px 10px', marginBottom: '10px' }}>
                <SimpleTypography text={`Интерьеры «${keyword}»`} className='prodcts__result--title' variant="h2" />
                <SimpleTypography text={`найдено ${searchedInteriors?.pagination?.data_count} результатов`} className='products__result--text' variant="h2" />
              </Box>
              : null
          }

          <Sorts route={'interiors'} dataCount={
            <Box
              sx={{ padding: "0 !important", display: "flex", alignItems: "baseline" }}
            >
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
                  } из`}
                className='pagenation__desc'
              />

              <SimpleTypography
                text={`${all__interiors?.data?.pagination?.data_count || 0} интерьеров`}
                className='pagenation__desc--bold' />
            </Box>
          } />

          {/* ---- MODEL CARDS ---- */}

          <SimpleCard cols={4} route='interiors' cardImgHeight={'208px'} />

          {/* ---- MODEL CARDS ---- */}

          <Grid spacing={2} container sx={{ width: '100%', margin: "0 auto", padding: "32px 0 0 0" }}>
            <Grid item xs={12}
              sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }}
            >
              <Suspense>
                <BasicPagination
                  dataSource='interiors'
                  count={all__interiors?.data?.pagination?.pages}
                  page={parseInt(all__interiors?.data?.pagination?.current) + 1}
                />
              </Suspense>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Box>
  )
}
