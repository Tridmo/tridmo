"use client"
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { ChangePasswordScreen } from "../../../components/screens/auth/change_password.screen";
import { selectMyProfile } from "../../../data/me";
import { ContainerStyle } from "../../../styles/styles";

export default function ChangePasswordPage() {

  const profile = useSelector(selectMyProfile);

  return (
    profile ?
      <ChangePasswordScreen />
      : <Box sx={ContainerStyle}></Box>
  )
}