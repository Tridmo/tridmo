"use client"

import ConnectionError from "@/components/site_info/connection_error";
import { Box } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { BgBlur, ContainerStyle, LoaderStyle } from "@/styles/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Profile from "../../components/screens/profile";
import { getMyInteriors } from "../../data/get_my_interiors";
import { getMyProjects } from "../../data/get_my_projects";
import { getProfile } from "../../data/get_profile";
import { getSavedModels } from "../../data/get_saved_models";
import { selectMyProfile } from "../../data/me";
import {
  myInteriorsLimit,
  projectsLimit,
  savedModelsLimit,
} from "../../types/filters";

export default function UserProfile() {
  const isAuthenticated = useSelector(
    (state: any) => state?.auth_slicer?.authState
  );
  const getProfileStatus = useSelector(
    (state: any) => state?.get_profile?.status
  );
  const getMyInteriorsStatus = useSelector(
    (state: any) => state?.get_my_interiors?.status
  );
  const getSavedModelsStatus = useSelector(
    (state: any) => state?.get_saved_models?.status
  );
  const getProjectsStatus = useSelector(
    (state: any) => state?.get_my_projects?.status
  );
  const dispatch = useDispatch<any>();
  const profile = useSelector(selectMyProfile);

  React.useEffect(() => {
    if (getProfileStatus === "idle") {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated, getProfileStatus]);

  React.useEffect(() => {
    if (profile) {
      if (getMyInteriorsStatus == "idle") {
        dispatch(getMyInteriors({ limit: myInteriorsLimit }));
      }
      if (getSavedModelsStatus == "idle") {
        dispatch(getSavedModels({ limit: savedModelsLimit }));
      }
      if (getProjectsStatus == "idle") {
        dispatch(getMyProjects({ limit: projectsLimit }));
      }
    }
  }, [profile]);

  if (getProfileStatus === "succeeded") {
    return (
      <Box sx={{ background: "#fafafa", padding: { xs: "0 18px", lg: 0 } }}>
        <Profile />
      </Box>
    );
  } else if (getProfileStatus === "failed") {
    return (
      <Box sx={{ background: "#fafafa", padding: { xs: "0 18px", lg: 0 } }}>
        <ConnectionError />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          background: "#fafafa",
          position: "relative",
          padding: { xs: "0 18px", lg: 0 },
        }}
      >
        <Box sx={BgBlur} />
        <Box>
          <Box sx={ContainerStyle}>
            <CircularProgress sx={LoaderStyle} />
          </Box>
        </Box>
      </Box>
    );
  }
}
