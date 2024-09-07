import { Close } from "@mui/icons-material";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItemsData = [
  {
    id: 1,
    text: "Дизайнеры",
    link: "/designers",
    icon: <PersonIcon />,
  },
  {
    id: 2,
    text: "Бренды",
    link: "/brands",
    icon: <StorefrontIcon />,
  },
  {
    id: 3,
    text: "Модели",
    link: "/models/?page=1",
    icon: <EmojiPeopleIcon />,
  },
  {
    id: 4,
    text: "Интерьеры",
    link: "/interiors/?page=1",
    icon: <HomeIcon />,
  },
];

export default function MobileMode() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box
        sx={{
          padding: "12px 12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          <Image
            className="header__logo"
            alt="logo"
            priority={true}
            src="/logos/logo.svg"
            width={123}
            height={32}
          />
        </Link>
        <IconButton onClick={() => toggleDrawer(false)}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {navItemsData.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Link
              href={item.link}
              style={{ textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        sx={{ mr: 1, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
