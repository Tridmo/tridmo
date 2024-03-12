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
type InputProps = {
  route: string,
  sliced?: number,
  cols: number,
  cardImgHeight?: any,
  withAuthor?: boolean,
};
const fakeModels = [1, 2, 3, 4, 5, 6, 7, 8];
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

  React.useEffect(() => {
    dispatch(getAllModels({
      brand_id: null,
      category_id: null,
      color_id: null,
      style_id: null,
      page: null,
    }))
  }, [])

  if (props?.route == 'models') {

    // const all__models = useSelector(selectAllModels)
    const all__models__status = useSelector((state: any) => state?.get_all_models?.status)

    const all__models: { data?: any[] } = {
      data: Array.from({ length: 20 }, () => ({
        id: `${Math.random()}`,
        cover: [{ image: { src: '/img/models1.jpg' } }],
        brand: { name: 'Brand name' },
        name: `Model`,
        slug: `model_slug`
      }))
    }


    if (/*all__models__status === "failed"*/ false) {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (/*all__models__status === "loading"*/ false) {
      return (
        <>
          <Grid container spacing={2} >
            {fakeModels?.map((model: any, index: any) => (
              <Grid item xs={3} key={index}>
                <a style={{ margin: '0 0 15px 0' }}>
                  <Box sx={{ border: "1px solid #e0e0e0", height: "282px", background: "#fff", padding: "12px 12px 0 12px", position: 'relative' }}>
                    {/* <SimpleTypography text='16%' className='card__sale' /> */}
                    <Image
                      src={"/img/card-loader.jpg"}
                      // srcSet={`${process.env.NEXT_PUBLIC_BASE_IMG_URL}/${model?.model_images[0]?.image[0]?.src}`}
                      // layout='fill'
                      width={282}
                      height={282}
                      alt={model?.title}
                      loading="lazy"
                      style={{
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        objectFit: 'cover',
                        display: 'block',
                        width: '100%',
                      }}
                    />
                    <Label
                      sx={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "16px 0", alignItems: "center" }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={83}
                        height={21}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={50}
                        height={24}
                      />
                    </Label>
                  </Box>
                </a>
              </Grid>
            ))}
          </Grid>
        </>
      )
    }

    if (/*all__models__status === "succeeded"*/  true) {

      const data_sliced = props?.sliced ? all__models.data?.slice(0, props?.sliced) : all__models.data;

      return (
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
                imgHeight={'208px'}
                tagIcon={model?.top ? '/icons/star.svg' : ''}
              />
            </Grid>
          ))
          }
        </Grid >
      )
    }
  }


  if (props?.route == 'interiors') {

    // const all__interiors = useSelector(selectAllModels)
    const all__interiors__status = useSelector((state: any) => state?.get_all_interiors?.status)

    const all__interiors: { data?: any[] } = {
      data: Array.from({ length: 20 }, () => ({
        id: `${Math.random()}`,
        cover: [{ image: { src: '/img/interior1.jpg' } }],
        brand: { name: 'Brand name' },
        name: `Interior`,
        slug: `interior_slug`
      }))
    }


    if (/*all__interiors__status === "failed"*/ false) {
      return (
        <SimpleTypography text='Извините, ошибка сетевого подключения:('></SimpleTypography>
      )
    }
    if (/*all__interiors__status === "loading"*/ false) {
      return (
        <>
          <Grid container spacing={2} >
            {fakeModels?.map((model: any, index: any) => (
              <Grid item xs={3} key={index}>
                <a style={{ margin: '0 0 15px 0' }}>
                  <Box sx={{ border: "1px solid #e0e0e0", height: "282px", background: "#fff", padding: "12px 12px 0 12px", position: 'relative' }}>
                    {/* <SimpleTypography text='16%' className='card__sale' /> */}
                    <Image
                      src={"/img/card-loader.jpg"}
                      // srcSet={`${process.env.NEXT_PUBLIC_BASE_IMG_URL}/${model?.model_images[0]?.image[0]?.src}`}
                      // layout='fill'
                      width={282}
                      height={282}
                      alt={model?.title}
                      loading="lazy"
                      style={{
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        objectFit: 'cover',
                        display: 'block',
                        width: '100%',
                      }}
                    />
                    <Label
                      sx={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "16px 0", alignItems: "center" }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={83}
                        height={21}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={50}
                        height={24}
                      />
                    </Label>
                  </Box>
                </a>
              </Grid>
            ))}
          </Grid>
        </>
      )
    }

    if (/*all__interiors__status === "succeeded"*/  true) {

      const data_sliced = props?.sliced ? all__interiors.data?.slice(0, props?.sliced) : all__interiors.data;

      return (
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
      )
    }
  }

}