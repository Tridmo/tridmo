import { Box, Grid } from "@mui/material";
import SimpleTypography from "../../../typography";
import { whyUs } from "../constants";

export function WhyUsSection() {
  return (
    <Box
      sx={{
        display: { xs: 'block', sm: 'block', md: 'block', lg: 'block', xl: 'block' },
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} paddingLeft={0}>
          <SimpleTypography
            text="Почему именно Demod?"
            className="section__title"
            variant="h2"
          />
        </Grid>
        {whyUs.map((item) => (
          <Grid
            key={item.id}
            item
            md={3}
            sm={6}
            xs={12}
            sx={{
              minHeight: { xs: 'unset', sm: 'unset', md: "300px", lg: "300px" },
            }}
          >
            <Box
              sx={{ background: "#fff", padding: "16px", height: "100%" }}
              className="why-us__card"
            >
              <Box
                sx={{
                  background: "#F3E5FF",
                  borderRadius: "8px",
                  width: "48px",
                  height: "48px",
                  marginBottom: "13px",
                  backgroundImage: `url(${item.icon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              ></Box>
              <SimpleTypography
                text={item.title}
                className="why-us__title"
                variant="h2"
              />
              <SimpleTypography
                text={item.desc}
                className="why-us__desc"
                variant="body1"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}