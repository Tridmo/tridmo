import SimpleTypography from "@/components/typography";
import { getAllBrands } from "@/data/get_all_brands";
import {
  getAllCountries,
  selectAllCountries,
  selectAllCountries_status,
} from "@/data/get_all_countries";
import { setBrandCountryFilter } from "@/data/handle_filters";
import { brandsLimit } from "@/types/filters";
import { Box, FormControlLabel, Radio } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const SkletonData = Array(6).fill(null);

export default function CountryFilter() {
  const dispatch = useDispatch<any>();
  const countries_data = useSelector(selectAllCountries);
  const countries_status = useSelector(selectAllCountries_status);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") as string;

  const brandCountryFilter = useSelector(
    (state: any) => state?.handle_filters?.brand_country
  );
  const brandNameFilter = useSelector(
    (state: any) => state?.handle_filters?.brand_name
  );
  const brandsPageFilter = useSelector(
    (state: any) => state?.handle_filters?.brands_page
  );

  useEffect(() => {
    if (countries_status === "idle") {
      dispatch(getAllCountries());
    }
  }, [countries_status, dispatch]);

  const countries = useMemo(() => {
    if (countries_status !== "succeeded") return [];

    const base = [{ id: "", name: "Все", is__Selected: !brandCountryFilter }];
    const list =
      countries_data?.data?.map((country: any) => ({
        ...country,
        is__Selected: country.id === brandCountryFilter,
      })) || [];

    return [...base, ...list];
  }, [countries_data, countries_status, brandCountryFilter]);

  const handleChange = (id: string) => {
    dispatch(setBrandCountryFilter(id));

    dispatch(
      getAllBrands({
        country_id: id,
        name: brandNameFilter,
        orderBy: "models_count",
        limit: brandsLimit,
        page: page || brandsPageFilter,
      })
    );
  };

  if (countries_status !== "succeeded") {
    return (
      <Box>
        <SimpleTypography text="Страна" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {SkletonData.map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="100%"
              height={24}
              style={{ margin: "5px 0" }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <SimpleTypography text="Страна" className="section__title" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {countries.map((item: any) => (
          <FormControlLabel
            key={item.id}
            label={item.name}
            control={
              <Radio
                onClick={() => handleChange(item.id)}
                checked={item.is__Selected}
              />
            }
          />
        ))}
      </Box>
    </Box>
  );
}
