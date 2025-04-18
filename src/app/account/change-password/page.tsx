"use client"
import { useRouter } from "next/navigation";
import { ChangePasswordScreen } from "../../../components/screens/auth/change_password.screen";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectMyProfile } from "../../../data/me";
import { Box } from "@mui/material";
import { ContainerStyle } from "../../../styles/styles";

export default function ChangePasswordPage() {

  const profile = useSelector(selectMyProfile);

  return (
    profile ?
      <ChangePasswordScreen />
      : <Box sx={ContainerStyle}></Box>
  )
}