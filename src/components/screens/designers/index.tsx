"use client"

import React, { CSSProperties, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllModels } from '../../../data/get_all_models';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Box, Grid, SxProps, Skeleton, useMediaQuery } from '@mui/material'
import Image from 'next/image';
import SimpleTypography from '@/components/typography';
import BasicPagination from '@/components/pagination/pagination';
import Link from 'next/link';
import { selectAllDesigners } from '../../../data/get_all_designers';
import EmptyData from '../../views/empty_data';
import { selectMyProfile } from '../../../data/me';
import { IMAGES_BASE_URL } from '../../../utils/env_vars';
import { dataItemIndex } from '../../../utils/utils';

const liHeaderTextSx = {
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '22px',
  letterSpacing: '0em',
  textAlign: 'center',
  color: '#686868'
}

const listSx: SxProps = {
  width: '100%',
  maxWidth: 1200,
  bgcolor: 'background.paper',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
  padding: 0,
}

const liHeaderSx: SxProps = {
  backgroundColor: '#F5F5F5',
  justifyContent: 'flex-start',
  padding: '12px 24px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
}

const liSx: SxProps = {
  justifyContent: 'flex-start',
  padding: { lg: '12px 24px', md: '12px 24px', sm: '10px 12px', xs: '8px 10px' },
  transition: '0.4s all ease',

  '&:hover': {
    backgroundColor: '#FAFAFA',
  },
  '&:hover .username': {
    color: '#0646E6 !important',
  }
}

const liAvatarWrapper: SxProps = {
  backgroundColor: '#fff',
  minWidth: { lg: '80px', md: '80px', sm: '60px', xs: '60px' },
  maxWidth: { lg: '80px', md: '80px', sm: '60px', xs: '60px' },
  minHeight: { lg: '80px', md: '80px', sm: '60px', xs: '60px' },
  maxHeight: { lg: '80px', md: '80px', sm: '60px', xs: '60px' },
  border: '1px solid #E0E0E0',
  borderRadius: '50%',
  marginRight: '16px'
}

const liAvatarSx: SxProps = {
  objectFit: 'cover',
  width: '100% !important',
  height: '100% !important',
  borderRadius: '50%',
  '& > img': {
    width: '100% !important',
    height: '100% !important',
  }
}

export default function DesignersPage() {
  const dispatch = useDispatch<any>();
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const getDesignersStatus = useSelector((state: any) => state?.get_all_designers?.status);
  const all__designers = useSelector(selectAllDesigners)
  const profile = useSelector(selectMyProfile)
  const smallScreen = useMediaQuery('(max-width:768px)');

  const fakeDesigners = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const widthControl = {
    '&:nth-of-type(1)': {
      minWidth: { lg: '56px', md: '56px', sm: '20px', xs: '20px' },
      maxWidth: { lg: '56px', md: '56px', sm: '20px', xs: '20px' },
    },
    '&:nth-of-type(2)': {
      minWidth: smallScreen ? '70%' : { lg: '60%', md: '60%', sm: '60%', xs: '70%' },
      maxWidth: smallScreen ? '70%' : { lg: '60%', md: '60%', sm: '60%', xs: '70%' },
    },
    '&:nth-of-type(3)': {
      minWidth: smallScreen ? '25%' : { lg: '10%', md: '10%', sm: '10%', xs: '25%' },
      maxWidth: smallScreen ? '25%' : { lg: '10%', md: '10%', sm: '10%', xs: '25%' },
    },
    '&:nth-of-type(4)': {
      minWidth: '10%',
      maxWidth: '10%',
    },
    '&:nth-of-type(5)': {
      minWidth: '10%',
      maxWidth: '10%',
    }
  }

  return (
    <Box sx={{
      width: { lg: "1200px", md: '100%', sm: '100%', xs: "90%" },
      p: { lg: 0, sm: '0 24px' },
      minHeight: '80dvh',
      display: "block",
      margin: "0 auto"
    }}>
      <SimpleTypography text='Дизайнеры' className='section__title' sx={{ margin: '32px auto !important' }} />
      {
        getDesignersStatus == 'succeeded' ?
          <>
            <List
              sx={listSx}
            >
              <ListItem alignItems="center"
                key={-1}
                sx={liHeaderSx}
              >
                <SimpleTypography
                  text='№'
                  sx={{ ...liHeaderTextSx, marginRight: '16px', ...widthControl }}
                />
                <SimpleTypography
                  text='Профиль'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'start !important', }}
                />
                {
                  !smallScreen ? (
                    <>
                      <SimpleTypography
                        text='Галерея'
                        sx={{ ...liHeaderTextSx, ...widthControl }}
                      />
                      <SimpleTypography
                        text='Бирки'
                        sx={{ ...liHeaderTextSx, ...widthControl }}
                      />
                      <SimpleTypography
                        text='Рейтинг'
                        sx={{ ...liHeaderTextSx, ...widthControl }}
                      />
                    </>
                  )
                    : <></>
                }
              </ListItem>
              {
                all__designers?.data?.designers && all__designers?.data?.designers?.length != 0
                  ? all__designers?.data?.designers?.map((user, index: any) =>
                    <Link key={index} href={profile?.user_id == user.id && isAuthenticated ? '/profile' : `/designers/${user?.username}`}>

                      <ListItem key={user?.id} alignItems="center"
                        sx={liSx}
                      >
                        <ListItemText sx={{ marginRight: '16px', ...widthControl }}>

                          <SimpleTypography
                            text={
                              dataItemIndex<string>(
                                all__designers?.data?.pagination?.limit,
                                all__designers?.data?.pagination?.current,
                                index + 1
                              )
                            }
                            sx={{
                              textAlign: 'center',
                              color: '#B3B3B3',
                              fontWeight: 500,
                              fontSize: { lg: '18px', md: '18px', sm: '16px', xs: '14px' },
                              lineHeight: '26px',
                              letterSpacing: '-0.02em'
                            }}
                          />
                        </ListItemText>

                        <ListItemText
                          sx={{
                            ...widthControl,
                            m: 0,
                            '& > span': {
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start'
                            }
                          }}
                        >
                          <ListItemAvatar sx={liAvatarWrapper}>
                            <Avatar
                              src={user?.image_src ? `${IMAGES_BASE_URL}/${user?.image_src}` : '/img/avatar.png'}
                              alt=''
                              sx={liAvatarSx}
                            />
                          </ListItemAvatar>
                          <ListItemText className='username' sx={{ margin: '0 8px' }}>

                            <SimpleTypography
                              text={user?.company_name}
                              sx={{
                                fontSize: { lg: '22px', md: '20px', sm: '18px', xs: '18px' },
                                fontWeight: 400,
                                lineHeight: '26px',
                                letterSpacing: '-0.02em',
                                textAlign: 'start',
                                color: '#141414'
                              }}
                            />

                            <Box
                              sx={{
                                display: 'flex'
                              }}
                            >
                              <SimpleTypography
                                text={user?.full_name}
                                sx={{
                                  fontSize: { lg: '18px', md: '18px', sm: '16px', xs: '14px' },
                                  fontWeight: 400,
                                  lineHeight: '24px',
                                  letterSpacing: '-0.01em',
                                  textAlign: 'start',
                                  color: '#848484'
                                }}
                              />
                            </Box>

                          </ListItemText>
                        </ListItemText>

                        {
                          !!smallScreen ?
                            (
                              <ListItemText sx={{
                                ...widthControl,
                              }}>
                                <SimpleTypography
                                  text={`Галерея: ${user?.designs_count || 0}`}
                                  sx={{
                                    fontSize: { lg: '18px', md: '18px', sm: '16px', xs: '14px' },
                                    fontWeight: 400,
                                    lineHeight: '22px',
                                    letterSpacing: '-0.02em',
                                    textAlign: 'start',
                                  }}
                                />
                                <SimpleTypography
                                  text={`Бирки: ${user?.tags_count || 0}`}
                                  sx={{
                                    fontSize: { lg: '18px', md: '18px', sm: '16px', xs: '14px' },
                                    fontWeight: 400,
                                    lineHeight: '22px',
                                    letterSpacing: '-0.02em',
                                    textAlign: 'start',
                                  }}
                                />
                                <SimpleTypography
                                  text={`Рейтинг: ${user?.rating || 0}`}
                                  sx={{
                                    fontSize: { lg: '18px', md: '18px', sm: '16px', xs: '14px' },
                                    fontWeight: 400,
                                    lineHeight: '22px',
                                    letterSpacing: '-0.02em',
                                    textAlign: 'start',
                                  }}
                                />
                              </ListItemText>
                            )
                            : (
                              <>
                                <ListItemText sx={{ ...widthControl }}>
                                  <SimpleTypography
                                    text={user?.designs_count || 0}
                                    sx={{
                                      fontSize: '22px',
                                      fontWeight: 400,
                                      lineHeight: '26px',
                                      letterSpacing: '-0.02em',
                                      textAlign: 'center',
                                    }}
                                  />
                                </ListItemText>

                                <ListItemText sx={{ ...widthControl }}>
                                  <SimpleTypography
                                    text={user?.tags_count || 0}
                                    sx={{
                                      fontSize: '22px',
                                      fontWeight: 400,
                                      lineHeight: '26px',
                                      letterSpacing: '-0.02em',
                                      textAlign: 'center',
                                    }}
                                  />
                                </ListItemText>

                                <ListItemText sx={{ ...widthControl }}>
                                  <SimpleTypography
                                    text={user?.rating || 0}
                                    sx={{
                                      fontSize: '22px',
                                      fontWeight: 400,
                                      lineHeight: '26px',
                                      letterSpacing: '-0.02em',
                                      textAlign: 'center',
                                    }}
                                  />
                                </ListItemText>
                              </>
                            )
                        }

                      </ListItem>
                      {
                        all__designers?.data?.designers?.length && index != all__designers?.data?.designers?.length - 1 ?
                          <Divider sx={{ margin: 0 }} variant="inset" component="li" />
                          : null
                      }
                    </Link>
                  )
                  : <EmptyData sx={{ marginTop: '8px' }} />
              }
            </List>
          </>
          :
          <>
            <List
              sx={{ ...listSx, marginBottom: '32px' }}
            >
              <ListItem alignItems="center"
                key={-1}
                sx={liHeaderSx}
              >
                <SimpleTypography
                  text='№'
                  sx={{ ...liHeaderTextSx, marginRight: '16px', ...widthControl }}
                />
                <SimpleTypography
                  text='Профиль'
                  sx={{ ...liHeaderTextSx, ...widthControl, textAlign: 'start !important', }}
                />
                <SimpleTypography
                  text='Галерея'
                  sx={{ ...liHeaderTextSx, ...widthControl, }}
                />
                <SimpleTypography
                  text='Бирки'
                  sx={{ ...liHeaderTextSx, ...widthControl, }}
                />
                <SimpleTypography
                  text='Рейтинг'
                  sx={{ ...liHeaderTextSx, ...widthControl, }}
                />
              </ListItem>
              {
                fakeDesigners?.map((i) =>
                  <Box key={i}>
                    <ListItem key={i} alignItems="center"
                      sx={liSx}
                    >

                      <Box sx={{ ...widthControl, marginRight: '16px', display: 'flex', justifyContent: 'center' }}>
                        <Skeleton
                          variant="rectangular"
                          width={20}
                          height={20}
                        />
                      </Box>

                      <Box
                        sx={{
                          ...widthControl,
                          m: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start'
                        }}
                      >
                        <ListItemAvatar sx={liAvatarWrapper}>
                          <Skeleton
                            variant="rounded"
                            sx={liAvatarSx}
                          />
                        </ListItemAvatar>
                        <ListItemText className='username' sx={{ margin: '0 8px', minWidth: '880px' }}>

                          <Skeleton
                            variant="rectangular"
                            width={100}
                            height={20}
                            sx={{ marginBottom: '5px' }}
                          />

                          <Box
                            sx={{
                              display: 'flex'
                            }}
                          >
                            <Skeleton
                              variant="rectangular"
                              width={80}
                              height={18}
                            />

                          </Box>

                        </ListItemText>
                      </Box>

                      <Box sx={{ ...widthControl, display: 'flex', justifyContent: 'center' }} >
                        <Skeleton
                          variant="rectangular"
                          width={56}
                          height={20}
                        />
                      </Box>

                      <Box sx={{ ...widthControl, display: 'flex', justifyContent: 'center' }}>
                        <Skeleton
                          variant="rectangular"
                          width={56}
                          height={20}
                        />
                      </Box>

                      <Box sx={{ ...widthControl, display: 'flex', justifyContent: 'center' }}>
                        <Skeleton
                          variant="rectangular"
                          width={56}
                          height={20}
                        />
                      </Box>
                    </ListItem>
                  </Box>
                )
              }
            </List>
          </>
      }
      <Grid spacing={2} container sx={{ width: '100%', margin: "0 auto", padding: "17px 0 32px 0" }}>
        <Grid
          item
          xs={12}
          sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }}
        >
          <Suspense>
            <BasicPagination
              dataSource='designers'
              count={all__designers?.data?.pagination?.pages}
              page={parseInt(all__designers?.data?.pagination?.current) + 1}
            />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  )
}
