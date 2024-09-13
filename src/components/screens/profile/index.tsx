"use client"

import * as React from 'react'
import { Box, Divider, Grid, useMediaQuery } from '@mui/material';
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
import { selectMyProjects } from '../../../data/get_my_projects';
import MobileMode from './mobile_mode';
import ProfileMobileMode from '@/components/views/profile/info/profile-mobile-mode';
import { ContainerStyle, primaryColor } from '../../../styles/styles';
import { Bookmark, BookmarkBorder, BookmarkOutlined, Collections, CollectionsBookmark, CollectionsBookmarkOutlined, CollectionsOutlined, Folder, FolderOpen, FolderOpenOutlined } from '@mui/icons-material';


export default function Profile() {
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const interiors = useSelector(selectMyInteriors)
  const projects = useSelector(selectMyProjects)
  const savedModels = useSelector(selectSavedModels)
  const xsScreen = useMediaQuery("(max-width:780px)");
  const imageResizeLg = useMediaQuery("(max-width:1280px)");
  const imageResizeMd = useMediaQuery("(max-width:1060px)");
  const imageResizeMmd = useMediaQuery("(max-width:960px)");
  const imageResizeSm = useMediaQuery("(max-width:720px)");
  const imageResizeXs = useMediaQuery("(max-width:600px)");
  const imageResizeXxs = useMediaQuery("(max-width:480px)");

  const [interiorsCount, setInteriorsCount] = React.useState<number>(0)
  const [projectsCount, setProjectsCount] = React.useState<number>(0)
  const [sModelsCount, setSModelsCount] = React.useState<number>(0)

  React.useMemo(() => {
    if (interiors) setInteriorsCount(interiors?.data?.pagination?.data_count || 0)
  }, [interiors])
  React.useMemo(() => {
    if (projects) setProjectsCount(projects?.data?.pagination?.data_count || 0)
  }, [projects])
  React.useMemo(() => {
    if (savedModels) setSModelsCount(savedModels?.data?.pagination?.data_count || 0)
  }, [savedModels])

  const [cardsName, setCardsName] = React.useState<string>('my_interiors')

  const topButtons = [
    {
      text: 'Галерея',
      value: 'my_interiors',
      active: true,
      count: interiorsCount,
      icon: <CollectionsOutlined />,
      icon_active: <Collections htmlColor={primaryColor} />,
      on_click: () => {
        setCardsName('my_interiors')
      },
    },
    {
      text: 'Сохраненные модели',
      value: 'saved_models',
      active: false,
      count: sModelsCount,
      icon: <BookmarkBorder />,
      icon_active: <Bookmark htmlColor={primaryColor} />,
      on_click: () => {
        setCardsName('saved_models')
      },
    },
    {
      text: 'Проекты',
      value: 'projects',
      active: false,
      count: projectsCount,
      icon: <FolderOpenOutlined />,
      icon_active: <Folder htmlColor={primaryColor} />,
      on_click: () => {
        setCardsName('projects')
      },
    }
  ]

  return (
    <Box sx={ContainerStyle}>
      <Grid container sx={{ marginTop: "32px", marginLeft: 0, position: "relative" }} >

        <ProfileMobileMode of='own' />
        <Grid item md={4} sx={{ display: { xs: "none", md: "flex" } }}>
          <ProfileInfo of='own' />
        </Grid >

        <Grid item xs={12} md={8}
          sx={{
            paddingLeft: { lg: "40px", md: "40px", sm: 0, xs: 0 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: "100%", marginBottom: "16px" }}>
            <Grid
              container
              sx={{ mb: '16px', p: 0 }}
            >
              {
                topButtons?.map((b, i) => (
                  <Grid
                    item
                    key={i}
                    xs={12 / topButtons.length}
                    sx={{
                      borderBottom: `2px solid ${cardsName == b.value ? primaryColor : '#A6A6A6'}`,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Buttons
                      name={xsScreen ? '' : b.text}
                      onClick={(e) => {
                        e.stopPropagation()
                        b.on_click()
                      }}
                      type='button'
                      sx={{
                        width: '100%',
                        p: { lg: '10px 24px', md: '10px 24px', sm: '10px 12px', xs: '10px 8px' },
                        color: cardsName == b.value ? primaryColor : '#646464',
                        borderRadius: 0,
                        '&:hover': {
                          background: 'transparent',
                          color: primaryColor
                        },
                        '&:hover div': {
                          backgroundColor: '#F3E5FF'
                        },
                        '&:hover div p': {
                          color: primaryColor
                        }
                      }}
                    >
                      {
                        !!xsScreen && (
                          cardsName == b.value ? b.icon_active : b.icon
                        )
                      }
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
                            color: cardsName == b.value ? primaryColor : '#A0A0A0',
                            fontSize: '12px',
                            fontWeight: 500,
                            lineHeight: '16px',
                          }}
                          text={`${b.count}`}
                        />
                      </Box>
                    </Buttons>
                  </Grid>
                ))
              }
            </Grid>

            <SimpleCard
              route={cardsName}
              cardImgHeight={
                cardsName == 'projects'
                  ? (imageResizeXxs ? '80px' : imageResizeXs ? '120px' : imageResizeSm ? '130px' : imageResizeMmd ? '171px' : imageResizeMd ? '120px' : imageResizeLg ? '170px' : '110px')
                  : (imageResizeXxs ? '200px' : imageResizeSm ? '220px' : imageResizeMd ? '200px' : '232px')
              }
              cols={3}
            />

          </Box>
          <Grid
            item
            xs={6}
            sx={{
              mb: '32px',
              padding: "0 !important",
              display: "flex",
              alignItems: 'center',
              justifyContent: "center",
              flexBasis: 'auto !important'
            }}
          >
            <React.Suspense>
              {
                cardsName == 'my_interiors' ?
                  <BasicPagination
                    dataSource={'my_interiors'}
                    count={interiors?.data?.pagination?.pages}
                    page={parseInt(interiors?.data?.pagination?.current) + 1}
                  />
                  : cardsName == 'saved_models' ?
                    <BasicPagination
                      dataSource={'saved_models'}
                      count={savedModels?.data?.pagination?.pages}
                      page={parseInt(savedModels?.data?.pagination?.current) + 1}
                    />
                    : cardsName == 'projects' ?
                      <BasicPagination
                        dataSource={'projects'}
                        count={projects?.data?.pagination?.pages}
                        page={parseInt(projects?.data?.pagination?.current) + 1}
                      />
                      : null
              }
            </React.Suspense>
          </Grid>

        </Grid>

      </Grid>
    </Box>
  )
}
