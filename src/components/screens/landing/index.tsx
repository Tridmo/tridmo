"use client";

import Buttons from "@/components/buttons";
import SearchInput from "@/components/inputs/search";
import { Box, Grid, IconButton, Skeleton, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllModels } from "../../../data/get_all_models";
import { selectTopModels } from "../../../data/get_top_models";
import { setModelNameFilter } from "../../../data/handle_filters";
import { Carousel } from "../../custom_card/carousel";
import SimpleTypography from "../../typography";
import StatsCard from "../../stats_card";
import { DiziproSection } from "./sections/dizipro.section";
import { WhyUsSection } from "./sections/why_us.section";
import { InteriorsSection } from "./sections/interiors.section";
import { ModelsSection } from "./sections/models.section";
import { MorePagesSection } from "./sections/more_pages.section";
import { AboutUsSection } from "./sections/about_us.section";
import { HeaderHeroSection } from "./sections/header_hero.section";
import { NumbersSection } from "./sections/numbers.section";

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

      <Box sx={{ width: "100%", p: { xs: "44px 0", md: "94px 0" } }}>
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

      <Box sx={{ width: "100%", p: { xs: "54px 0", md: "94px 0" } }}>
        <Box sx={{ ...ContainerStyle }}>
          <AboutUsSection />
        </Box>
      </Box>

      <Box sx={{ width: "100%", marginTop: { xs: '32px' } }}>
        <Box sx={ContainerStyle}>
          <WhyUsSection />
        </Box>
      </Box>
    </>
  );
}
