import { Box } from "@mui/material";
import StatsCard from "../../../stats_card";
import SimpleTypography from "../../../typography";

export function NumbersSection() {
  return (
    <Box width={'100%'}>
      <SimpleTypography text={'Числа:'}
        sx={{
          fontWeight: 500,
          fontSize: '22px',
          lineHeight: '26px',
          letterSpacing: '-0.02em',
        }}
      />
      <StatsCard numberStyles={{ fontSize: '38px', lineHeight: '46px' }} textStyles={{ fontSize: '22px', lineHeight: '26px' }} />
    </Box>
  )
}