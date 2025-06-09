"use client"

import SimpleTypography from "@/components/typography";
import BrandList from "@/components/views/brand/list";
import BramdsListPagination from "@/components/views/brand/list/pagination";
import BramdsListPaginationIndicator from "@/components/views/brand/list/pagination_indicator";
import BrandListSkeleton from "@/components/views/brand/list/skeleton";
import BrandsFilters from "@/components/views/filters/brands_filters";
import { setBrandNameFilter } from "@/data/handle_filters";
import { setBrandsFilterModal } from "@/data/modal_checker";
import { brandsLimit } from "@/types/filters";
import { Close } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands, selectAllBrands } from "../../../data/get_all_brands";
import { ContainerStyle } from "../../../styles/styles";
import EmptyData from "../../views/empty_data";

export default function BrandsPage() {
  const getAllBrandStatus = useSelector(
    (state: any) => state?.get_all_brands?.status
  );
  const getBrandsNameFilter = useSelector(
    (state: any) => state?.handle_filters?.brand_name
  );
  const getBrandsPageFilter = useSelector(
    (state: any) => state?.handle_filters?.brands_page
  );
  const getBrandCountryFilter = useSelector(
    (state: any) => state?.handle_filters?.brand_country
  );
  const isFilterOpen = useSelector(
    (state: any) => state?.modal_checker?.isBrandsFilterModal
  );

  const smScreen = useMediaQuery("(max-width:600px)");
  const mdScreen = useMediaQuery("(max-width:960px)");

  const dispatch = useDispatch<any>();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const all__brands = useSelector(selectAllBrands);

  const [searchValue, setSearchValue] = useState("");
  const page = searchParams.get("page") as string;

  useEffect(() => {
    setSearchValue(searchParams.get("name") as string);
  }, [searchParams.toString()]);

  React.useEffect(() => {
    if (getAllBrandStatus === "idle") {
      dispatch(
        getAllBrands({
          name: searchParams.get("name") || getBrandsNameFilter,
          page: page || getBrandsPageFilter,
          orderBy: "models_count",
          limit: brandsLimit,
          country_id: getBrandCountryFilter,
        })
      );
    }
  }, [getAllBrandStatus, searchParams.toString()]);

  const removeFromQuery = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  async function clearSearch() {
    dispatch(setBrandNameFilter(""));
    dispatch(
      getAllBrands({
        name: "",
        orderBy: "models_count",
        limit: brandsLimit,
        page: page || getBrandsPageFilter,
        country_id: getBrandCountryFilter,
      })
    );
    const newQuery = removeFromQuery("name");
    router.push(`${pathname}?${newQuery}`);
    setSearchValue("");
  }

  return (
    <Box sx={ContainerStyle}>
      <SimpleTypography
        text="Бренды"
        className="section__title"
        sx={{ margin: "32px auto !important" }}
      />

      <Grid
        spacing={{ lg: 2, md: 2, sm: 0, xs: 0 }}
        container
        sx={{ margin: "24px 0 !important", width: "100%" }}
      >
        {mdScreen ? (
          <Box>
            <React.Fragment>
              <SwipeableDrawer
                sx={
                  smScreen
                    ? {
                        "& .MuiDrawer-paper": {
                          width: "100%",
                          p: "24px",
                        },
                      }
                    : {
                        "& .MuiDrawer-paper": {
                          width: "300px",
                          p: "24px",
                        },
                      }
                }
                anchor={"left"}
                open={isFilterOpen}
                onClose={() => dispatch(setBrandsFilterModal(false))}
                onOpen={() => dispatch(setBrandsFilterModal(true))}
              >
                <Box sx={{ width: "100%" }}>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <SimpleTypography
                      text="Фильтры"
                      sx={{ fontSize: "28px" }}
                    />
                    <IconButton
                      onClick={() => dispatch(setBrandsFilterModal(false))}
                    >
                      <Close />
                    </IconButton>
                  </Grid>
                  <BrandsFilters />
                </Box>
              </SwipeableDrawer>
            </React.Fragment>
          </Box>
        ) : (
          <Grid
            item
            className="models-page__filters"
            md={2.2}
            xs={12}
            sx={{
              paddingRight: "10px",
              borderRight: "1px solid #b3b3b3",
            }}
          >
            <BrandsFilters />
          </Grid>
        )}
        <Grid
          item
          lg={9.5}
          md={9.5}
          sm={12}
          xs={12}
          sx={{
            p: { lg: "0 0 0 16px", md: "0 0 0 16px", sm: "0", xs: "0" },
            minHeight: "90dvh",
          }}
        >
          <BramdsListPaginationIndicator
            mdScreen={mdScreen}
            smScreen={smScreen}
            isLoading={
              getAllBrandStatus == "loading" || getAllBrandStatus == "idle"
            }
            searchValue={searchValue}
            clearSearch={clearSearch}
            pagination={all__brands?.data?.pagination}
          />
          {getAllBrandStatus == "succeeded" ? (
            <>
              {all__brands?.data?.brands &&
              all__brands?.data?.brands?.length != 0 ? (
                <BrandList
                  brands={all__brands?.data?.brands}
                  pagination={all__brands?.data?.pagination}
                />
              ) : (
                <EmptyData sx={{ marginTop: "8px" }} />
              )}
              <BramdsListPagination
                pagination={all__brands?.data?.pagination}
              />
            </>
          ) : (
            <BrandListSkeleton />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
