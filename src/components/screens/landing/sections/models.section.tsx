import { Box, Grid } from "@mui/material";
import SimpleTypography from "../../../typography";
import Link from "next/link";
import Buttons from "../../../buttons";
import SimpleCard from "../../../simple_card";

export function ModelsSection() {
  return (
    <Grid container>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        container
        spacing={2}
        className="texts__wrap"
      >
        <Grid item xs={10}>
          <SimpleTypography
            text="3D модели"
            className="section__title"
            variant="h2"
          />
        </Grid>

        <Grid
          item
          xs={2}
          sx={{
            marginBottom: "12px",
            display: { xs: "none", sm: "flex" },
            justifyContent: "flex-end",
          }}
        >
          <Link href={`models`}>
            <Buttons
              name={"Узнайте больше"}
              endIcon={"right"}
              className={`bordered__btn--explore`}
              sx={{ textWrap: "nowrap" }}
            />
          </Link>
        </Grid>
      </Grid>

      <SimpleCard cols={5} route={"landing_models"} cardImgHeight={'200px'} />

      <Box width={"100%"}>
        <Link href={`models`}>
          <Buttons
            name={"Узнайте больше"}
            endIcon={"right"}
            className={`bordered__btn--explore`}
            sx={{
              width: "100%",
              textWrap: "nowrap",
              display: { xs: "flex", sm: "none" },
            }}
          />
        </Link>
      </Box>
    </Grid>
  )
}