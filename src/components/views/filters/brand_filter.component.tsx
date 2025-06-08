import { Box, FormControlLabel, Radio } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterBrands,
  selectFilterBrands,
  selectFilterBrands_status,
} from "../../../data/get_all_brands";
import { getAllModels } from "../../../data/get_all_models";
import { setModelBrandFilter } from "../../../data/handle_filters";
import SimpleTypography from "../../typography";

const SkletonData = ["", "", "", "", "", ""];
interface Props {
  id: string;
  name: string;
  is__Selected: boolean;
}
export default function BrandsFilter() {
  const pathname = usePathname();
  const dispatch = useDispatch<any>();
  const brands_data = useSelector(selectFilterBrands);
  const brands_status = useSelector(selectFilterBrands_status);
  const [customBrands, setCustomBrands] = useState<Props[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get("name") as string;

  const getModelCategoryFilter = useSelector(
    (state: any) => state?.handle_filters?.categories
  );
  const getModelCountryFilter = useSelector(
    (state: any) => state?.handle_filters?.country
  );
  const getModelBrandFilter = useSelector(
    (state: any) => state?.handle_filters?.model_brand
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
    if (brands_status == "idle") {
      dispatch(getFilterBrands({ country_id: getModelCountryFilter }));
    }
  }, [brands_data, brands_status, dispatch]);

  useEffect(() => {
    dispatch(getFilterBrands({ country_id: getModelCountryFilter }));
  }, [getModelCountryFilter]);

  useEffect(() => {
    if (brands_status === "succeeded") {
      if (router) {
        let arr = new Array();
        arr.push({
          id: "",
          name: "Все",
          is__Selected: true,
        });
        brands_data?.forEach((brand: Props) => {
          arr.push({
            id: brand?.id,
            name: brand?.name,
            is__Selected: getModelBrandFilter == brand?.id,
          });
        });
        setCustomBrands(arr);
        // setIsInitialized(true);
      }
    }
  }, [brands_data, brands_status, router, getModelBrandFilter]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    let arr = [...customBrands];
    let res: string = "";
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].id !== id || (arr[i].id === id && !event.target.checked)) {
        arr[i].is__Selected = false;
      } else if (arr[i].id === id && event.target.checked) {
        arr[i].is__Selected = true;
        res = arr[i].id;
      }
    }
    dispatch(setModelBrandFilter(res));
    dispatch(
      getAllModels({
        brand: res,
        categories: getModelCategoryFilter,
        country_id: getModelCountryFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        name: keyword || getModelNameFilter,
        top: getModelTopFilter,
        page: getModelPageFilter,
        orderBy: getModelOrderBy,
        order: getModelOrder,
      })
    );

    setCustomBrands(arr);
  };

  if (brands_status === "succeeded") {
    return (
      <Box>
        <SimpleTypography text="Бренд" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {customBrands?.map((item: any, index: number) => (
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
        <SimpleTypography text="Бренд" className="section__title" />
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
