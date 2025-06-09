import BasicPagination from "@/components/pagination/pagination";
import { Grid } from "@mui/material";
import { Suspense } from "react";

interface Props {
  pagination: any;
}

export default function BramdsListPagination({ pagination }: Props) {
  return (
    <Grid
      spacing={2}
      container
      sx={{
        width: "100%",
        margin: "0 auto",
        padding: "17px 0 32px 0",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          padding: "0 !important",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Suspense>
          <BasicPagination
            dataSource="brands"
            count={pagination?.pages}
            page={parseInt(pagination?.current) + 1}
          />
        </Suspense>
      </Grid>
    </Grid>
  );
}
