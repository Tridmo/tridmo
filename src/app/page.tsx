"use client"

import { getAllInteriors } from "@/data/get_all_interiors";
import { getMainStats } from "@/data/get_main_stats";
import React from "react";
import { useDispatch } from "react-redux";
import LandingPage from "../components/screens/landing";
import { getBrandsForLandingPage } from "../data/get_all_brands";
import { getDesignersForLandingPage } from "../data/get_all_designers";
import {
  getLandingModels,
  getLandingTopModels,
} from "../data/get_landingpage_models";
import { getTopModels } from "../data/get_top_models";

declare global {
  interface Window {
    tc: any;
  }
}

export default function Home() {
  const dispatch = useDispatch<any>();

  React.useEffect(() => {
    dispatch(getTopModels());
    dispatch(getAllInteriors({}));
    dispatch(getLandingTopModels());
    dispatch(getLandingModels());
    dispatch(getDesignersForLandingPage());
    dispatch(getBrandsForLandingPage({ orderBy: "models_count" }));
    dispatch(getMainStats());
  }, []);

  return (
    <section className="landing-page-section">
      <LandingPage />
    </section>
  );
}
