import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Paper, styled } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Image from 'next/image';
import { ThemeProps } from '@/types/theme';
import SimpleTypography from '@/components/typography';
import Link from 'next/link';
import { getAllModels, selectAllModels } from '@/data/get_all_models';
import MyLoader from '../skeleton/Skeleton'
import CustomCard from '../custom_card';
import Skeleton from '@mui/material/Skeleton';
import { setLimitFilter } from '../../data/handle_filters';
import { selectAllInteriors } from '../../data/get_all_interiors';
import EmptyData from '../views/empty_data';
import CustomCardSkeleton from '../custom_card/skeleton';
import { selectAuthorInteriors } from '../../data/get_author_interiors';
import { selectMyInteriors } from '../../data/get_my_interiors';
import { selectBrandModels } from '../../data/get_brand_models';
import { selectSavedModels } from '../../data/get_saved_models';
import { selectSavedInteriors } from '../../data/get_saved_interiors';
import { selectMyProjects } from '../../data/get_my_projects';
import { selectLandingModels, selectLandingModels_status, selectLandingTopModels, selectLandingTopModels_status } from '../../data/get_landingpage_models';
import { landingModelsLimit } from '../../types/filters';
type InputProps = {
  route: string,
  sliced?: number,
  cols: number,
  cardImgHeight?: any,
  withAuthor?: boolean,
};
const heights = [208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208];
const Label = styled(Paper)(({ theme }: ThemeProps) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function SimpleCard(props: InputProps) {
  const dispatch = useDispatch<any>();
  const fakeModels = new Array(props?.sliced || 8).fill('');

  React.useEffect(() => {
    dispatch(setLimitFilter({ limit: 15 }))
  }, [])

  if (props?.route == 'models') {

    const all__models = useSelector(selectAllModels)
    const all__models__status = useSelector((state: any) => state?.get_all_models?.status)

    if (all__models__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__models__status === "loading") {
      return (

        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                link={`/${props?.route}`}
                key={index}
                model={model}
                imgHeight={props?.cardImgHeight || '208px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))}
        </Grid>

      )
    }

    if (all__models__status === "succeeded") {

      const data_sliced = props?.sliced ? all__models?.data?.models?.slice(0, props?.sliced) : all__models?.data?.models;

      return (
        data_sliced?.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  type={props?.route}
                  link={`/${props?.route}/${model?.slug}`}
                  key={index}
                  model={model}
                  imgHeight={props?.cardImgHeight || '208px'}
                  tagIcon={model?.top ? '/icons/star.svg' : ''}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

  if (props?.route == 'landing_models') {

    const models = useSelector(selectLandingModels)
    const top_models = useSelector(selectLandingTopModels)
    const models__status = useSelector(selectLandingModels_status)
    const top_models__status = useSelector(selectLandingTopModels_status)

    if (models__status === "failed" || top_models__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (models__status === "loading" || top_models__status === "loading") {
      return (

        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={'models'}
                link={`/models`}
                key={index}
                model={model}
                imgHeight={props?.cardImgHeight || '208px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))}
        </Grid>

      )
    }

    if (models__status === "succeeded" || top_models__status === "succeeded") {

      const top_length = landingModelsLimit - top_models?.length;
      const models_sliced = models?.slice(0, top_length);

      const data = top_models?.concat(models_sliced)

      return (
        data?.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  type={'models'}
                  link={`/models/${model?.slug}`}
                  key={index}
                  model={model}
                  imgHeight={props?.cardImgHeight || '208px'}
                  tagIcon={model?.top ? '/icons/star.svg' : ''}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

  if (props?.route == 'saved_models') {

    const all__models = useSelector(selectSavedModels)
    const all__models__status = useSelector((state: any) => state?.get_saved_models?.status)

    if (all__models__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__models__status === "loading") {
      return (

        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                link={`/${props?.route}`}
                key={index}
                model={model}
                imgHeight={props?.cardImgHeight || '208px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))}
        </Grid>

      )
    }

    if (all__models__status === "succeeded") {

      const data_sliced = props?.sliced ? all__models?.data?.models?.slice(0, props?.sliced) : all__models?.data?.models;

      return (
        data_sliced?.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  type={props?.route}
                  link={`/models/${model?.model?.slug}`}
                  key={index}
                  model={model?.model}
                  imgHeight={props?.cardImgHeight || '208px'}
                  tagIcon={model?.model?.top ? '/icons/star.svg' : ''}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

  if (props?.route == 'brand_models') {

    const all__models = useSelector(selectBrandModels)
    const all__models__status = useSelector((state: any) => state?.get_brand_models?.status)

    if (all__models__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__models__status === "loading") {
      return (

        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                link={`/${props?.route}`}
                key={index}
                model={model}
                imgHeight={props?.cardImgHeight || '208px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))}
        </Grid>

      )
    }

    if (all__models__status === "succeeded") {

      const data_sliced = props?.sliced ? all__models?.data?.models?.slice(0, props?.sliced) : all__models?.data?.models;

      return (
        data_sliced?.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  type={props?.route}
                  link={`/models/${model?.slug}`}
                  key={index}
                  model={model}
                  imgHeight={props?.cardImgHeight || '208px'}
                  tagIcon={model?.top ? '/icons/star.svg' : ''}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

  if (props?.route == 'interiors') {

    const all__interiors = useSelector(selectAllInteriors)
    const all__interiors__status = useSelector((state: any) => state?.get_all_interiors?.status)

    // const all__interiors: { data?: any[] } = {
    //   data: Array.from({ length: 20 }, () => ({
    //     id: `${Math.random()}`,
    //     cover: [{ image: { src: '/img/interior1.jpg' } }],
    //     brand: { name: 'Brand name' },
    //     name: `Interior`,
    //     slug: `interior_slug`
    //   }))
    // }


    if (all__interiors__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__interiors__status === "loading") {
      return (
        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                link={`/${props?.route}`}
                key={index}
                model={model}
                imgHeight={props?.cardImgHeight || '268px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))}
        </Grid>
      )
    }

    if (all__interiors__status === "succeeded") {

      const data_sliced = props?.sliced ? all__interiors?.data?.interiors?.slice(0, props?.sliced) : all__interiors?.data?.interiors;

      return (
        data_sliced?.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  type={props?.route}
                  link={`/${props?.route}/${model?.slug}`}
                  key={index}
                  model={model}
                  imgHeight={props?.cardImgHeight || '268px'}
                  withAuthor={props?.withAuthor}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

  if (props?.route == 'designer_interiors') {

    const all__interiors = useSelector(selectAuthorInteriors)
    const all__interiors__status = useSelector((state: any) => state?.get_author_interiors?.status)

    // const all__interiors: { data?: any[] } = {
    //   data: Array.from({ length: 20 }, () => ({
    //     id: `${Math.random()}`,
    //     cover: [{ image: { src: '/img/interior1.jpg' } }],
    //     brand: { name: 'Brand name' },
    //     name: `Interior`,
    //     slug: `interior_slug`
    //   }))
    // }


    if (all__interiors__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__interiors__status === "loading") {
      return (
        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                link={`/interiors`}
                key={index}
                model={model}
                imgHeight={props?.cardImgHeight || '268px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))}
        </Grid>
      )
    }

    if (all__interiors__status === "succeeded") {

      const data_sliced = props?.sliced ? all__interiors?.data?.interiors?.slice(0, props?.sliced) : all__interiors?.data?.interiors;

      return (
        data_sliced?.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  type='interiors'
                  link={`/interiors/${model?.slug}`}
                  key={index}
                  model={model}
                  imgHeight={props?.cardImgHeight || '268px'}
                  withAuthor={props?.withAuthor}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

  if (props?.route == 'my_interiors') {

    const all__interiors = useSelector(selectMyInteriors)
    const all__interiors__status = useSelector((state: any) => state?.get_my_interiors?.status)

    if (all__interiors__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__interiors__status === "loading") {
      return (
        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                link={`/interiors`}
                key={index}
                model={model}
                imgHeight={props?.cardImgHeight || '268px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))}
        </Grid>
      )
    }

    if (all__interiors__status === "succeeded") {

      const data_sliced = props?.sliced ? all__interiors?.data?.interiors?.slice(0, props?.sliced) : all__interiors?.data?.interiors;

      return (
        data_sliced?.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  useButton
                  settingsBtn
                  type='interiors'
                  link={`/interiors/${model?.slug}`}
                  key={index}
                  model={model}
                  imgHeight={props?.cardImgHeight || '268px'}
                  withAuthor={props?.withAuthor}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

  if (props?.route == 'saved_interiors') {

    const all__interiors = useSelector(selectSavedInteriors)
    const all__interiors__status = useSelector((state: any) => state?.get_saved_interiors?.status)

    if (all__interiors__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__interiors__status === "loading") {
      return (
        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${props?.cols}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${props?.cols}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={12 / props?.cols}
              sm={12 / (props?.cols - 2)}
              xs={12 / (props?.cols - 4)}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                link={`/interiors/${model?.interior?.slug}`}
                key={index}
                model={model?.interior}
                imgHeight={props?.cardImgHeight || '268px'}
                withAuthor={true}
              />
            </Grid>
          ))}
        </Grid>
      )
    }

    if (all__interiors__status === "succeeded") {

      const data_sliced = props?.sliced ? all__interiors?.data?.interiors?.slice(0, props?.sliced) : all__interiors?.data?.interiors;

      return (
        data_sliced?.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${props?.cols}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${props?.cols}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={12 / props?.cols}
                sm={12 / (props?.cols - 2)}
                xs={12 / (props?.cols - 4)}
                item
              >
                <CustomCard
                  type={props?.route}
                  link={`/interiors/${model?.interior?.slug}`}
                  key={index}
                  model={model?.interior}
                  imgHeight={props?.cardImgHeight || '268px'}
                  withAuthor={props?.withAuthor}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

  if (props?.route == 'projects') {

    const all__projects = useSelector(selectMyProjects)
    const all__projects__status = useSelector((state: any) => state?.get_my_projects?.status)

    if (all__projects__status === "failed") {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (all__projects__status === "loading") {
      return (
        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
          {fakeModels?.map((model: any, index: any) => (
            <Grid
              className='models__card'
              sx={{
                [`&:not(:nth-of-type(${2}n))`]: {
                  padding: "0 9.5px 0 0 !important",
                },
                [`&:nth-of-type(${2}n)`]: {
                  padding: "0 0 0 0 !important",
                },
                marginBottom: "10px"
              }}
              key={index}
              md={6}
              sm={12}
              xs={12}
              item
            >
              <CustomCardSkeleton
                type={props?.route}
                key={index}
                model={model}
                imgHeight={'346px'}
              />
            </Grid>
          ))}
        </Grid>
      )
    }

    if (all__projects__status === "succeeded") {

      const data_sliced = props?.sliced ? all__projects?.data?.projects?.slice(0, props?.sliced) : all__projects?.data?.projects;

      return (
        data_sliced?.length > 0 ?
          <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
            {data_sliced?.map((model: any, index: any) => (
              <Grid
                className='models__card'
                sx={{
                  [`&:not(:nth-of-type(${2}n))`]: {
                    padding: "0 9.5px 0 0 !important",
                  },
                  [`&:nth-of-type(${2}n)`]: {
                    padding: "0 0 0 0 !important",
                  },
                  marginBottom: "10px"
                }}
                key={index}
                md={6}
                sm={12}
                xs={12}
                item
              >
                <CustomCard
                  imageSplit={4}
                  useButton
                  settingsBtn
                  type={props?.route}
                  link={`/projects/${model?.id}`}
                  key={index}
                  model={model}
                  imgHeight={props?.cardImgHeight || '268px'}
                  withAuthor={props?.withAuthor}
                />
              </Grid>
            ))
            }
          </Grid >

          : <EmptyData />
      )
    }
  }

}