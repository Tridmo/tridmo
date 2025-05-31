"use client"

import { Box, Grid, MenuItem, styled, useMediaQuery } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInteriors } from "../../../data/get_all_interiors";
import { getAllModels } from "../../../data/get_all_models";
import {
  set_interiors_orderby,
  setModelOrderBy,
  setOrderByFilter,
} from "../../../data/handle_filters";
import { interiorOrderBy, modelOrderBy } from "../../../types/filters";
import { ThemeProps } from "../../../types/theme";
import SimpleTypography from "../../typography";
const FiltersItem = styled(MenuItem)(
  ({ theme }: ThemeProps) => `
        background: #F5F5F5;
        display:flex;
        align-items: center;
        justify-content: center;
        cursor:pointer;
        transition: all 0.4s ease;

        &:not(:last-child){
          border-right: 1px solid #E0E0E0;
        }
        &:hover{
          background: #FAFAFA;
        }

        &-selected {
          background: #FAFAFA;
        }
    
  `
);

function Sorts({ route, dataCount = <></>, ...props }) {
  let sortsData: {
    title: string;
    orderBy: string;
    isSelected: boolean;
  }[] = [];

  if (route == "models") {
    sortsData = [
      {
        title: "Даты",
        orderBy: "created_at",
        isSelected: true,
      },
      {
        title: "Топ",
        orderBy: "top",
        isSelected: false,
      },
    ];
  } else if (route == "interiors") {
    sortsData = [
      {
        title: "Даты",
        orderBy: "created_at",
        isSelected: true,
      },
      {
        title: "Кол-во просмотров",
        orderBy: "views",
        isSelected: false,
      },
      {
        title: "Кол-во лайков",
        orderBy: "likes",
        isSelected: false,
      },
    ];
  }

  const searchParams = useSearchParams();
  const dispatch = useDispatch<any>();
  const matches = useMediaQuery("(max-width:743px)");
  const xsScreen = useMediaQuery("(max-width:600px)");
  const mdScreen = useMediaQuery("(max-width:960px)");

  const keyword = searchParams.get("name") as string;
  const page = searchParams.get("page") as string;
  const [sorts, setSorts] = useState(sortsData);

  const getCategoryFilter = useSelector(
    (state: any) => state?.handle_filters?.categories
  );
  const getModelBrandFilter = useSelector(
    (state: any) => state?.handle_filters?.model_brand
  );
  const getColorFilter = useSelector(
    (state: any) => state?.handle_filters?.colors
  );
  const getStyleFilter = useSelector(
    (state: any) => state?.handle_filters?.styles
  );
  const getPageFilter = useSelector(
    (state: any) => state?.handle_filters?.page
  );
  const getModelTopFilter = useSelector(
    (state: any) => state?.handle_filters?.model_top
  );
  const getModelNameFilter = useSelector(
    (state: any) => state?.handle_filters?.model_name
  );
  const getModelOrder = useSelector(
    (state: any) => state?.handle_filters?.model_order
  );

  const getInteriorCategoryFilter = useSelector(
    (state: any) => state?.handle_filters?.interior_categories
  );
  const getInteriorOrder = useSelector(
    (state: any) => state?.handle_filters?.interiors_order
  );
  const getInteriorPageFilter = useSelector(
    (state: any) => state?.handle_filters?.interiors_page
  );

  function handleChange(selected: number) {
    setOrderByFilter({ by: sorts[selected].orderBy });

    if (route == "models") {
      dispatch(
        getAllModels({
          brand: getModelBrandFilter,
          categories: getCategoryFilter,
          colors: getColorFilter,
          styles: getStyleFilter,
          name: keyword || getModelNameFilter,
          top: getModelTopFilter,
          page: page || getPageFilter,
          orderBy: sorts[selected].orderBy,
          order: getModelOrder ?? "desc",
        })
      );
      dispatch(setModelOrderBy(sorts[selected].orderBy as modelOrderBy));
    } else if (route == "interiors") {
      dispatch(
        getAllInteriors({
          categories: getInteriorCategoryFilter,
          page: page || getInteriorPageFilter,
          orderBy: sorts[selected].orderBy,
          order: getInteriorOrder ?? "desc",
        })
      );
      dispatch(
        set_interiors_orderby(sorts[selected].orderBy as interiorOrderBy)
      );
    }

    setSorts(sorts.map((e, i) => ({ ...e, isSelected: i === selected })));
  }

  return (
    <Box
      sx={{
        width: "100%",
        paddingLeft: "8px",
      }}
    >
      <Grid
        container
        sx={{ width: "100%", margin: 0, display: "flex", alignItems: "center" }}
      >
        {(!mdScreen || !xsScreen) && (
          <Grid item>
            <SimpleTypography className="filters__title" text="Порядок:" />
          </Grid>
        )}
        <Grid
          item
          sx={{
            width: "auto",
            mr: "8px",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              border: "1px solid #E0E0E0",
              p: 0,
              m: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {sorts?.map((item, index) => (
              <FiltersItem
                key={item.title + index}
                onClick={() => handleChange(index)}
                sx={{
                  p: {
                    lg: "8px 16px",
                    md: "8px 16px",
                    sm: "8px 16px",
                    xs: "8px 8px",
                  },
                  ...(item.isSelected ? { backgroundColor: "#FAFAFA" } : {}),
                }}
              >
                <SimpleTypography
                  sx={{
                    color: item.isSelected
                      ? "#141414 !important"
                      : "#686868 !important",
                  }}
                  className="filters__item--text"
                  text={item.title}
                  variant="span"
                />
              </FiltersItem>
            ))}
          </Box>
        </Grid>
        <Grid
          lg={3.8}
          md={3.8}
          sm={matches ? 12 : 3.8}
          xs={12}
          sx={{
            m: matches ? "8px 0" : "0",
            p: "0 !important",
            display: "flex",
            alignItems: matches ? "baseline" : "flex-end",
            justifyContent: "space-between",
          }}
        >
          {dataCount}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Sorts