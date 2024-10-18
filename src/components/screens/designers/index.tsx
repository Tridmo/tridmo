"use client"

import React, { CSSProperties, Suspense, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllModels } from '../../../data/get_all_models';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Box, Grid, SxProps, Skeleton, useMediaQuery } from '@mui/material'
import Image from 'next/image';
import SimpleTypography from '@/components/typography';
import BasicPagination from '@/components/pagination/pagination';
import Link from 'next/link';
import { getAllDesigners, selectAllDesigners } from '../../../data/get_all_designers';
import EmptyData from '../../views/empty_data';
import { getMyProfile, selectMyProfile } from '../../../data/me';
import { IMAGES_BASE_URL } from '../../../utils/env_vars';
import { dataItemIndex } from '../../../utils/utils';
import { ContainerStyle, liAvatarSx, liAvatarWrapper, liHeaderSx, liHeaderTextSx, listSx, liSx } from '../../../styles/styles';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Close } from '@mui/icons-material';
import Buttons from '@/components/buttons';
import { set_designers_name } from '@/data/handle_filters';
import { designersLimit } from '@/types/filters';


export default function DesignersPage() {

  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const getDesignersStatus = useSelector((state: any) => state?.get_all_designers?.status);
  const getProfileStatus = useSelector((state: any) => state?.get_profile?.status);
  const getDesignersNameFilter = useSelector((state: any) => state?.handle_filters?.designers_name);
  const getDesignersPageFilter = useSelector((state: any) => state?.handle_filters?.designers_page);
  const all__designers = useSelector(selectAllDesigners)
  const profile = useSelector(selectMyProfile)

  const dispatch = useDispatch<any>();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const smallScreen = useMediaQuery('(max-width:768px)');
  const fakeDesigners = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [searchValue, setSearchValue] = useState('')
  const page = searchParams.get("page") as string;

  useEffect(() => {
    setSearchValue(searchParams.get('name') as string)
  }, [searchParams.toString()])
  
  React.useEffect(() => {
    if (getDesignersStatus === "idle") {
      dispatch(getAllDesigners({ 
        limit: designersLimit,
        name: searchValue || getDesignersNameFilter,
        page: page || getDesignersPageFilter
      }))
    }
    if (getProfileStatus === "idle") {
      dispatch(getMyProfile({}))
    }
  }, [getDesignersStatus, getProfileStatus])

  const removeFromQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)
      return params.toString()
    },
    [searchParams]
  )

  async function clearSearch() {
    dispatch(set_designers_name(''))
    dispatch(getAllDesigners({name: '', limit: designersLimit, page: page || getDesignersPageFilter }))
    const newQuery = removeFromQuery('name')
    router.push(`${pathname}?${newQuery}`)
    setSearchValue('')
  }

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
    <Box sx={{...ContainerStyle, mt: '32px'}}>
      { !searchValue && <SimpleTypography text='Дизайнеры' className='section__title' /> }
      {
        getDesignersStatus == 'succeeded' ?
          <>
          <Grid
            container
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #e0e0e0",
              marginBottom: "20px",
              paddingBottom:"10px",
            }}
          >
            <Grid item lg={12} md={12} sm={12} xs={12}
              sx={{ padding: "0 !important", alignItems: "center" }}
            >
              {
              searchValue ?
                <Box sx={{ borderBottom: '1px solid #e0e0e0', padding: '10px 0', marginBottom: '10px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SimpleTypography text={`Дизайнеры  «${searchValue}»`} className='prodcts__result--title' variant="h2" />
                    <Buttons onClick={clearSearch} sx={{ color: '#646464', minWidth: '30px', width: '30px', height: '30px', borderRadius: '50%' }}>
                      <Close />
                    </Buttons>
                  </Box>
                  <SimpleTypography text={`найдено ${all__designers?.data?.pagination?.data_count} результатов`} className='products__result--text' variant="h2" />
                </Box>
                : null
            }
                  
                    <SimpleTypography
                      text={`Показаны ${dataItemIndex<string>(
                        all__designers?.data?.pagination?.limit,
                        all__designers?.data?.pagination?.current,
                        1
                      ) || 0
                        }–${dataItemIndex<string>(
                          all__designers?.data?.pagination?.limit,
                          all__designers?.data?.pagination?.current,
                          all__designers?.data?.designers?.length
                        ) || 0
                        } из ${all__designers?.data?.pagination?.data_count || 0} дизайнеров`}
                      className='pagenation__desc'
                    />
                  
            </Grid>
          </Grid>


            <List
              sx={listSx}
            >
              <ListItem alignItems="center"
                key={-1}
                sx={liHeaderSx}
              >
                <SimpleTypography
                  text='№'
                  sx={{ ...liHeaderTextSx, marginRight: { lg: '16px', md: '16px', sm: '16px', xs: '8px' }, ...widthControl }}
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
                        <ListItemText sx={{ marginRight: { lg: '16px', md: '16px', sm: '16px', xs: '8px' }, ...widthControl }}>

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
                              className='ellipsis__text'
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
                                className='ellipsis__text'
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
                  sx={{ ...liHeaderTextSx, marginRight: { lg: '16px', md: '16px', sm: '16px', xs: '8px' }, ...widthControl }}
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
                fakeDesigners?.map((i) =>
                  <Box key={i}>
                    <ListItem key={i} alignItems="center"
                      sx={liSx}
                    >

                      <Box sx={{ ...widthControl, marginRight: { lg: '16px', md: '16px', sm: '16px', xs: '8px' }, display: 'flex', justifyContent: 'center' }}>
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
                        <ListItemText className='username' sx={{ margin: '0 8px' }}>

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

                      {
                        !smallScreen ? (

                          <>
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
                          </>
                        )
                          : (
                            <Box sx={{ ...widthControl, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={16}
                                sx={{ mb: '2px' }}
                              />
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={16}
                                sx={{ mb: '2px' }}
                              />
                              <Skeleton
                                variant="rectangular"
                                width={56}
                                height={16}
                                sx={{ mb: '2px' }}
                              />
                            </Box>
                          )
                      }
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
