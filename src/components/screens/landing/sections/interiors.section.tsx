import { Box, Grid } from "@mui/material";
import SimpleTypography from "../../../typography";
import Link from "next/link";
import Buttons from "../../../buttons";
import SimpleCard from "../../../simple_card";

export function InteriorsSection() {
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
            text="Интерьеры"
            className="section__title"
            variant="h2"
          />
        </Grid>

        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "12px",
          }}
        >
          <Link href={`interiors`}>
            <Buttons
              name={"Узнайте больше"}
              endIcon={"right"}
              className={`bordered__btn--explore`}
              sx={{
                width: "100%",
                textWrap: "nowrap",
                display: { xs: "none", sm: "flex" },
              }}
            />
          </Link>
        </Grid>
      </Grid>

      {/* INTERIORS MAP */}

      <SimpleCard cols={4} route={"interiors"} sliced={12} />

      <Box width={"100%"}>
        <Link href={`interiors`}>
          <Buttons
            name={"Узнайте больше"}
            endIcon={"right"}
            className={`bordered__btn--explore`}
            sx={{
              width: "100%",
              textWrap: "nowrap",
              mt: "8px",
              display: { xs: "flex", sm: "none" },
            }}
          />
        </Link>
      </Box>
    </Grid>
  )
}