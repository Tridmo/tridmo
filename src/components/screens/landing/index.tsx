"use client";

import { Box } from "@mui/material";
import { DiziproSection } from "./sections/dizipro.section";
import { HeaderHeroSection } from "./sections/header_hero.section";
import { InteriorsSection } from "./sections/interiors.section";
import { ModelsSection } from "./sections/models.section";
import { MorePagesSection } from "./sections/more_pages.section";
import { WhyUsSection } from "./sections/why_us.section";

const ContainerStyle = {
  width: {
    xs: "100%",
    lg: "1200px",
  },
  display: "flex",
  margin: { xs: "0", lg: "0 auto" },
  padding: { xs: "0 18px", lg: 0 },
  alignItems: "center",
}

export default function LandingPage() {

  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: "#fff" }}>
        <Box
          sx={{
            ...ContainerStyle,
            minHeight: { xs: 'unset', sm: 'unset', md: '500px', lg: '500px', xl: '500px' },
          }}
        >
          <HeaderHeroSection />
        </Box>
      </Box>

      <Box sx={{ width: "100%", p: { xs: "30px 0", md: "40px 0" } }}>
        <Box sx={ContainerStyle}>
          <MorePagesSection />
        </Box>
      </Box>

      <Box sx={{ width: "100%", pt: { xs: "14px", md: "44px" }, pb: { xs: "44px", md: "84px" } }}>
        <Box sx={{ ...ContainerStyle }}>
          <DiziproSection />
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box sx={ContainerStyle}>
          <ModelsSection />
        </Box>
      </Box>

      <Box sx={{ width: "100%", marginTop: { xs: '32px' } }}>
        <Box sx={ContainerStyle}>
          <InteriorsSection />
        </Box >
      </Box>
      
      {/* 
      <Box sx={{ width: "100%", backgroundColor: '#fff', py: '32px' }}>
        <Box sx={{ ...ContainerStyle }}>
          <NumbersSection />
        </Box>
      </Box> 
      */}

      {/* <Box sx={{ width: "100%", p: { xs: "34px 0", md: "44px 0" } }}>
        <Box sx={{ ...ContainerStyle }}>
          <AboutUsSection />
        </Box>
      </Box> */}

      <Box sx={{ width: "100%", marginY: { xs: '32px', md: '44px' } }}>
        <Box sx={ContainerStyle}>
          <WhyUsSection />
        </Box>
      </Box>
    </>
  );
}
