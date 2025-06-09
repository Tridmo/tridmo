import { Grid } from "@mui/material";
import { Suspense } from "react";
import CountryFilter from "./country_filter.component";

export default function BrandsFilters() {
  return (
    <Grid container rowGap={2} className="brands-page-filters">
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Suspense>
          <CountryFilter />
        </Suspense>
      </Grid>
    </Grid>
  );
}
