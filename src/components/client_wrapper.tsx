// app/components/ClientWrapper.tsx
'use client';

import RightBar from "@/components/right_bar";
import { Box } from "@mui/system";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import AlertWrapper from "../components/alert";
import {
  ENVIRONMENT,
  TAWKTO_PROPERTY_ID,
  TAWKTO_RUSSIAN_WIDGET_ID,
} from "../utils/env_vars";
import { GTagTracker } from "./gtag_tracker";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader
        color="#7210BE"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        zIndex={5001}
      />
      <Box sx={{ position: "relative" }}>
        <AlertWrapper />
      </Box>
      <RightBar />
      <GTagTracker />
      {children}
      {ENVIRONMENT == "production" && (
        <TawkMessengerReact
          propertyId={TAWKTO_PROPERTY_ID}
          widgetId={TAWKTO_RUSSIAN_WIDGET_ID}
        />
      )}
    </>
  );
};

export default ClientWrapper;
