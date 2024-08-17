"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
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


export default function OneModel() {
  const dispatch = useDispatch<any>()
  const model = useSelector(selectOneModel);
  // const brandModels = useSelector(selectBrandModels)
  const similarModelsData = useSelector(selectSimilarModels)
  const [similarModels, setSimilarModels] = React.useState<any[]>([])
  const [showLoadButton, setShowLoadButton] = React.useState<boolean>(true)
  const [loadingMore, setLoadingMore] = React.useState<boolean>(false)

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
    setShowLoadButton(similarModels.length % 5 == 0);
  }, [similarModels])

  function fetchMoreSimilarModels(props?: { page?, limit?}) {
    setLoadingMore(true)
    dispatch(getSimilarModels({
      limit: props?.limit || 5,
      categories: [model?.category_id],
      exclude_models: [model?.id],
      page: props?.page || similarModelsData?.data?.pagination?.next + 1,
    }))
  }

  function shrinkSimilarModels() {
    setSimilarModels(prev => prev.slice(0, 5))
    fetchMoreSimilarModels({ page: 1 })
  }

  return (
    <>
      <Box sx={{ background: "#fafafa" }} className="products">
        <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
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
            <ProductModal />
            <ProductSlider name="slider" />
            <ProductInfo />
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
                  <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
                    {similarModels?.map((model: any, index: any) => (
                      <Grid
                        className='models__card'
                        sx={{
                          [`&:not(:nth-of-type(5n))`]: {
                            padding: "0 9.5px 0 0 !important",
                          },
                          [`&:nth-of-type(5n)`]: {
                            padding: "0 0 0 0 !important",
                          },
                          marginBottom: "10px"
                        }}
                        key={index}
                        md={12 / 5}
                        sm={4}
                        xs={6}
                        item
                      >
                        <CustomCard
                          type={'/models'}
                          link={`/models/${model?.slug}`}
                          key={index}
                          model={model}
                          imgHeight={'208px'}
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
              <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0 0 24px 0" }}>
                {model?.used_interiors?.map((interior: any, index: any) => (
                  <Grid
                    className='models__card'
                    sx={{
                      [`&:not(:nth-of-type(4n))`]: {
                        padding: "0 9.5px 0 0 !important",
                      },
                      [`&:nth-of-type(4n)`]: {
                        padding: "0 0 0 0 !important",
                      },
                      marginBottom: "10px"
                    }}
                    key={index}
                    md={12 / 4}
                    sm={4}
                    xs={6}
                    item
                  >
                    <CustomCard
                      type={'interiors'}
                      link={`/interiors/${interior?.interior?.slug}`}
                      key={index}
                      model={interior?.interior}
                      imgHeight={'268px'}
                      withAuthor={true}
                    />
                  </Grid>
                ))
                }
              </Grid >
            </>
          )}
        </Box>
      </Box>

    </>
  )
}
