import { setSelectedConversation } from "@/data/chat";
import { selectChatToken } from "@/data/get_chat_token";
import { selectOneBrand } from "@/data/get_one_brand";
import { setLoginState, setOpenModal } from "@/data/modal_checker";
import { chatApi, setChatToken } from "@/utils/axios";
import { IMAGES_BASE_URL } from "@/utils/env_vars";
import {
  Instagram,
  Language,
  PhoneOutlined,
  PlaceOutlined,
  RateReview,
} from "@mui/icons-material";
import { Box, Grid, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Buttons from "../../../buttons";
import SimpleTypography from "../../../typography";

export default function BrandMobileMode() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const brand = useSelector(selectOneBrand);
  const token = useSelector(selectChatToken);
  const isAuthenticated = useSelector(
    (state: any) => state?.auth_slicer?.authState
  );
  const [conversationLoading, setConversationLoading] =
    useState<boolean>(false);

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

  function getSocialLinkUsername(urls: string[], target: string) {
    const has = urls.find((url) => target.startsWith(url));
    return target ? (!!has ? target.split(has)[1] : target) : "";
  }

  function getUrlDomen(url: string) {
    let domen = url.replace("http://", "").replace("https://", "");
    return domen;
  }

  async function handleCreateConversation() {
    if (isAuthenticated) {
      setConversationLoading(true);
      setChatToken(
        Cookies.get("chatToken") ? Cookies.get("chatToken") : token ? token : ""
      );
      chatApi
        .post(`/conversations`, {
          members: [brand?.admin_user_id],
        })
        .then((res) => {
          dispatch(setSelectedConversation(res?.data?.id));
          router.push("/chat");
          setConversationLoading(false);
        });
    } else {
      dispatch(setLoginState(true));
      dispatch(setOpenModal(true));
    }
  }

  const width = useMediaQuery("(max-width:780px)");

  return (
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
                width: { md: "152px", sm: "140px", xs: "112px" },
                height: { md: "152px", sm: "140px", xs: "112px" },
                position: "relative",
                borderRadius: {
                  md: `${152 / 20}px`,
                  sm: `${140 / 20}px`,
                  xs: `${112 / 20}px`,
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
                }}
                src={
                  brand?.image_src
                    ? `${IMAGES_BASE_URL}/${brand?.image_src}`
                    : "/img/avatar.png"
                }
              />
            </Box>
            <Box>
              {brand.name &&
                brand.name.split(" ").map((word: string) => (
                  <SimpleTypography
                    sx={{
                      fontSize: {
                        md: "25px",
                        sm: "22px",
                        xs: "20px",
                      },
                      fontWeight: "500",
                      lineFeight: "26px",
                      letterSpacing: "-0.02em",
                      textAlign: {
                        md: "center",
                        sm: "start",
                        xs: "start",
                      },
                    }}
                    text={word}
                  />
                ))}
            </Box>
          </Box>
          <SimpleTypography
            sx={{
              marginTop: "10px",
              fontSize: { lg: "20px", md: "20px", sm: "18px", xs: "16px" },
              fontWeight: "500",
              lineFeight: "26px",
              letterSpacing: "-0.02em",
              textAlign: {
                xs: "start",
              },
            }}
            text={brand?.description}
          />
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
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Link
                style={{ width: "100%" }}
                target="_blank"
                href={`http://maps.google.com/?q=${brand?.address}`}
                rel="noopener noreferrer"
              >
                <Buttons className="brand__box" name="">
                  <PlaceOutlined
                    sx={{
                      width: "23px",
                      height: "23px",
                      color: "#424242",
                    }}
                  />
                  <Box sx={{ marginLeft: "11px" }}>
                    <SimpleTypography className="brand__name" text="Локация" />
                    <SimpleTypography
                      className="brand__box--text"
                      text={brand?.address}
                    />
                  </Box>
                </Buttons>
              </Link>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Link
                target="_blank"
                style={{ width: "100%" }}
                href={`tel:${brand?.phone}`}
              >
                <Buttons className="brand__box" name="">
                  <PhoneOutlined
                    sx={{
                      width: "23px",
                      height: "23px",
                      color: "#424242",
                    }}
                  />
                  <Box sx={{ marginLeft: "11px" }}>
                    <SimpleTypography
                      className="brand__name"
                      text="Номер телефона"
                    />
                    <SimpleTypography
                      className="brand__box--text"
                      text={`${brand?.phone}`}
                    />
                  </Box>
                </Buttons>
              </Link>
            </Grid>

            {!!brand?.instagram && (
              <Grid item sx={{ width: "100%" }}>
                <Link
                  target="_blank"
                  style={{ width: "100%" }}
                  href={getSocialLink(
                    ["https://instagram.com/", "https://www.instagram.com/"],
                    brand?.instagram
                  )}
                >
                  <Buttons className="brand__box" name="">
                    <Instagram
                      sx={{
                        width: "23px",
                        height: "23px",
                        color: "#424242",
                      }}
                    />
                    <Box sx={{ marginLeft: "11px" }}>
                      <SimpleTypography
                        className="brand__name"
                        text="Инстаграм"
                      />
                      <SimpleTypography
                        className="brand__box--text"
                        text={getSocialLinkUsername(
                          [
                            "https://instagram.com/",
                            "https://www.instagram.com/",
                          ],
                          brand?.instagram
                        )}
                      />
                    </Box>
                  </Buttons>
                </Link>
              </Grid>
            )}

            {!!brand?.site_link && (
              <Grid item sx={{ width: "100%" }}>
                <Link
                  target="_blank"
                  style={{ width: "100%" }}
                  href={brand?.site_link || ""}
                >
                  <Buttons className="brand__box" name="">
                    <Language
                      sx={{
                        width: "23px",
                        height: "23px",
                        color: "#424242",
                      }}
                    />
                    <Box sx={{ marginLeft: "11px" }}>
                      <SimpleTypography
                        className="brand__name"
                        text="Веб-сайт"
                      />
                      <SimpleTypography
                        className="brand__box--text"
                        text={getUrlDomen(brand?.site_link || "")}
                      />
                    </Box>
                  </Buttons>
                </Link>
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
      <Grid
        item
        sx={{
          mt: "24px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Buttons
          startIcon={conversationLoading}
          disabled={!brand?.admin_user_id}
          onClick={() => handleCreateConversation()}
          sx={{ width: { xs: "100%", sm: "fit-content" } }}
          className="upload__btn"
          name="Написать сообщение"
          childrenFirst={true}
        >
          <RateReview sx={{ mr: "8px" }} />
        </Buttons>
      </Grid>
    </Box>
  );
}
