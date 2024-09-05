import { Box, FormControlLabel, Checkbox, Radio } from '@mui/material'
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../typography'
import { getAllModels } from '../../../data/get_all_models';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getAllBrands, selectAllBrands, selectAllBrands_status } from '../../../data/get_all_brands';
import { setModelBrandFilter } from '../../../data/handle_filters';

const SkletonData = ['', '', '', '', '', '']
interface Props {
  id: string,
  name: string,
  is__Selected: boolean,
}
export default function BrandsFilter() {
  const pathname = usePathname();
  const dispatch = useDispatch<any>();
  const brands_data = useSelector(selectAllBrands);
  const brands_status = useSelector(selectAllBrands_status)
  const [custom__styles, setCustom__styles] = useState<Props[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get('name') as string

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelBrandFilter = useSelector((state: any) => state?.handle_filters?.model_brand)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)
  const getModelTopFilter = useSelector((state: any) => state?.handle_filters?.model_top)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.model_name)
  const getModelOrderBy = useSelector((state: any) => state?.handle_filters?.model_orderby)
  const getModelOrder = useSelector((state: any) => state?.handle_filters?.model_order)

  useEffect(() => {
    if (brands_status == 'idle') {
      dispatch(getAllBrands())
    }
  }, [brands_data, brands_status, dispatch])

  useEffect(() => {
    if (brands_status === "succeeded") {
      if (router) {
        let arr = new Array();
        arr.push({
          id: '',
          name: 'Все',
          is__Selected: true,
        })
        brands_data?.data?.brands?.forEach((brand: Props) => {
          arr.push({
            id: brand?.id,
            name: brand?.name,
            is__Selected: getModelBrandFilter == brand?.id,
          })
        })

        setCustom__styles(arr);
        // setIsInitialized(true);
      }
    }
  }, [brands_data, brands_status, router, getModelStyleFilter]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    let arr = [...custom__styles];
    let res: string = '';
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].id !== id || (arr[i].id === id && !event.target.checked)) {
        arr[i].is__Selected = false;
      }
      else if (arr[i].id === id && event.target.checked) {
        arr[i].is__Selected = true;
        res = arr[i].id
      }
    }
    dispatch(setModelBrandFilter(res))
    dispatch(getAllModels({
      brand: res,
      categories: getModelCategoryFilter,
      colors: getModelColorFilter,
      styles: getModelStyleFilter,
      name: keyword || getModelNameFilter,
      top: getModelTopFilter,
      page: getModelPageFilter,
      orderBy: getModelOrderBy,
      order: getModelOrder,
    }))

    setCustom__styles(arr);
  };

  if (brands_status === "succeeded") {
    return (
      <Box>
        <SimpleTypography text="Бренд" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {
            custom__styles?.map((item: any, index: number) => (
              <FormControlLabel
                key={item.id}
                label={item?.name}
                control={
                  <Radio
                    onClick={(event: any) => { handleChange(event, item?.id) }}
                    checked={item?.is__Selected}
                  // indeterminate={false}
                  />
                }
              />
            ))
          }

        </Box>
      </Box>
    )
  }
  else {
    return (
      <Box>
        <SimpleTypography text="Бренд" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {
            SkletonData.map((item, index): any => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={'100%'}
                height={24}
                style={{ margin: "5px 0" }}
              />
              // <SkeletonElement key={index} type="text" />
            ))
          }
        </Box>
      </Box>
    )
  }


}
