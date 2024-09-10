import { ChevronRight, Close } from "@mui/icons-material";
import { Drawer, IconButton, SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function MobileMode({ children }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box
      sx={{
        height: "fit-content",
        padding: "2px 2px 2px 13px",
        display: { xs: "flex", md: "none" },
        position: "fixed",
        bottom: "10%",
        left: -10,
        backgroundColor: "white",
        borderRadius: "50%",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
      >
        <ChevronRight />
      </IconButton>
      <SwipeableDrawer
        open={open}
        anchor="left"
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{ position: "absolute", top: 15, right: 15 }}
        >
          <Close />
        </IconButton>
        {children}
      </SwipeableDrawer>
    </Box>
  );
}
