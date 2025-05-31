"use client"

import ConnectionError from '@/components/site_info/connection_error';
import { Box } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAuthorInteriors } from '@/data/get_author_interiors';
import { selectMyProfile } from '@/data/me';
import CircularProgress from '@mui/material/CircularProgress';
import DesignerProfile from '../../../components/screens/designers/one';
import { getDesignerProfile } from '../../../data/get_designer';

const LoaderStyle = {
  zIndex: "10",
  position: "relative"
}
const ContainerStyle = {
  display: "flex",
  justifyContent: "center",
  maxWidth: "1200px",
  height: "697px",
  margin: "0 auto",
  alignItems: "center",
}
const BgBlur = {
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  background: "#fff",
  filter: "blur(10px)"
}

export default function Designer() {
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const getProfileStatus = useSelector((state: any) => state?.get_designer?.status)
  const profile = useSelector(selectMyProfile)
  const dispatch = useDispatch<any>()
  const router = useRouter()
  const params = useParams<{ username: string }>()

  React.useEffect(() => {
    if (isAuthenticated && profile && params?.username == profile?.username) {
      router.push('/profile')
    } else {
      dispatch(getDesignerProfile(params?.username))
      dispatch(getAuthorInteriors({ author: params?.username }))
    }
  }, [dispatch, params, isAuthenticated, profile])

  if (getProfileStatus === "succeeded") {
    return (
        <Box sx={{ background: "#fafafa" }}>
          <DesignerProfile username={params?.username} />
        </Box>
    )
  } else if (getProfileStatus === "failed") {
    return (
        <Box sx={{ background: "#fafafa" }}>
          <ConnectionError />
        </Box>
    )
  } else {
    return (
        <Box sx={{ background: "#fafafa", position: "relative" }}>
          <Box sx={BgBlur} />
          <Box>
            <Box sx={ContainerStyle}>
              <CircularProgress sx={LoaderStyle} />
            </Box>
          </Box>
        </Box>
    )
  }
}
