import {
  selectAllCountries,
  selectAllCountries_status,
} from "@/data/get_all_countries";
import { Box, FormControlLabel, Radio } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../../../data/get_all_countries";
import { getAllModels } from "../../../../data/get_all_models";
import { setCountryFilter } from "../../../../data/handle_filters";
import SimpleTypography from "../../../typography";

const SkletonData = ["", "", "", "", "", ""];
interface Props {
  id: string;
  name: string;
  is__Selected: boolean;
}
export default function CountryFilter() {
  const dispatch = useDispatch<any>();
  const countries_data = useSelector(selectAllCountries);
  const countries_status = useSelector(selectAllCountries_status);
  const [customCountries, setCustomCountries] = useState<Props[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get("name") as string;

  const getModelCategoryFilter = useSelector(
    (state: any) => state?.handle_filters?.categories
  );
  const getModelBrandFilter = useSelector(
    (state: any) => state?.handle_filters?.model_brand
  );
  const getModelCountryFilter = useSelector(
    (state: any) => state?.handle_filters?.country
  );
  const getModelColorFilter = useSelector(
    (state: any) => state?.handle_filters?.colors
  );
  const getModelStyleFilter = useSelector(
    (state: any) => state?.handle_filters?.styles
  );
  const getModelPageFilter = useSelector(
    (state: any) => state?.handle_filters?.page
  );
  const getModelTopFilter = useSelector(
    (state: any) => state?.handle_filters?.model_top
  );
  const getModelNameFilter = useSelector(
    (state: any) => state?.handle_filters?.model_name
  );
  const getModelOrderBy = useSelector(
    (state: any) => state?.handle_filters?.model_orderby
  );
  const getModelOrder = useSelector(
    (state: any) => state?.handle_filters?.model_order
  );

  useEffect(() => {
    if (countries_status == "idle") {
      dispatch(getAllCountries());
    }
  }, [countries_data, countries_status, dispatch]);

  useEffect(() => {
    if (countries_status === "succeeded") {
      if (router) {
        let arr = new Array();
        arr.push({
          id: "",
          name: "Все",
          is__Selected: true,
        });
        countries_data?.data?.forEach((country: Props) => {
          arr.push({
            id: country?.id,
            name: country?.name,
            is__Selected: getModelCountryFilter == country?.id,
          });
        });

        setCustomCountries(arr);
        // setIsInitialized(true);
      }
    }
  }, [countries_data, countries_status, router, getModelStyleFilter]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    let arr = [...customCountries];
    let res: string = "";
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].id !== id || (arr[i].id === id && !event.target.checked)) {
        arr[i].is__Selected = false;
      } else if (arr[i].id === id && event.target.checked) {
        arr[i].is__Selected = true;
        res = arr[i].id;
      }
    }
    dispatch(setCountryFilter(res));
    dispatch(
      getAllModels({
        country_id: res,
        brand: getModelBrandFilter,
        categories: getModelCategoryFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        name: keyword || getModelNameFilter,
        top: getModelTopFilter,
        page: getModelPageFilter,
        orderBy: getModelOrderBy,
        order: getModelOrder,
      })
    );

    setCustomCountries(arr);
  };

  if (countries_status === "succeeded") {
    return (
      <Box>
        <SimpleTypography text="Страна" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {customCountries?.map((item: any, index: number) => (
            <FormControlLabel
              key={item.id}
              label={item?.name}
              control={
                <Radio
                  onClick={(event: any) => {
                    handleChange(event, item?.id);
                  }}
                  checked={item?.is__Selected}
                  // indeterminate={false}
                />
              }
            />
          ))}
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <SimpleTypography text="Страна" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {SkletonData.map((item, index): any => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={"100%"}
              height={24}
              style={{ margin: "5px 0" }}
            />
            // <SkeletonElement key={index} type="text" />
          ))}
        </Box>
      </Box>
    );
  }
}
