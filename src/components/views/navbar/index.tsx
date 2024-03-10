"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState, setSignupState, setVerifyState, setOpenModal } from '@/data/modal_checker';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
// import BasicModal from '../../Modals/LoginModal';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Buttons from '../../buttons';
import { selectMyProfile } from '@/data/me'
import { CircularProgress, Divider, IconButton } from '@mui/material';
// import { ThemeProps } from '../../../types/ThemeTypes';
import SearchInput from '../../inputs/search';
import Cookies from 'js-cookie'
// import { switch_on } from '../../../data/toggle_cart'
// import { selectGetOrders } from '../../../data/get_orders';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { searchModels } from 'src/data/search_model';
import SimpleTypography from '../../typography';
import { ThemeProps } from '@/types/theme';
import Link from 'next/link';
import BasicModal from '@/components/modals/login_modal';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
}));

const DropDown = styled(Menu)(
    ({ theme }: ThemeProps) => `

  .MuiList-root{
    width:130px;
    border: 1px solid #E0E0E0;
    border-radius: 2px;
    padding: 4px 0;
    // margin:10px 12px;
    
  }

  .MuiPaper-root{
    border-radius:0 !important;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.18);
  }
  `
);

const navItemsData = [
    {
        id: 1,
        text: "Дизайнеры",
        link: "/designers"
    },
    {
        id: 2,
        text: "Бренды",
        link: "/brands"
    },
    {
        id: 3,
        text: "Модели",
        link: "/models"
    },
    {
        id: 4,
        text: "Интерьеры",
        link: "/interiors"
    },
]

export default function Navbar() {

    const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
    const userData = useSelector(selectMyProfile)
    const router = useRouter();
    const [searchClicked, setSearchClicked] = useState(false)
    const [searchVal, setSearchVal] = useState("")

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch<any>();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        router.refresh();
        setAnchorEl(null);
    }

    function SearchModel(e: any) {
        e.preventDefault()
        console.log(e);
        router.push(`/models?keyword=${searchVal}`)
        // dispatch(searchModels(val))
    }

    return (
        <>
            <BasicModal />

            <Box sx={{ position: 'relative' }}>
                <Box sx={{ flexGrow: 1, background: "#fff", borderBottom: "1px solid #e0e0e0", marginBottom: 0 }}>
                    <Grid container spacing={2} sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto", alignItems: "center", position: "relative" }}>

                        <Grid
                            className='header__logo--wrapper'
                            item
                            md={2.5}
                            xs={5}
                            sx={{ padding: "0 !important", paddingLeft: "0 !important", paddingTop: "0 !important", display: "flex", justifyContent: "start" }}>
                            <Link href="/">
                                <Item sx={{ padding: "0 !important", height: "27px" }}>
                                    <Image className='header__logo' alt="logo" priority={true} src="/img/logo.svg" width={123} height={32} />
                                </Item>
                            </Link>

                        </Grid>

                        <Grid
                            item
                            md={9.5}
                            xs={7}
                            sx={{
                                display: "flex",
                                padding: "16px 0 !important",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}
                            className="header__actions"
                        >
                            <Box className='header__nav' component={"nav"} sx={{ marginRight: "16px" }}>
                                <Box component={"ul"} sx={{ display: "flex", alignItems: "center", margin: "0", padding: "0" }}>
                                    {
                                        navItemsData.map(item => (
                                            <Box key={item.id} component={"li"} sx={{ listStyle: "none", padding: "9px 12px" }}>
                                                <Link href={item.link} style={{ textDecoration: "none" }}>

                                                    <SimpleTypography text={item.text} className="nav__item--text" />

                                                </Link>
                                            </Box>
                                        ))
                                    }

                                </Box>
                            </Box>

                            <IconButton
                                onClick={() => setSearchClicked(!searchClicked)}
                                aria-label="menu"
                                sx={{ marginRight: "16px", backgroundColor: searchClicked ? 'rgba(0, 0, 0, 0.04)' : 'transparent' }}
                            >
                                <Image
                                    src="/img/search-icon.svg"
                                    alt='Search icon'
                                    width={21}
                                    height={21}
                                ></Image>
                            </IconButton>


                            <Box sx={{ background: "#fff", display: "flex", alignItems: "center", zIndex: "100", position: "relative", padding: "1px 0" }}>
                                <Box className='header__btns'>
                                    {
                                        isAuthenticated ?

                                            <Item sx={{ padding: "", display: "flex" }}>
                                                <Button
                                                    id="basic-menu"
                                                    aria-controls={'basic-menu'}
                                                    aria-haspopup="true"
                                                    aria-expanded={true}
                                                    onClick={handleClick}
                                                    sx={{ padding: "0 3px ", display: "flex", "&:hover": { background: "#F5F5F5" } }}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <Image
                                                            width="28"
                                                            height="28"
                                                            alt='user icon'
                                                            src="/img/user.png"
                                                        />
                                                        <SimpleTypography
                                                            text={
                                                                userData?.full_name ?
                                                                    userData?.full_name?.split(" ")[0] :
                                                                    <CircularProgress size="1rem" />
                                                            }
                                                            sx={open ? { color: "#7210BE !important" } : {}}
                                                            className={'user__name'}
                                                        />
                                                        <KeyboardArrowDownIcon
                                                            sx={!open ? { minWidth: "11px", minHeight: "7px", color: "black" } : { minWidth: "11px", minHeight: "7px", color: "#7210BE", transform: "rotateZ(180deg)", transitionDuration: "1000ms" }}
                                                        />
                                                        {/* <Image
                                                        width="11px"
                                                        height="7px"
                                                        alt='user icon'
                                                        src="/icons/user-arrow.svg"
                                                    /> */}
                                                    </Box>
                                                </Button>

                                            </Item> :

                                            <Item sx={{ padding: "0", display: "flex" }}>
                                                <Box sx={{ marginRight: "16px" }}>
                                                    <Buttons
                                                        name="Регистрация "
                                                        onClick={() => {
                                                            dispatch(setSignupState(true))
                                                            dispatch(setOpenModal(true))
                                                        }}
                                                        className="bordered__btn--signup"
                                                    />
                                                </Box>
                                                <Buttons
                                                    name="Логин"
                                                    onClick={() => {
                                                        dispatch(setLoginState(true));
                                                        dispatch(setOpenModal(true))
                                                    }}
                                                    className="login__btn"
                                                />
                                            </Item>
                                    }
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
                {
                    searchClicked ?
                        <Box className='search_bar'
                            sx={{
                                pointerEvents: searchClicked ? 'all' : 'none',
                                flexGrow: 1,
                                background: "#fff",
                                borderBottom: "1px solid #e0e0e0",
                                // marginBottom: usePathname() === "/" ? "0" : "32px",
                                marginBottom: 0,
                                position: "absolute",
                                width: '100%',
                                zIndex: 2,
                                top: '100%',
                                left: 0,
                                padding: '20px 0'
                            }}>
                            <Grid container spacing={2}
                                sx={{
                                    maxWidth: "1200px",
                                    width: "100%",
                                    margin: "0 auto",
                                    alignItems: "center",
                                }}
                            >
                                <Grid sx={{
                                    width: "360px",
                                    transition: "all 0.4s ease",
                                }}>
                                    <Box sx={{ overflow: "hidden" }}>
                                        <Box>
                                            <form onSubmit={(e) => SearchModel(e)}>
                                                <SearchInput className='search__input--models' search={SearchModel} onChange={setSearchVal} clic={setSearchClicked} placeHolder="Поиск..." startIcon={true}></SearchInput>
                                            </form>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        : null
                }
            </Box>
        </>
    )
}