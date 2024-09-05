import { Grid, IconButton, useMediaQuery } from "@mui/material";
import { setFiltersModal } from "../../../data/modal_checker";
import SimpleTypography from "../../typography";
import { Close } from "@mui/icons-material";
import { Suspense } from "react";
import Categories from "../categories/model_categories";
import Style from "../styles/model_styles";
import BrandsFilter from "../brands/brand_filter";
import { useDispatch } from "react-redux";

export default function ModelFilters() {
  const mdScreen = useMediaQuery('(max-width:960px)');
  const dispatch = useDispatch<any>();

  return (
    <Grid container rowGap={2} className='models-page__filters--child'>
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{ pt: '12px', }}>
        <Suspense>
          <Categories />
        </Suspense>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{ pt: '12px', borderTop: '1px solid #E0E0E0' }}>
        <Suspense>
          <Style />
        </Suspense>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{ pt: '12px', borderTop: '1px solid #E0E0E0' }}>
        <Suspense>
          <BrandsFilter />
        </Suspense>
      </Grid>
    </Grid>
  )
}