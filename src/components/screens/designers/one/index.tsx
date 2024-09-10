"use client"

import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import SimpleTypography from '../../../typography';
import ProfileInfo from '@/components/views/profile/info';
import BasicPagination from '@/components/pagination/pagination';
import SimpleCard from '../../../simple_card';
import { selectAuthorInteriors } from '../../../../data/get_author_interiors';
import MobileMode from '../../profile/mobile_mode';


export default function DesignerProfile({ username, ...props }) {
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const interiors = useSelector(selectAuthorInteriors)

  const designerWorks = interiors?.data?.interiors

  return (
    <>
      <Box sx={{ background: "#fafafa" }} className="products">
        <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto 32px auto !important", alignItems: "center", position: "relative", padding: { xs: "0 18px", lg: 0 } }}>
          <Grid container sx={{ marginTop: "32px", marginLeft: 0 }} >

            <MobileMode children={<ProfileInfo of='designer' />}/>
            <Grid item xs={4} sx={{ paddingRight: "10px", display: { xs: "none", md: "flex" } }}>
              <ProfileInfo of='designer' />
            </Grid >

            <Grid item xs={12} md={8}
              sx={{
                paddingLeft: {lg: "40px"},
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <SimpleTypography
                  text="Галерея"
                  className="section__title"
                  variant="h2"
                />

                <SimpleCard route='designer_interiors' cols={3} cardImgHeight={'auto'} withAuthor={true} />

              </Box>
              {designerWorks?.length > 0 ? (
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
                      dataSource='designer_interiors'
                      dataId={username}
                      count={designerWorks?.data?.pagination?.pages}
                      page={parseInt(designerWorks?.data?.pagination?.current) + 1}
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
