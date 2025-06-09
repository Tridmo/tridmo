import { Grid } from "@mui/material";
import { Suspense } from "react";
import Categories from "../../categories/model_categories";
import Style from "../../styles/model_styles";
import BrandsFilter from "./brand_filter.component";
import CountryFilter from "./country_filter.component";

export default function ModelFilters() {
  return (
    <Grid container rowGap={2} className="models-page__filters--child">
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Suspense>
          <CountryFilter />
        </Suspense>
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{ pt: "12px", borderTop: "1px solid #E0E0E0" }}
      >
        <Suspense>
          <Categories />
        </Suspense>
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{ pt: "12px", borderTop: "1px solid #E0E0E0" }}
      >
        <Suspense>
          <Style />
        </Suspense>
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{ pt: "12px", borderTop: "1px solid #E0E0E0" }}
      >
        <Suspense>
          <BrandsFilter />
        </Suspense>
      </Grid>
    </Grid>
  );
}
