import { ChatOutlined, Close, Collections, CollectionsOutlined, ControlPointOutlined, GroupOutlined, GroupsOutlined, HowToRegRounded, MenuOutlined, NotificationsOutlined, PersonOutlineOutlined, ViewInAr } from "@mui/icons-material";
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
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { setAuthState } from "../../../data/login";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import SimpleTypography from "../../typography";
import Buttons from "../../buttons";
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setLoginState, setOpenModal, setSignupState } from "../../../data/modal_checker";
import { relative } from "path";
import { switch_on } from "../../../data/toggle_cart";
import { selectNotificationCounts, selectNotificationCountsStatus } from "../../../data/get_notifications";
import { selectChatUnread } from "../../../data/chat";

export default function MobileMode() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector(
    (state: any) => state?.auth_slicer?.authState
  );
  const notificationCountsStatus = useSelector(selectNotificationCountsStatus);
  const notificationCounts = useSelector(selectNotificationCounts);
  const chatUnread = useSelector(selectChatUnread);

  const openLogin = () => {
    dispatch(setLoginState(true));
    dispatch(setOpenModal(true));
  }

  const openSignup = () => {
    dispatch(setSignupState(true));
    dispatch(setOpenModal(true));
  }

  const openNotifications = () => {
    dispatch(switch_on(true));
  }

  const navItemsData = [
    {
      id: 1,
      text: "Дизайнеры",
      link: "/designers",
      icon: <GroupOutlined />,
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
      icon: <ViewInAr />,
    },
    {
      id: 4,
      text: "Интерьеры",
      link: "/interiors/?page=1",
      icon: <CollectionsOutlined />,
    },
    ...(
      isAuthenticated ? [{
        id: -1,
        text: "Добавить работу",
        link: "/profile",
        icon: <ControlPointOutlined />,
      }, {
        id: -2,
        text: `Уведомления (${notificationCountsStatus === "succeeded" ? notificationCounts?.data?.unread_count || "0" : "0"})`,
        link: "",
        click: openNotifications,
        icon: <NotificationsOutlined />,
      }, {
        id: -3,
        text: `Чат (${String(
          Number(chatUnread?.private || 0) +
          Number(chatUnread?.rooms || 0)
        ) || "0"})`,
        link: "/chat",
        icon: <ChatOutlined />,
      }, {
        id: -4,
        text: "Мой профиль",
        link: "/profile",
        icon: <PersonOutlineOutlined />,
      }] : [{
        id: -1,
        text: "Логин",
        link: "",
        click: openLogin,
        icon: <Image
          src="/icons/login-circle.svg"
          alt="icon"
          width={24}
          height={24}
        />
      }, {
        id: -2,
        text: "Регистрация",
        link: "",
        click: openSignup,
        icon: <HowToRegRounded />
      }]
    ),
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("chatToken");
    dispatch(setAuthState(false));
    router.push(pathname);
    router.refresh();
  };

  function handleClickLogout() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите выйти из аккаунта?`,
      actions: {
        on_click: {
          args: [],
          func: async () => {
            dispatch(setConfirmProps({ is_loading: true }))
            handleLogout()
            router.refresh()
            router.push('/login')
            dispatch(setConfirmState(false))
            dispatch(setOpenModal(false))
            dispatch(resetConfirmProps())
            dispatch(resetConfirmData())
          }
        }
      }
    }
    dispatch(resetConfirmProps())
    dispatch(setConfirmProps(modalContent))
    dispatch(setConfirmState(true))
    dispatch(setOpenModal(true))
  }

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
          <ListItem sx={{ position: 'relative' }} key={item.id} disablePadding>
            {
              !!item?.link &&
              <Link
                href={item.link as string || ''}
                style={{ textDecoration: "none", position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
              />
            }
            <ListItemButton onClick={() => !!item?.click ? item?.click() : () => { }}>
              <ListItemIcon sx={{ minWidth: '24px', mr: '16px' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: 'center', justifyContent: 'center' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(!open)}
      >
        <MenuOutlined sx={{ color: '#424242' }} />
      </IconButton>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        {DrawerList}
        {
          isAuthenticated && (
            <Buttons
              onClick={handleClickLogout}
              sx={{
                justifyContent: 'flex-start',
                p: '8px 16px',
                m: 'auto 0 8px 0'
              }}
            >
              <Image
                src="/icons/logout-circle-r-line.svg"
                alt="logout icon"
                width={24}
                height={24}
                style={{
                  marginRight: '16px',
                }}
              />
              <SimpleTypography
                sx={{ color: "#BC2020 !important", m: '0 !important' }}
                className="drow-down__text"
                text="Выйти"
              />
            </Buttons>
          )
        }
      </Drawer>
    </Box>
  );
}
