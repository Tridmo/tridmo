"use client"

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import ConnectionError from '@/components/site_info/connection_error';
import { Box, Grid } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import OneInterior from '../../../components/screens/interiors/one';
import { getOneProject, selectOneProject } from '../../../data/get_one_project';
import { BgBlur, ContainerStyle, LoaderStyle } from '../../../styles/styles';
import OneProject from '../../../components/screens/projects/one';


export default function OneProjectPage() {

  const dispatch = useDispatch<any>();
  const getOneProject__status = useSelector((state: any) => state?.get_one_project?.status);
  const selectedProject = useSelector(selectOneProject)
  const params = useParams<{ id: string }>();

  React.useEffect(() => {
    dispatch(getOneProject(params.id))
  }, [params, dispatch])

  if (getOneProject__status === "succeeded") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <OneProject />
        </Box>
      </>
    )
  } else if (getOneProject__status === "failed") {
    return (
      <>
        <Box sx={{ background: "#fafafa" }}>
          <ConnectionError />
        </Box>
      </>
    )
  } else {
    return (
      <>
        <Box sx={{ background: "#fafafa", position: "relative"}}>
          <Box sx={BgBlur} />
          <Box sx={{...ContainerStyle, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress sx={LoaderStyle} />
          </Box>
        </Box>
      </>
    )
  }
}
