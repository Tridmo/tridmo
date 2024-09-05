"use client"

import * as React from 'react'
import { Box, Divider, Grid, useMediaQuery } from '@mui/material';
import ProductSlider from '../../../views/model/slider';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfo from '../../../views/model/info'
import ProductModal from '../../../views/model/model_modal';
import SimpleTypography from '../../../typography';
import CustomCard from '../../../custom_card';
import { sampleModel } from '@/data/samples';
import Link from 'next/link';
import Buttons from '@/components/buttons';
import { selectOneModel } from '../../../../data/get_one_model';
import IconBreadcrumbs from '../../../breadcrumbs';
import { selectBrandModels } from '../../../../data/get_brand_models';
import { getSimilarModels, selectSimilarModels } from '../../../../data/get_all_models';
import { ContainerStyle } from '../../../../styles/styles';


export default function OneModel() {
  const dispatch = useDispatch<any>()
  const model = useSelector(selectOneModel);
  const similarModelsData = useSelector(selectSimilarModels)
  const [similarModels, setSimilarModels] = React.useState<any[]>([])
  const [showLoadButton, setShowLoadButton] = React.useState<boolean>(true)
  const [loadingMore, setLoadingMore] = React.useState<boolean>(false)
  const xxsScreen = useMediaQuery('(max-width:480px)');
  const fetchLimit = 4

  React.useEffect(() => {
    if (model) {
      dispatch(getSimilarModels({
        categories: [model?.category_id],
        exclude_models: [model?.id],
        limit: fetchLimit
      }))
    }
  }, [model])

  React.useMemo(() => {
    if (similarModelsData) {
      setSimilarModels(prev => {
        const existingIds = new Set(prev.map((m) => m?.id));
        const newModels = similarModelsData?.data?.models?.filter((m) => !existingIds.has(m?.id) && m?.id != model?.id);
        return [...prev, ...newModels];
      })
      setLoadingMore(false)
    }
  }, [similarModelsData])

  React.useMemo(() => {
    setShowLoadButton(similarModels.length % fetchLimit == 0);
  }, [similarModels])

  function fetchMoreSimilarModels(props?: { page?, limit?}) {
    setLoadingMore(true)
    dispatch(getSimilarModels({
      limit: props?.limit || fetchLimit,
      categories: [model?.category_id],
      exclude_models: [model?.id],
      page: props?.page || similarModelsData?.data?.pagination?.next + 1,
    }))
  }

  function shrinkSimilarModels() {
    setSimilarModels(prev => prev.slice(0, fetchLimit))
    fetchMoreSimilarModels({ page: 1 })
  }

  return (
    <Box sx={ContainerStyle}>
      <ProductModal />
      <Box sx={{ marginTop: '32px' }}>
        <IconBreadcrumbs route={"/models/?page=1"} breadCrumbsData={model} />
      </Box>

      <Grid
        className='products__grid'
        container
        sx={{
          marginTop: '6px',
          width: "100%",
          paddingBottom: "18px",
          justifyContent: 'space-between'
        }}
      >
        <Grid item
          lg={6.7}
          md={6.7}
          sm={12}
          xs={12}
        // sx={{ maxWidth: smScreen ? '100% !important' : 'auto' }}
        >
          <ProductSlider />
        </Grid>
        <Grid item
          lg={5.2}
          md={5.2}
          sm={12}
          xs={12}
        // sx={{ maxWidth: smScreen ? '100% !important' : 'auto' }}
        >
          <ProductInfo />
        </Grid>
      </Grid>

      {/* Similar MODELS */}
      {similarModels?.length > 0 && (
        <>
          <Divider sx={{ marginBottom: '32px' }} />
          <Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: 'flex-start',
                mb: '24px',
              }}
              className="texts__wrap"
            >
              <SimpleTypography
                text="Похожие модели"
                className="section__title"
                variant="h2"
              />
            </Box>

            <Grid sx={{ mb: "24px" }}>
              <Grid className="models__card--wrap" container spacing={1} sx={{ width: "100%", margin: "0" }}>
                {similarModels?.map((model: any, index: any) => (
                  <Grid
                    className='models__card'
                    key={index}
                    md={12 / fetchLimit}
                    sm={4}
                    xs={6}
                    item
                  >
                    <CustomCard
                      type={'/models'}
                      link={`/models/${model?.slug}`}
                      key={index}
                      model={model}
                      imgHeight={{ lg: '154px', md: '208px', sm: '208px', xs: '208px' }}
                      tagIcon={model?.top ? '/icons/star.svg' : ''}
                    />
                  </Grid>
                ))
                }
              </Grid >
            </Grid>

            <Box
              sx={{
                width: '100%',
                display: "flex",
                justifyContent: 'center',
                mb: '24px',
              }}
            >
              {
                showLoadButton ?
                  <Buttons
                    onClick={() => fetchMoreSimilarModels()}
                    name={"Показать больше"}
                    endIcon={loadingMore ? 'loading' : 'down'}
                    className={`bordered__btn--explore`}
                  />
                  : <Buttons
                    onClick={shrinkSimilarModels}
                    name={"Показать меньше"}
                    endIcon={"up"}
                    className={`bordered__btn--explore`}
                  />
              }
            </Box>

          </Grid>
        </>
      )}

      {/* INTERIORS */}
      {model?.used_interiors?.length > 0 && model?.used_interiors[0] != null && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "37px"
            }}
          >
            <SimpleTypography
              text="Использованные интерьеры"
              className='section__title products__used--title'
              variant="h2"
            />
          </Box>
          <Grid className="models__card--wrap" container spacing={1} sx={{ width: "100%", margin: "0 0 24px 0" }}>
            {model?.used_interiors?.map((interior: any, index: any) => (
              <Grid
                className='models__card'
                key={index}
                md={3}
                sm={4}
                xs={xxsScreen ? 12 : 6}
                item
              >
                <CustomCard
                  type={'interiors'}
                  link={`/interiors/${interior?.interior?.slug}`}
                  key={index}
                  model={interior?.interior}
                  imgHeight={{ lg: '268px', md: '268px', sm: '268px', xs: '268px' }}
                />
              </Grid>
            ))
            }
          </Grid >
        </>
      )}
    </Box>
  )
}
