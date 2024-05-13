"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../typography';
import CustomCard from '../../custom_card';
import { sampleInterior } from '@/data/samples';
import Link from 'next/link';
import Buttons from '@/components/buttons';
import ProfileInfo from '@/components/views/profile/info';
import Image from 'next/image';
import BasicPagination from '@/components/pagination/pagination';
import EmptyData from '@/components/views/empty_data';
import { useParams } from 'next/navigation';
import { getProfile } from '../../../data/get_profile';
import { selectMyProfile } from '../../../data/me';
import { getAuthorInteriors, selectAuthorInteriors } from '../../../data/get_author_interiors';
import SimpleCard from '../../simple_card';
import { selectMyInteriors } from '../../../data/get_my_interiors';
import { selectSavedInteriors } from '../../../data/get_saved_interiors';
import { selectSavedModels } from '../../../data/get_saved_models';


export default function Profile() {
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const interiors = useSelector(selectMyInteriors)
  const savedInteriors = useSelector(selectSavedInteriors)
  const savedModels = useSelector(selectSavedModels)

  const [interiorsCount, setInteriorsCount] = React.useState<number>(0)
  const [sInteriorsCount, setSInteriorsCount] = React.useState<number>(0)
  const [sModelsCount, setSModelsCount] = React.useState<number>(0)

  React.useMemo(() => {
    if (interiors) setInteriorsCount(interiors?.data?.pagination?.data_count || 0)
  }, [interiors])
  React.useMemo(() => {
    if (savedInteriors) setSInteriorsCount(savedInteriors?.data?.pagination?.data_count || 0)
  }, [savedInteriors])
  React.useMemo(() => {
    if (savedModels) setSModelsCount(savedModels?.data?.pagination?.data_count || 0)
  }, [savedModels])

  // const cards = Array.from({ length: 12 }, () => (sampleInterior))
  const [cards, setCards] = React.useState<any>(interiors?.data?.interiors)
  const [cardsName, setCardsName] = React.useState<string>('my_interiors')

  const topButtons = [
    {
      text: 'Галерея',
      value: 'my_interiors',
      active: true,
      count: interiorsCount,
      on_click: () => {
        setCardsName('my_interiors')
        setCards(interiors?.data?.interiors);
      },
    },
    {
      text: 'Сохраненные интерьеры',
      value: 'saved_interiors',
      active: false,
      count: sInteriorsCount,
      on_click: () => {
        setCardsName('saved_interiors')
        setCards(savedInteriors?.data?.interiors);
      },
    },
    {
      text: 'Сохраненные модели',
      value: 'saved_models',
      active: false,
      count: sModelsCount,
      on_click: () => {
        setCardsName('saved_models')
        setCards(savedModels?.data?.interiors);
      },
    }
  ]

  return (
    <>
      <Box sx={{ background: "#fafafa" }} className="products">
        <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto 32px auto !important", alignItems: "center", }}>
          <Grid container sx={{ marginTop: "32px", marginLeft: 0 }} >

            <Grid item xs={4} sx={{ paddingRight: "10px" }}>
              <ProfileInfo of='own' />
            </Grid >

            <Grid item xs={8}
              style={{
                paddingLeft: "40px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ width: '100%' }}>

                <Box
                  sx={{ mb: '16px' }}
                >
                  {
                    topButtons?.map((b, i) => (
                      <Buttons
                        key={i}
                        name={b.text}
                        onClick={b.on_click}
                        type='button'
                        sx={{
                          color: cardsName == b.value ? '#7210BE' : '#646464',
                          borderRadius: 0,
                          borderBottom: `2px solid ${cardsName == b.value ? '#7210BE' : '#A6A6A6'}`,
                          height: '60px',
                          paddingX: '24px',
                          '&:hover': {
                            background: 'transparent',
                            color: '#7210BE'
                          },
                          '&:hover div': {
                            backgroundColor: '#F3E5FF'
                          },
                          '&:hover div p': {
                            color: '#7210BE'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            padding: '1px 6px 2px 6px',
                            backgroundColor: cardsName == b.value ? '#F3E5FF' : '#F8F8F8',
                            borderRadius: '9px',
                            marginLeft: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.4s ease',
                          }}
                        >
                          <SimpleTypography
                            sx={{
                              color: cardsName == b.value ? '#7210BE' : '#A0A0A0',
                              fontSize: '12px',
                              fontWeight: 500,
                              lineHeight: '16px',
                            }}
                            text={`${b.count}`}
                          />
                        </Box>
                      </Buttons>
                    ))
                  }
                </Box>

                <SimpleCard
                  route={cardsName}
                  cardImgHeight={232}
                  cols={3}
                />

              </Box>
              {cards?.length > 0 ? (
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
                  <BasicPagination
                    count={cards?.data?.pagination?.pages}
                    page={parseInt(cards?.data?.pagination?.current) + 1}
                  />
                </Grid>
              ) : null}

            </Grid>

          </Grid>
        </Box>
      </Box>

    </>
  )
}
