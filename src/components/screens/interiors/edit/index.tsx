"use client"

import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sampleUser } from '@/data/samples';
import { AddInteriorForm } from '@/components/views/interior/add_interior_form';
import { AddInteriorRequirements } from '@/components/views/interior/requirements';
import { notFound } from 'next/navigation';
import { selectMyProfile } from '../../../../data/me';
import { selectOneInterior } from '../../../../data/get_one_interior';
import { useRouter } from 'next/navigation';


export default function EditInterior() {

  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const router = useRouter()
  const currentUser = useSelector(selectMyProfile);
  const interior = useSelector(selectOneInterior);

  useEffect(() => {
    if (currentUser && interior) {
      if (currentUser?.user_id != interior?.user_id) {
        router.push(`/interiors/${interior?.slug}`)
      }
    }
  }, [currentUser, interior])

  return (
    <Box sx={{ background: "#fafafa" }} className="products" >
      <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
        <Grid
          container
          display={'flex'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          m={'32px 0'}
        >
          <Grid item width={'760px'}>
            <AddInteriorForm editing />
          </Grid>
          <Grid item width={'400px'}>
            <AddInteriorRequirements />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}