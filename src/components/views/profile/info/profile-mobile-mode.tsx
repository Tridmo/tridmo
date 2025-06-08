import { selectChatToken } from "@/data/get_chat_token";
import { selectDesignerProfile } from "@/data/get_designer";
import { selectMyProfile } from "@/data/me";
import {
  setAddingProjectState,
  setOpenModal,
  setProfileEditState,
  setProfileImagePreview,
  setProfileImageState,
} from "@/data/modal_checker";
import { IMAGES_BASE_URL } from "@/utils/env_vars";
import formatDate from "@/utils/format_date";
import { OpenInNew } from "@mui/icons-material";
import { Box, Grid, Input, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Buttons from "../../../buttons";
import SimpleTypography from "../../../typography";

interface ProfileProps {
  of: "designer" | "own";
}

export default function ProfileMobileMode(props: ProfileProps) {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: any) => state?.auth_slicer?.authState
  );
  const getProfileStatus = useSelector((state: any) =>
    props?.of == "designer"
      ? state?.get_designer?.status
      : state?.get_profile?.status
  );
  const dispatch = useDispatch();
  const profileInfo = useSelector(
    props?.of == "designer" ? selectDesignerProfile : selectMyProfile
  );
  const token = useSelector(selectChatToken);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [conversationLoading, setConversationLoading] =
    useState<boolean>(false);

  function handleClick() {
    const fileInput =
      hiddenFileInput.current?.querySelector('input[type="file"]');
    if (fileInput) {
      (fileInput as HTMLInputElement).click();
    }
  }

  function getSocialLink(
    urls: string[],
    target: string,
    connector: string = "/"
  ) {
    const has = urls.find((url) => target.startsWith(url));
    return target
      ? !!has
        ? target
        : `${urls[0]}${connector}${target}`
      : urls[0];
  }

  async function handleProfileImageChange(e) {
    dispatch(setProfileImageState(true));
    dispatch(setOpenModal(true));
    dispatch(setProfileImagePreview(e.target.files[0]));
  }

  // async function handleCreateConversation() {
  //   if (isAuthenticated) {
  //     setConversationLoading(true);
  //     setChatToken(Cookies.get("chatToken") || token);

  //     chatApi
  //       .post(`/conversations`, {
  //         members: [profileInfo?.user_id],
  //       })
  //       .then((res) => {
  //         dispatch(setSelectedConversation(res?.data?.id));
  //         router.push("/chat");
  //         setConversationLoading(false);
  //       });
  //   } else {
  //     dispatch(setLoginState(true));
  //     dispatch(setOpenModal(true));
  //   }
  // }

  const width = useMediaQuery("(max-width:780px)");

  if (getProfileStatus == "succeeded") {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            padding: "20px",
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: "4px",
            backgroundColor: "#fff",
            border: "1px solid #E0E0E0",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: width ? "column" : "row",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Box sx={{ width: width ? "100%" : "45%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Box
                  sx={{
                    width: {
                      lg: "152px",
                      md: "152px",
                      sm: "140px",
                      xs: "112px",
                    },
                    height: {
                      lg: "152px",
                      md: "152px",
                      sm: "140px",
                      xs: "112px",
                    },
                    position: "relative",
                    borderRadius: {
                      lg: `${152 / 2}px`,
                      md: `${152 / 2}px`,
                      sm: `${140 / 2}px`,
                      xs: `${112 / 2}px`,
                    },
                    bgcolor: "#fff",
                    overflow: "hidden",

                    "&:hover button": {
                      opacity: "1",
                    },
                  }}
                >
                  <Image
                    fill
                    sizes={"100%"}
                    alt="avatar"
                    style={{
                      objectFit: "cover",
                      margin: "0 auto",
                      borderRadius: "50%",
                    }}
                    src={
                      profileInfo?.image_src
                        ? `${IMAGES_BASE_URL}/${profileInfo?.image_src}`
                        : "/img/avatar.png"
                    }
                  />
                  {props?.of == "own" ? (
                    <>
                      <Buttons
                        className="image_change__btn"
                        onClick={handleClick}
                        sx={{
                          opacity: "0",
                          cursor: "pointer",
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          rigth: 0,
                          width: {
                            lg: "152px",
                            md: "152px",
                            sm: "140px",
                            xs: "112px",
                          },
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#00000040",

                          "&:hover": {
                            backgroundColor: "#00000060",
                          },
                        }}
                      >
                        <Image
                          width={24}
                          height={24}
                          alt=""
                          src={"/icons/reload-icon.svg"}
                        />
                      </Buttons>

                      <Input
                        ref={hiddenFileInput}
                        onChange={handleProfileImageChange}
                        sx={{ display: "none" }}
                        type="file"
                        inputProps={{
                          multiple: false,
                          accept: "image/png, image/jpg, image/jpeg",
                        }}
                      />
                    </>
                  ) : null}
                </Box>
                <Box>
                  <SimpleTypography
                    sx={{
                      fontSize: {
                        lg: "25px",
                        md: "25px",
                        sm: "22px",
                        xs: "20px",
                      },
                      fontWeight: "500",
                      lineFeight: "26px",
                      letterSpacing: "-0.02em",
                      textAlign: {
                        lg: "center",
                        md: "center",
                        sm: "start",
                        xs: "start",
                      },
                    }}
                    text={profileInfo?.full_name}
                  />
                  <SimpleTypography
                    sx={{
                      fontSize: {
                        lg: "20px",
                        md: "20px",
                        sm: "18px",
                        xs: "16px",
                      },
                      fontWeight: "500",
                      lineFeight: "26px",
                      letterSpacing: "-0.02em",
                      textAlign: {
                        lg: "center",
                        md: "center",
                        sm: "start",
                        xs: "start",
                      },
                    }}
                    text={`@${profileInfo?.username}`}
                  />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SimpleTypography
                      sx={{
                        color: "#3C9154",
                        fontSize: "16px",
                        fontWeight: "400",
                        textAlign: "left",
                        marginRight: "3px",
                      }}
                      text={`Галерея:`}
                    />

                    <SimpleTypography
                      sx={{
                        color: "#3C9154",
                        fontSize: "16px",
                        fontWeight: "600",
                        textAlign: "left",
                      }}
                      text={
                        profileInfo.designs_count
                          ? profileInfo.designs_count
                          : 0
                      }
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  m: "16px 0 8px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <SimpleTypography
                  text={"Компания:"}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "15px",
                      xs: "14px",
                    },
                  }}
                />
                <SimpleTypography
                  text={profileInfo?.company_name}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "15px",
                      xs: "14px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  my: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <SimpleTypography
                  text={"Дата регистрации:"}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "15px",
                      xs: "14px",
                    },
                  }}
                />
                <SimpleTypography
                  text={formatDate(profileInfo?.created_at)}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "15px",
                      xs: "14px",
                    },
                  }}
                />
              </Box>
              {props?.of == "own" && (
                <Box
                  sx={{
                    my: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <SimpleTypography
                    text={"Э-почта:"}
                    sx={{
                      fontSize: {
                        lg: "16px",
                        md: "16px",
                        sm: "15px",
                        xs: "14px",
                      },
                    }}
                  />
                  <SimpleTypography
                    text={profileInfo?.email}
                    sx={{
                      fontSize: {
                        lg: "16px",
                        md: "16px",
                        sm: "15px",
                        xs: "14px",
                      },
                    }}
                  />
                </Box>
              )}
            </Box>

            <Box
              sx={{
                width: width ? "100%" : "45%",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <SimpleTypography
                  text={"Адрес:"}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "15px",
                      xs: "14px",
                    },
                  }}
                />
                {!!profileInfo?.address ? (
                  <SimpleTypography
                    text={profileInfo?.address}
                    sx={{
                      fontSize: {
                        lg: "16px",
                        md: "16px",
                        sm: "15px",
                        xs: "14px",
                      },
                    }}
                  />
                ) : (
                  props.of == "own" && <AddButton />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <SimpleTypography
                  text={"Сайт:"}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "15px",
                      xs: "14px",
                    },
                  }}
                />
                {!!profileInfo?.portfolio_link ? (
                  <SimpleTypography
                    text={profileInfo?.portfolio_link || ""}
                    sx={{
                      fontSize: {
                        lg: "16px",
                        md: "16px",
                        sm: "15px",
                        xs: "14px",
                      },
                    }}
                  />
                ) : (
                  props.of == "own" && <AddButton />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <SimpleTypography
                  text={"Телефон:"}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "15px",
                      xs: "14px",
                    },
                  }}
                />
                {!!profileInfo?.phone ? (
                  <SimpleTypography
                    text={profileInfo?.phone}
                    sx={{
                      fontSize: {
                        lg: "16px",
                        md: "16px",
                        sm: "15px",
                        xs: "14px",
                      },
                    }}
                  />
                ) : (
                  props.of == "own" && <AddButton />
                )}
              </Box>
              {profileInfo?.instagram || props.of === "own" ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <SimpleTypography
                    text={"Инстаграм:"}
                    sx={{
                      fontSize: {
                        lg: "16px",
                        md: "16px",
                        sm: "15px",
                        xs: "14px",
                      },
                    }}
                  />
                  {props.of == "own" && !profileInfo?.instagram ? (
                    <AddButton />
                  ) : (
                    <OpenButton
                      href={getSocialLink(
                        ["https://instagram.com", "https://www.instagram.com"],
                        profileInfo?.instagram
                      )}
                    />
                  )}
                </Box>
              ) : null}
            </Box>
          </Box>
          <Grid
            container
            sx={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              md={12}
              xs={12}
              sx={{ mt: { lg: 0, md: 0, sm: "24px", xs: "24px" } }}
            >
              <Buttons
                sx={{ width: "100%" }}
                className="bookmark__btn"
                name="Редактировать"
                childrenFirst={true}
                onClick={() => {
                  dispatch(setProfileEditState(true));
                  dispatch(setOpenModal(true));
                }}
              >
                <Image
                  width={16}
                  height={16}
                  alt="Phone number"
                  src={"/icons/edit.svg"}
                />
              </Buttons>
            </Grid>
          </Grid>
        </Box>
        {props?.of == "own" && (
          <Grid
            container
            sx={{
              width: "100%",
              marginBottom: "16px",
              justifyContent: "space-between",
              display: { xs: "flex", md: "none" },
            }}
          >
            <Buttons
              sx={{
                width: "48%",
                height: "auto !important",
                padding: {
                  lg: "8px 20px !important",
                  md: "8px 20px !important",
                  sm: "8px 12px !important",
                  xs: "8px 12px !important",
                },
              }}
              name="Создать проект"
              childrenFirst={true}
              className="login__btn"
              onClick={() => {
                dispatch(setAddingProjectState(true));
                dispatch(setOpenModal(true));
              }}
            >
              <Image
                alt="upload icon"
                src="/icons/plus-bordered.svg"
                width={16}
                height={16}
              />
            </Buttons>
            <Link href={"/interiors/addnew"} style={{ width: "48%" }}>
              <Buttons
                sx={{
                  width: "100%",
                  height: "auto !important",
                  padding: {
                    lg: "8px 20px !important",
                    md: "8px 20px !important",
                    sm: "8px 12px !important",
                    xs: "8px 12px !important",
                  },
                }}
                name="Добавить работу"
                childrenFirst={true}
                className="upload__btn"
              >
                <Image
                  alt="upload icon"
                  src="/icons/plus-white.svg"
                  width={13}
                  height={13}
                />
              </Buttons>
            </Link>
          </Grid>
        )}
      </>
    );
  }
}

function AddButton() {
  const dispatch = useDispatch();
  return (
    <Buttons
      sx={{
        height: "auto !important",
        width: "154px",
        px: "7.5px !important",
        borderRadius: "28px !important",
        borderWidth: "1.7px !important",
      }}
      className="bookmark__btn"
      childrenFirst={true}
      onClick={() => {
        dispatch(setProfileEditState(true));
        dispatch(setOpenModal(true));
      }}
    >
      <Image width={14} height={14} alt="icon" src={"/icons/plus.svg"} />
      <SimpleTypography
        text="Добавить"
        sx={{
          fontSize: "14px",
          lineHeight: "17px",
        }}
      />
    </Buttons>
  );
}

function OpenButton({ href }) {
  return (
    <Link target="_blank" href={href}>
      <Buttons
        sx={{
          height: "auto !important",
          minWidth: "154px",
          borderRadius: "28px !important",
          px: "7.5px!important",
          borderWidth: "1.7px !important",
        }}
        className="bookmark__btn"
        childrenFirst={true}
      >
        <OpenInNew sx={{ width: "16px", height: "16px", mr: "8px" }} />
        <SimpleTypography
          text="Открыть"
          sx={{
            fontSize: "14px",
            lineHeight: "17px",
          }}
        />
      </Buttons>
    </Link>
  );
}
