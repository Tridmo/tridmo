import SimpleTypography from "./typography";

export const Logo = () => (
  <SimpleTypography
    sx={{
      fontSize: "32px",
      fontWeight: 900,
      color: "#000",
      textDecoration: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      lineHeight: "0.8",
      "&:hover": {
        color: "#000",
      },
    }}
    text="TRIDMO"
    variant="h2"
  />
);
