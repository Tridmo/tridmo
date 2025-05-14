import { Close, MenuOutlined } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authTokens } from "../../../constants";
import { selectChatUnread } from "../../../data/chat";
import { selectNotificationCounts, selectNotificationCountsStatus } from "../../../data/get_notifications";
import { setAuthState } from "../../../data/login";
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setLoginState, setOpenModal, setSignupState } from "../../../data/modal_checker";
import { switch_on } from "../../../data/toggle_cart";
import { isPrivateRoute } from "../../../utils/utils";
import Buttons from "../../buttons";
import SimpleTypography from "../../typography";
import { navItemsDataMobile } from "./constants";

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



  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Memoized logout handler
  const handleLogout = useCallback(() => {
    authTokens.forEach(cookie => Cookies.remove(cookie));
    dispatch(setAuthState(false));
    router.push(isPrivateRoute(pathname) ? '/' : pathname);
    router.refresh();
  }, [dispatch, pathname, router]);

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
        {navItemsDataMobile(isAuthenticated, notificationCountsStatus, notificationCounts, chatUnread, openLogin, openSignup, openNotifications).map((item) => (
          <ListItem sx={{ position: 'relative' }} key={item.id} disablePadding>
            {
              !!item?.link ?
                <Link
                  href={item.link as string || ''}
                  style={{ textDecoration: "none", width: '100%' }}
                >
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: '24px', mr: '16px' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Link>
                :
                <ListItemButton onClick={() => !!item?.click ? item.click() : null}>
                  <ListItemIcon sx={{ minWidth: '24px', mr: '16px' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
            }
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
      <SwipeableDrawer open={open} anchor="right" onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
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
      </SwipeableDrawer>
    </Box>
  );
}
