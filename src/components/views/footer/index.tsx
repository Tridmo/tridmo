"use client";

import { ThemeProps } from "@/types/theme";
import { List, ListItem, styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Link from "next/link";
import SimpleTypography from "../../typography";

export default function Footer() {
  const Item = styled(Paper)(({ theme }: ThemeProps) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const footerList = [
    {
      text: "О нас",
      url: "about-us",
    },
    {
      text: "Условия",
      url: "terms-condications",
    },
    {
      text: "Компания",
      url: "company",
    },
    {
      text: "Блог",
      url: "blog",
    },
    {
      text: "Сообщество",
      url: "community",
    },
    {
      text: "Карьера",
      url: "careers",
    },
  ];

  const socialMedia = [
    {
      icon: "/icons/instagram-icon.svg",
      url: "https://www.instagram.com/demod.uz/",
      margin: true,
    },
    {
      icon: "/icons/telegram-icon.svg",
      url: "https://t.me/demoduz",
      margin: true,
    },
    {
      icon: "/icons/chat.svg",
      url: "https://t.me/demod_uz",
      margin: true,
    },
  ];

  return (
    <footer style={{ marginTop: "auto" }}>
      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid #e0e0e0",
          paddingTop: "48px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          overflow: "hidden",
            padding: "0 16px",
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              marginBottom: { xs: "16px", sm: "0" },
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Link href="/">
              <Image
                width="110"
                height="24"
                alt="demo svg"
                src="/logos/logo.svg"
              />
            </Link>
          </Box>

          {/* Empty Box to Maintain Layout on Larger Screens */}
          <Box sx={{ display: { xs: "none", sm: "block" }, flex: 1 }}></Box>

          {/* Contact Information Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", sm: "flex-start" },
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Box
              sx={{
                marginBottom: { xs: "16px", sm: "0" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <SimpleTypography
                text="Для сотрудничества"
                className="footer__title"
              ></SimpleTypography>
              <Typography variant="h4" sx={{ fontSize: "18px", color: "#333" }}>
                +998 90 666 66 60
              </Typography>
            </Box>

            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <SimpleTypography
                text="Свяжитесь с нами"
                className="footer__title"
              ></SimpleTypography>
              <List
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  padding: "0",
                  gap: "24px",
                }}
              >
                {socialMedia.map((item, i) => (
                  <ListItem
                    key={i}
                    sx={{
                      width: "auto",
                      padding: "0",
                    }}
                  >
                    <Link href={item.url} target="_blank">
                      <Image
                        width={20}
                        height={20}
                        alt="icon"
                        src={item.icon}
                      />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>

        {/* Footer Description */}
        <Box sx={{ marginTop: "16px", textAlign: "center", width: "100%" }}>
          <SimpleTypography
            text="2024 © Все права защищены."
            className="footer__desc"
          ></SimpleTypography>
        </Box>
      </Box>
    </footer>
  );
}

{
  /* <Grid item xs={3} sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }} >
                        <Item sx={{ padding: "0" }}>
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: "0" }}>
                                {
                                    footerList.slice(0, 3).map((item, i) => (
                                        <ListItem
                                            key={i}
                                            sx={{ padding: "0" }}
                                        >
                                            <Link href={item.url}>

                                                <SimpleTypography text={item.text} className='footer__link'></SimpleTypography>

                                            </Link>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Item>
                    </Grid>
                    <Grid item xs={3} sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }} >
                        <Item sx={{ padding: "0" }}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper', padding: "0" }}>
                                {
                                    footerList.slice(3, 6).map((item, i) => (
                                        <ListItem
                                            key={i}
                                            sx={{ padding: "0" }}
                                        >
                                            <Link href={item.url}>

                                                <SimpleTypography text={item.text} className='footer__link'></SimpleTypography>

                                            </Link>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Item>
                    </Grid> */
}
