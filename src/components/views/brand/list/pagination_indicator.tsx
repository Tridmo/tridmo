import Buttons from "@/components/buttons";
import SimpleTypography from "@/components/typography";
import { dataItemIndex } from "@/utils/utils";
import { Close } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  isLoading: boolean;
  searchValue: string;
  clearSearch: () => void;
  pagination: any;
}

const wrapperSx = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #e0e0e0",
  marginBottom: "20px",
};

export default function BramdsListPaginationIndicator({
  isLoading,
  searchValue,
  clearSearch,
  pagination,
}: Props) {
  if (isLoading) {
    return (
      <Grid container sx={wrapperSx}>
        <Grid
          item
          xs={12}
          sx={{ padding: "0 !important", alignItems: "center" }}
        >
          {searchValue ? (
            <SearchInfoBox
              searchValue={searchValue}
              clearSearch={clearSearch}
              pagination={pagination}
            />
          ) : null}
          <Skeleton variant="text" width={200} height={20} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container sx={wrapperSx}>
      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{ padding: "0 !important", alignItems: "center" }}
      >
        {searchValue ? (
          <SearchInfoBox
            searchValue={searchValue}
            clearSearch={clearSearch}
            pagination={pagination}
          />
        ) : null}

        <SimpleTypography
          text={`Показаны ${
            dataItemIndex<string>(pagination?.limit, pagination?.current, 1) ||
            0
          }–${
            dataItemIndex<string>(
              pagination?.limit,
              pagination?.current,
              pagination?.brands?.length
            ) || 0
          } из ${pagination?.data_count || 0} брендов`}
          className="pagenation__desc"
        />
      </Grid>
    </Grid>
  );
}

function SearchInfoBox({
  searchValue,
  clearSearch,
  pagination,
}: {
  searchValue: string;
  clearSearch: () => void;
  pagination: any;
}) {
  return (
    <Box
      sx={{
        borderBottom: "1px solid #e0e0e0",
        padding: "10px 0",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SimpleTypography
          text={`Дизайнеры  «${searchValue}»`}
          className="prodcts__result--title"
          variant="h2"
        />
        <Buttons
          onClick={clearSearch}
          sx={{
            color: "#646464",
            minWidth: "30px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
          }}
        >
          <Close />
        </Buttons>
      </Box>
      <SimpleTypography
        text={`найдено ${pagination?.data_count} результатов`}
        className="products__result--text"
        variant="h2"
      />
    </Box>
  );
}
