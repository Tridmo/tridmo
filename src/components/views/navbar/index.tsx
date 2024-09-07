"use client";
import { selectMyProfile } from "@/data/me";
import {
  setLoginState,
  setOpenModal,
  setSignupState,
} from "@/data/modal_checker";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CircularProgress, Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Buttons from "../../buttons";
import SearchInput from "../../inputs/search";
// import { searchModels } from 'src/data/search_model';
import BasicModal from "@/components/modals/login_modal";
import { selectGetOrders } from "@/data/get_orders";
import { ThemeProps } from "@/types/theme";
import { Close } from "@mui/icons-material";
import { WyNotificationToasts } from "@weavy/uikit-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { selectChatUnread } from "../../../data/chat";
import { getAllModels } from "../../../data/get_all_models";
import {
  selectNotificationCounts,
  selectNotificationCountsStatus,
} from "../../../data/get_notifications";
import { setModelNameFilter } from "../../../data/handle_filters";
import { setAuthState } from "../../../data/login";
import { switch_on } from "../../../data/toggle_cart";
import { IMAGES_BASE_URL } from "../../../utils/env_vars";
import SimpleTypography from "../../typography";
import MobileMode from "./mobile_mode";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const DropDown = styled(Menu)(
  ({ theme }: ThemeProps) => `

  .MuiList-root{
    width:162px;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 4px 0;
    // margin:10px 12px;
    
  }

  .MuiPaper-root{
    border-radius:0 !important;
    // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.18);
    box-shadow: 0px 8px 18px 0px #00000029;
  }
  `
);

const navItemsData = [
  {
    id: 1,
    text: "Дизайнеры",
    link: "/designers",
  },
  {
    id: 2,
    text: "Бренды",
    link: "/brands",
  },
  {
    id: 3,
    text: "Модели",
    link: "/models/?page=1",
  },
  {
    id: 4,
    text: "Интерьеры",
    link: "/interiors/?page=1",
  },
];

export default function Navbar() {
  const dispatch = useDispatch<any>();
  const CardDetails = useSelector(selectGetOrders);

  const getModelCategoryFilter = useSelector(
    (state: any) => state?.handle_filters?.categories
  );
  const getModelBrandFilter = useSelector(
    (state: any) => state?.handle_filters?.model_brand
  );
  const getModelCategoryNameFilter = useSelector(
    (state: any) => state?.handle_filters?.category_name
  );
  const getModelColorFilter = useSelector(
    (state: any) => state?.handle_filters?.colors
  );
  const getModelStyleFilter = useSelector(
    (state: any) => state?.handle_filters?.styles
  );
  const getModelPageFilter = useSelector(
    (state: any) => state?.handle_filters?.page
  );
  const getModelTopFilter = useSelector(
    (state: any) => state?.handle_filters?.model_top
  );
  const getModelNameFilter = useSelector(
    (state: any) => state?.handle_filters?.model_name
  );
  const getModelOrderBy = useSelector(
    (state: any) => state?.handle_filters?.model_orderby
  );
  const getModelOrder = useSelector(
    (state: any) => state?.handle_filters?.model_order
  );

  const isAuthenticated = useSelector(
    (state: any) => state?.auth_slicer?.authState
  );
  const notificationCountsStatus = useSelector(selectNotificationCountsStatus);
  const notificationCounts = useSelector(selectNotificationCounts);

  const chatUnread = useSelector(selectChatUnread);
  const userData = useSelector(selectMyProfile);
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("chatToken");
    dispatch(setAuthState(false));
    router.push(pathname);
    router.refresh();
    setAnchorEl(null);
  };

  function handleSearch(e) {
    e.preventDefault();
    dispatch(setModelNameFilter(searchVal));
    const newUrl = `/models/?name=${searchVal}`;
    router.push(newUrl);
    dispatch(
      getAllModels({
        brand: getModelBrandFilter,
        categories: getModelCategoryFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        name: searchVal,
        top: getModelTopFilter,
        page: getModelPageFilter,
        orderBy: getModelOrderBy,
        order: getModelOrder,
      })
    );
  }
  const openRightBar = () => {
    dispatch(switch_on(true));
  };

  function AccountHandler() {
    if (isAuthenticated) {
      router.push("/profile");
    } else {
      dispatch(setSignupState(true));
      dispatch(setOpenModal(true));
    }
  }

  return (
    <>
      <BasicModal />
      <WyNotificationToasts draggable appearance="internal" />
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            flexGrow: 1,
            background: "#fff",
            borderBottom: "1px solid #e0e0e0",
            marginBottom: 0,
            padding: { xs: "0 18px", lg: 0 },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              maxWidth: "1200px",
              width: "100%",
              margin: "0 auto",
              alignItems: "center",
              position: "relative",
            }}
          >
            <DropDown
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose} sx={{ padding: "6px 12px" }}>
                <Link
                  href="/profile"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/icons/user-line.svg"
                    alt="user icon"
                    width={17}
                    height={17}
                  />
                  <SimpleTypography
                    className="drow-down__text"
                    text="Мой профилъ"
                  />
                </Link>
              </MenuItem>

              <MenuItem onClick={handleClose} sx={{ padding: "6px 12px" }}>
                <Link
                  href="/interiors/addnew"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/icons/plus-round.svg"
                    alt="heart icon"
                    width={17}
                    height={17}
                  />
                  <SimpleTypography
                    className="drow-down__text"
                    text="Добавить работу"
                  />
                </Link>
              </MenuItem>

              <Divider
                sx={{
                  my: "0 !important",
                  width: "100%",
                }}
              />

              <MenuItem sx={{ padding: "6px 12px" }} onClick={handleLogout}>
                <Image
                  src="/icons/logout-circle-r-line.svg"
                  alt="logout icon"
                  width={17}
                  height={17}
                />
                <SimpleTypography
                  sx={{ color: "#BC2020 !important" }}
                  className="drow-down__text"
                  text="Выйти"
                />
              </MenuItem>
            </DropDown>

            <Grid
              className="header__logo--wrapper"
              item
              md={2.5}
              xs={4}
              sx={{
                padding: "0 !important",
                paddingLeft: "0 !important",
                paddingTop: "0 !important",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Link href="/">
                <Item sx={{ padding: "0 !important", height: "27px" }}>
                  <Image
                    className="header__logo"
                    alt="logo"
                    priority={true}
                    src="/logos/logo.svg"
                    width={123}
                    height={32}
                  />
                </Item>
              </Link>
            </Grid>

            <Grid
              item
              md={9.5}
              xs={8}
              sx={{
                display: "flex",
                padding: "16px 0 !important",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
              className="header__actions"
            >
              <MobileMode />
              
              <Box
                className="header__nav"
                component={"nav"}
                sx={{
                  display: { xs: "none", md: "flex" },
                  marginRight: "16px",
                }}
              >
                <Box
                  component={"ul"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0",
                    padding: "0",
                  }}
                >
                  {navItemsData.map((item) => (
                    <Box
                      key={item.id}
                      component={"li"}
                      sx={{ listStyle: "none", padding: "9px 12px" }}
                    >
                      <Link href={item.link} style={{ textDecoration: "none" }}>
                        <SimpleTypography
                          text={item.text}
                          className="nav__item--text"
                        />
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Item
                sx={{
                  display: { xs: "flex", md: "none" },
                  padding: "0",
                  marginRight: "10px",
                  width: "20px",
                  height: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.4s ease",
                  borderRadius: "4px",
                  "&:hover": { background: "#F5F5F5" },
                }}
                onClick={AccountHandler}
              >
                <Button
                  type="button"
                  disableRipple
                  className="header__user"
                  sx={{
                    display: "flex",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", position: "relative" }}>
                    <Image
                      alt="bag"
                      priority={true}
                      src="/icons/user-line.svg"
                      width={18}
                      height={20}
                    />
                  </Box>
                </Button>
              </Item>

              <Box sx={{ overflow: "hidden" }}>
                <Box
                  sx={{
                    width: searchClicked ? { xs: "200px", md: "300px" } : 0,
                    visibility: searchClicked ? "visible" : "hidden",
                    transition: "all 0.4s ease",
                  }}
                >
                  <form onSubmit={handleSearch}>
                    <SearchInput
                      sx={{
                        width: { xs: "200px", md: "300px" },
                      }}
                      value={searchVal}
                      className="search__input--models"
                      onChange={(val) => setSearchVal(val)}
                      clic={setSearchClicked}
                      placeHolder="Поиск моделей"
                      startIcon={true}
                    />
                  </form>
                </Box>
              </Box>
              <IconButton
                onClick={() => {
                  if (searchClicked) setSearchVal("");
                  setSearchClicked(!searchClicked);
                }}
                aria-label="menu"
                sx={{
                  position: {
                    xs: searchClicked ? "absolute" : "relative",
                    md: "relative",
                  },
                  marginRight: "0px",
                  transition: "all 0.4s ease",
                }}
              >
                {searchClicked ? (
                  <Close />
                ) : (
                  <Image
                    src="/icons/search-icon.svg"
                    alt="Search icon"
                    width={21}
                    height={21}
                  ></Image>
                )}
              </IconButton>
              {/* {
                !searchClicked ?
                  : null
              } */}

              {/* {isAuthenticated ? (
                <>
                  <IconButton
                    onClick={openRightBar}
                    aria-label="menu"
                    sx={{
                      display: { xs: "none", md: "block" },
                      marginRight: "16px",
                      backgroundColor: false
                        ? "rgba(0, 0, 0, 0.04)"
                        : "transparent",
                    }}
                  >
                    <Box
                      sx={{
                        width: 19,
                        height: 17,
                        position: "absolute",
                        borderRadius: "12px",
                        bgcolor: "#7210BE",
                        top: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <SimpleTypography
                        text={
                          notificationCountsStatus === "succeeded"
                            ? notificationCounts?.data?.unread_count || "0"
                            : "0"
                        }
                        sx={{
                          color: "#fff",
                          lineHeight: "11px",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      />
                    </Box>
                    <Image
                      src="/icons/bell-icon.svg"
                      alt="Bell"
                      width={21}
                      height={21}
                    ></Image>
                  </IconButton>
                  <Link href={"/chat"}>
                    <IconButton
                      sx={{
                        display: { xs: "none", md: "block" },
                        position: "relative",
                        marginRight: "16px",
                      }}
                    >
                      <Box
                        sx={{
                          width: 19,
                          height: 17,
                          position: "absolute",
                          borderRadius: "12px",
                          bgcolor: "#7210BE",
                          top: 0,
                          right: 0,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <SimpleTypography
                          text={
                            String(
                              Number(chatUnread?.private || 0) +
                                Number(chatUnread?.rooms || 0)
                            ) || "0"
                          }
                          sx={{
                            color: "#fff",
                            lineHeight: "11px",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        />
                      </Box>
                      <ChatOutlined htmlColor="#424242" />
                    </IconButton>
                  </Link>
                </>
              ) : null} */}

              <Box
                sx={{
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  zIndex: "100",
                  position: "relative",
                  padding: "1px 0",
                }}
              >
                <Box className="header__btns">
                  {isAuthenticated ? (
                    <>
                      <Item
                        sx={{
                          padding: "0 !important",
                          display: { xs: "none", md: "flex" },
                        }}
                      >
                        <Buttons
                          id="basic-menu"
                          aria-controls={"basic-menu"}
                          aria-haspopup="true"
                          aria-expanded={true}
                          onClick={handleClick}
                          sx={{
                            padding: "0 !important",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": { background: "#F5F5F5" },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Image
                              width="28"
                              height="28"
                              alt="user icon"
                              style={{
                                borderRadius: "50%",
                              }}
                              src={
                                userData?.image_src
                                  ? `${IMAGES_BASE_URL}/${userData?.image_src}`
                                  : "/img/avatar.png"
                              }
                            />
                            <SimpleTypography
                              text={
                                userData?.full_name ? (
                                  userData?.full_name?.split(" ")[0]
                                ) : (
                                  <CircularProgress size="1rem" />
                                )
                              }
                              sx={
                                open
                                  ? {
                                    color: "#7210BE !important",
                                    marginLeft: "6px",
                                  }
                                  : { marginLeft: "6px" }
                              }
                              className={"user__name"}
                            />
                            <KeyboardArrowDownIcon
                              sx={
                                !open
                                  ? {
                                    minWidth: "11px",
                                    minHeight: "7px",
                                    color: "black",
                                  }
                                  : {
                                    minWidth: "11px",
                                    minHeight: "7px",
                                    color: "#7210BE",
                                    transform: "rotateZ(180deg)",
                                    transitionDuration: "1000ms",
                                  }
                              }
                            />
                          </Box>
                        </Buttons>
                      </Item>
                    </>
                  ) : (
                    <Item
                      sx={{ padding: "0", display: { xs: "none", md: "flex" } }}
                    >
                      <Box sx={{ marginRight: "16px" }}>
                        <Buttons
                          name="Регистрация "
                          onClick={() => {
                            dispatch(setSignupState(true));
                            dispatch(setOpenModal(true));
                          }}
                          className="bordered__btn--signup"
                        />
                      </Box>
                      <Buttons
                        name="Логин"
                        onClick={() => {
                          dispatch(setLoginState(true));
                          dispatch(setOpenModal(true));
                        }}
                        className="login__btn"
                      />
                    </Item>
                  )}
                </Box>
              </Box>
            </Grid>
            {/* <Grid item xs={3} sx={{ padding: "16px 0 !important", display: "flex", }}>
              <Item sx={{ padding: "0", width: "280px" }}>
                <SearchInput placeHolder="Поиск..." className='' startIcon={true}></SearchInput>
              </Item>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
