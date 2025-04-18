import { Box } from "@mui/material";
import { ContainerStyle } from "../../../styles/styles";
import ChangePasswordForm from "../../forms/change_password.form";

export function ChangePasswordScreen() {

  return (
    <Box sx={{
      ...ContainerStyle,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ChangePasswordForm />
    </Box>
  )
}