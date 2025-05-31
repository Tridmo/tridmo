"use client"

import ConnectionError from "@/components/site_info/connection_error";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from '@mui/material/CircularProgress';
import OneProject from "../../../components/screens/projects/one";
import { getOneProject } from "../../../data/get_one_project";
import { BgBlur, ContainerStyle, LoaderStyle } from "../../../styles/styles";


export default function OneProjectPage() {

  const dispatch = useDispatch<any>();
  const getOneProject__status = useSelector(
    (state: any) => state?.get_one_project?.status
  );
  const params = useParams<{ id: string }>();

  React.useEffect(() => {
    dispatch(getOneProject(params.id))
  }, [params, dispatch])

  if (getOneProject__status === "succeeded") {
    return (
      <Box sx={{ background: "#fafafa" }}>
        <OneProject />
      </Box>
    );
  } else if (getOneProject__status === "failed") {
    return (
      <Box sx={{ background: "#fafafa" }}>
        <ConnectionError />
      </Box>
    );
  } else {
    return (
      <Box sx={{ background: "#fafafa", position: "relative" }}>
        <Box sx={BgBlur} />
        <Box
          sx={{
            ...ContainerStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={LoaderStyle} />
        </Box>
      </Box>
    );
  }
}
