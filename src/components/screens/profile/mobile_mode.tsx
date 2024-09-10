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
        display: { xs: "flex", md: "none" },
        position: "fixed",
        bottom: "10%",
        left: 15,
        zIndex: 10
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        style={{backgroundColor: "#fff", borderRadius: "50%", padding: "2px", border: "1px solid #ccc"}}
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
          sx={{ position: "absolute", top: -4, right: -4 }}
        >
          <Close />
        </IconButton>
        {children}
      </SwipeableDrawer>
    </Box>
  );
}
