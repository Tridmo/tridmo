import Buttons from "@/components/buttons";
import SimpleTypography from "@/components/typography";
import { setBrandsFilterModal } from "@/data/modal_checker";
import { dataItemIndex } from "@/utils/utils";
import { Close, FilterAlt } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch } from "react-redux";

interface Props {
  isLoading: boolean;
  searchValue: string;
  clearSearch: () => void;
  pagination: any;
  mdScreen: boolean;
  smScreen: boolean;
}

const wrapperSx = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #e0e0e0",
  marginBottom: "20px",
  paddingBottom: "10px",
};

export default function BramdsListPaginationIndicator({
  isLoading,
  searchValue,
  clearSearch,
  pagination,
  mdScreen,
  smScreen,
}: Props) {
  const dispatch = useDispatch();
  const openFilters = () => {
    dispatch(setBrandsFilterModal(true));
  };

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
      {searchValue ? (
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{ padding: "0 !important", alignItems: "center" }}
        >
          <SearchInfoBox
            searchValue={searchValue}
            clearSearch={clearSearch}
            pagination={pagination}
          />
        </Grid>
      ) : null}
      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          padding: "0 !important",
          alignItems: "flex-end",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {mdScreen ? (
          <>
            <PaginationInfoBox pagination={pagination} />
            <FilterButton smScreen={smScreen} openFilters={openFilters} />
          </>
        ) : (
          <PaginationInfoBox pagination={pagination} />
        )}
      </Grid>
    </Grid>
  );
}

function FilterButton({
  smScreen,
  openFilters,
}: {
  smScreen: boolean;
  openFilters: () => void;
}) {
  return (
    <Buttons
      name={smScreen ? "" : "Фильтры"}
      childrenFirst
      className="bookmark__btn"
      onClick={openFilters}
    >
      <FilterAlt />
    </Buttons>
  );
}

function PaginationInfoBox({ pagination }: { pagination: any }) {
  return (
    <SimpleTypography
      text={`Показаны ${
        dataItemIndex<string>(pagination?.limit, pagination?.current, 1) || 0
      }–${
        dataItemIndex<string>(
          pagination?.limit,
          pagination?.current,
          pagination?.brands?.length
        ) || 0
      } из ${pagination?.data_count || 0} брендов`}
      className="pagenation__desc"
    />
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
          text={`Бренды «${searchValue}»`}
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
