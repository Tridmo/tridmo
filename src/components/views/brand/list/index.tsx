import SimpleTypography from "@/components/typography";
import {
  liAvatarWrapper,
  liHeaderSx,
  liHeaderTextSx,
  listSx,
  liSx,
} from "@/styles/styles";
import { IMAGES_BASE_URL } from "@/utils/env_vars";
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface Props {
  brands: any[];
  pagination: any;
}

export default function BrandList({ brands, pagination }: Props) {
  const smallScreen = useMediaQuery("(max-width:768px)");

  const widthControl = {
    "&:nth-of-type(1)": {
      minWidth: smallScreen
        ? "60%"
        : { lg: "50%", md: "50%", sm: "50%", xs: "60%" },
      maxWidth: smallScreen
        ? "60%"
        : { lg: "50%", md: "50%", sm: "50%", xs: "60%" },
    },
    "&:nth-of-type(2)": {
      minWidth: smallScreen
        ? "30%"
        : { lg: "25%", md: "25%", sm: "25%", xs: "30%" },
      maxWidth: smallScreen
        ? "30%"
        : { lg: "25%", md: "25%", sm: "25%", xs: "30%" },
    },
    "&:nth-of-type(3)": {
      minWidth: "25%",
      maxWidth: "25%",
    },
  };

  return (
    <List sx={listSx}>
      <ListItem alignItems="center" key={-1} sx={liHeaderSx}>
        <SimpleTypography
          text="Бренд"
          sx={{
            ...liHeaderTextSx,
            ...widthControl,
            textAlign: "start !important",
          }}
        />
        {smallScreen ? (
          <SimpleTypography
            text="Кол-во моделей"
            sx={{
              ...liHeaderTextSx,
              ...widthControl,
              fontSize: {
                lg: "20px",
                md: "18px",
                sm: "16px",
                xs: "14px",
              },
            }}
          />
        ) : (
          <>
            <SimpleTypography
              text="Страна"
              sx={{
                ...liHeaderTextSx,
                ...widthControl,
                textAlign: "start !important",
              }}
            />
            <SimpleTypography
              text="Количество моделей"
              sx={{ ...liHeaderTextSx, ...widthControl }}
            />
          </>
        )}
      </ListItem>
      {brands && brands?.length != 0
        ? brands.map((brand, index: any) => (
            <Link key={brand?.id} href={`/${brand?.slug}`}>
              <ListItem alignItems="center" sx={liSx}>
                <ListItemText
                  sx={{
                    ...widthControl,
                    m: 0,
                    "& > span": {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    },
                  }}
                >
                  <ListItemAvatar
                    sx={{ ...liAvatarWrapper, borderRadius: "8px" }}
                  >
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={
                        brand?.image_src
                          ? `${IMAGES_BASE_URL}/${brand?.image_src}`
                          : "/img/no-image.png"
                      }
                      alt="Landing image"
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    className="brand_name"
                    sx={{
                      marginLeft: {
                        lg: "16px",
                        md: "16px",
                        sm: "12px",
                        xs: "8px",
                      },
                    }}
                  >
                    <SimpleTypography
                      text={brand?.name}
                      sx={{
                        fontSize: {
                          lg: "22px",
                          md: "20px",
                          sm: "18px",
                          xs: "18px",
                        },
                        fontWeight: 400,
                        lineHeight: "26px",
                        letterSpacing: "-0.02em",
                        textAlign: "start",
                        color: "#141414",
                      }}
                    />
                    <SimpleTypography
                      text={`${
                        brand?.site_link.includes("https://") ||
                        brand?.site_link.includes("http://")
                          ? brand?.site_link.split("://")[1].replaceAll("/", "")
                          : brand?.site_link
                      }`}
                      sx={{
                        fontSize: {
                          lg: "18px",
                          md: "18px",
                          sm: "16px",
                          xs: "14px",
                        },
                        fontWeight: 400,
                        lineHeight: "24px",
                        letterSpacing: "-0.01em",
                        textAlign: "start",
                        color: "#848484",
                      }}
                    />
                  </ListItemText>
                </ListItemText>

                {smallScreen ? (
                  <>
                    <ListItemText sx={{ ...widthControl }}>
                      <SimpleTypography
                        text={brand?.models_count}
                        sx={{
                          fontSize: {
                            lg: "22px",
                            md: "20px",
                            sm: "18px",
                            xs: "16px",
                          },
                          fontWeight: 400,
                          lineHeight: "26px",
                          letterSpacing: "-0.02em",
                          textAlign: "center",
                        }}
                      />
                    </ListItemText>
                  </>
                ) : (
                  <>
                    <ListItemText sx={{ ...widthControl }}>
                      <SimpleTypography
                        text=""
                        sx={{
                          fontSize: {
                            lg: "22px",
                            md: "20px",
                            sm: "18px",
                            xs: "16px",
                          },
                          fontWeight: 400,
                          lineHeight: "26px",
                          letterSpacing: "-0.02em",
                          textAlign: "start",
                        }}
                      >
                        {brand?.country}
                      </SimpleTypography>
                    </ListItemText>

                    <ListItemText sx={{ ...widthControl }}>
                      <SimpleTypography
                        text={brand?.models_count}
                        sx={{
                          fontSize: {
                            lg: "22px",
                            md: "20px",
                            sm: "18px",
                            xs: "16px",
                          },
                          fontWeight: 400,
                          lineHeight: "26px",
                          letterSpacing: "-0.02em",
                          textAlign: "center",
                        }}
                      />
                    </ListItemText>
                  </>
                )}
              </ListItem>
              {brands?.length && index != brands?.length - 1 ? (
                <Divider sx={{ margin: 0 }} variant="inset" component="li" />
              ) : null}
            </Link>
          ))
        : null}
    </List>
  );
}
