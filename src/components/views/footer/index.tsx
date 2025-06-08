"use client";

import { Logo } from "@/components/logo";
import { socialMedia } from "@/constants";
import { List, ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import SimpleTypography from "../../typography";

export default function Footer() {
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
          overflow: "hidden",
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
              <Logo />
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
              maxWidth: "500px",
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
              <Link href="mailto:tridmo.company@gmail.com">
                <SimpleTypography
                  text="tridmo.company@gmail.com"
                  className="footer__title"
                ></SimpleTypography>
              </Link>
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
                {socialMedia.map((item, index) => (
                  <ListItem
                    key={item.url + index}
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
            text={`${new Date().getFullYear()} © Все права защищены.`}
            className="footer__desc"
          ></SimpleTypography>
        </Box>
      </Box>
    </footer>
  );
}
