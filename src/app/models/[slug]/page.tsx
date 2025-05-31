"use client"

import OneModel from "@/components/screens/models/one";
import ConnectionError from "@/components/site_info/connection_error";
import { getOneModel } from "@/data/get_one_model";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { BgBlur, ContainerStyle, LoaderStyle } from "@/styles/styles";
import CircularProgress from "@mui/material/CircularProgress";

export default function OneProduct() {
  const dispatch = useDispatch<any>();
  const getOneModel__status = useSelector(
    (state: any) => state?.get_one_model?.status
  );

  const params = useParams<{ slug: string }>();

  React.useEffect(() => {
    dispatch(getOneModel(params.slug));
  }, [params, dispatch]);

  if (getOneModel__status === "succeeded") {
    return (
      <Box sx={{ background: "#fafafa" }}>
        <OneModel />
      </Box>
    );
  } else if (getOneModel__status === "failed") {
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
