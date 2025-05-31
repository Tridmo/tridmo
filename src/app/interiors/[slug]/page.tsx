"use client"

import { getOneInterior, selectOneInterior } from "@/data/get_one_interior";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import ConnectionError from "@/components/site_info/connection_error";
import { BgBlur, ContainerStyle, LoaderStyle } from "@/styles/styles";
import CircularProgress from "@mui/material/CircularProgress";
import OneInterior from "../../../components/screens/interiors/one";
import { getComments } from "../../../data/get_comments";
import { getInteriorTags } from "../../../data/get_interior_tags";
import { selectMyProfileStatus } from "../../../data/me";

export default function OneProduct() {
  const dispatch = useDispatch<any>();
  const getOneInterior__status = useSelector(
    (state: any) => state?.get_one_interior?.status
  );
  const profile__status = useSelector(selectMyProfileStatus);
  const selectedInterior = useSelector(selectOneInterior);
  const params = useParams<{ slug: string }>();

  React.useEffect(() => {
    if (profile__status != "loading") dispatch(getOneInterior(params.slug));
  }, [params, profile__status]);

  React.useEffect(() => {
    if (selectedInterior) {
      dispatch(getComments({ entity_id: selectedInterior?.id }));
      dispatch(getInteriorTags(selectedInterior?.id));
    }
  }, [selectedInterior]);

  if (getOneInterior__status === "succeeded") {
    return (
      <Box sx={{ background: "#fafafa" }}>
        <OneInterior />
      </Box>
    );
  } else if (getOneInterior__status === "failed") {
    return (
      <Box sx={{ background: "#fafafa" }}>
        <ConnectionError />
      </Box>
    );
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
    );
  }
}
