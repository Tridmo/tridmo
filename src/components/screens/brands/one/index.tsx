"use client"

import * as React from 'react'
import { Box, Divider, Grid, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../../typography';
import CustomCard from '../../../custom_card';
import BrandInfo from '@/components/views/brand/info';
import Image from 'next/image';
import { getOneBrand, selectOneBrand } from '../../../../data/get_one_brand';
import { getBrandModels, selectBrandModels } from '../../../../data/get_brand_models';
import { IMAGES_BASE_URL } from '../../../../utils/env_vars';
import SimpleCard from '../../../simple_card';
import BasicPagination from '../../../pagination/pagination';
import SimpleSelect from '../../../inputs/simple_select';
import { getBrandCategories, selectBrandCategories } from '../../../../data/categories';
import { setBrandModelsCategory } from '../../../../data/handle_filters';
import { useParams, useSearchParams } from 'next/navigation';
import { brandModelsLimit } from '../../../../types/filters';


export default function OneBrand() {
  const dispatch = useDispatch<any>()
  const brandModels = useSelector(selectBrandModels)
  const brandCategories = useSelector(selectBrandCategories)
  const brand = useSelector(selectOneBrand)

  const [category, setCategory] = React.useState<string>('')

  React.useMemo(() => {
    if (!!category && category != 'all') {
      dispatch(setBrandModelsCategory([category]))
      dispatch(getBrandModels({
        brand_id: brand?.id,
        categories: [category]
      }))
    }
    else if (category == 'all') {
      dispatch(getBrandModels({
        brand_id: brand?.id
      }))
    }
  }, [category])

  return (
    <>
      <Box sx={{ background: "#fafafa" }} className="products">
        <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto 32px auto !important", alignItems: "center", }}>
          <Grid container sx={{ marginTop: "32px", marginLeft: 0 }} >

            <Grid item xs={4} sx={{ paddingRight: "10px" }}>
              <BrandInfo />
            </Grid >

            <Grid item xs={8}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', }}>
                  <Box sx={{ display: 'flex' }}>
                    <SimpleTypography
                      text={`Продукция бренда `}
                      className="section__title"
                      variant="h2"
                    />
                    <SimpleTypography
                      sx={{ color: '#686868 !important', ml: '4px' }}
                      className="section__title"
                      text={` (${brandModels?.data?.pagination?.data_count || 0})`}
                    />
                  </Box>

                  <Box>
                    <SimpleSelect
                      sx={{
                        maxWidth: '200px'
                      }}
                      name="category_id"
                      onChange={(e) => setCategory(e.target.value)}
                      placeholderText="Выберите категория"
                      value={category || "Выберите категория"}
                    >
                      <MenuItem key={-2} value={'all'}>{'Все'}</MenuItem>
                      {
                        brandCategories?.map(
                          (c, i) => (
                            <MenuItem key={i} value={c.id}>{c.name}</MenuItem>
                          )
                        )
                      }
                    </SimpleSelect>
                  </Box>
                </Box>

                <Box sx={{ mt: '16px' }}>
                  <SimpleCard route='brand_models' cols={4} cardImgHeight={'168px'} />
                </Box>

              </Box>
              {brandModels?.data?.models?.length > 0 ? (
                <Grid
                  item
                  xs={6}
                  sx={{
                    padding: "0 !important",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "center",
                    flexBasis: 'auto !important'
                  }}
                >
                  <React.Suspense>
                    <BasicPagination
                      dataSource='brand_models'
                      dataId={brand?.id}
                      count={brandModels?.data?.pagination?.pages}
                      page={parseInt(brandModels?.data?.pagination?.current) + 1}
                    />
                  </React.Suspense>
                </Grid>
              ) : null}

            </Grid>

          </Grid>
        </Box>
      </Box>

    </>
  )
}
