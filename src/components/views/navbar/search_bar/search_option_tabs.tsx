import SimpleTypography from "@/components/typography";
import { Box, Grid } from "@mui/material";
import styles from '@/styles/search_bar.module.scss'
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { set_designers_name, set_interiors_name, setModelNameFilter } from "@/data/handle_filters";
import { getAllModels } from "@/data/get_all_models";
import { getAllInteriors } from "@/data/get_all_interiors";
import { brandsLimit, designersLimit, interiorsLimit, modelsLimit } from "@/types/filters";
import { getAllDesigners } from "@/data/get_all_designers";
import { getAllBrands } from "@/data/get_all_brands";

type searchSource = 'models' | 'interiors' | 'brands' | 'designers'

export interface SearchOption {
  title: string;
  value: searchSource;
}

interface Props {
  options: SearchOption[];
  searchValue: string;
}


export function SearchOptionTabs({ options, searchValue }: Props) {
  const router = useRouter()
  const dispatch = useDispatch<any>()

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories);
  const getModelBrandFilter = useSelector((state: any) => state?.handle_filters?.model_brand);
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors);
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles);
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page);
  const getModelTopFilter = useSelector((state: any) => state?.handle_filters?.model_top);
  const getModelOrderBy = useSelector((state: any) => state?.handle_filters?.model_orderby);
  const getModelOrder = useSelector((state: any) => state?.handle_filters?.model_order);

  const getInteriorCategoryFilter = useSelector((state: any) => state?.handle_filters?.interior_categories);
  const getInteriorNameFilter = useSelector((state: any) => state?.handle_filters?.interiors_name);
  const getInteriorPageFilter = useSelector((state: any) => state?.handle_filters?.interiors_page);

  function searchFrom(source: searchSource, keyword: string) {
    console.log();

    dispatch(
      source == 'models' ?
        setModelNameFilter(keyword)
        : source == 'interiors' ?
          set_interiors_name(keyword)
          : source == 'designers' ?
            set_designers_name(keyword)
            : () => { }
    );

    dispatch(
      source == 'models' ?
        getAllModels({
          brand: getModelBrandFilter,
          categories: getModelCategoryFilter,
          colors: getModelColorFilter,
          styles: getModelStyleFilter,
          name: searchValue,
          top: getModelTopFilter,
          page: 1,
          orderBy: getModelOrderBy,
          order: getModelOrder,
          limit: modelsLimit
        })
        : source == 'interiors' ?
          getAllInteriors({
            categories: getInteriorCategoryFilter,
            page: 1,
            name: searchValue,
            limit: interiorsLimit,
          })
          : source == 'designers' ?
            getAllDesigners({
              name: searchValue,
              limit: designersLimit,
              page: 1
            })
            : source == 'brands' ?
              getAllBrands({
                name: searchValue,
                page: 1,
                orderBy: 'models_count',
                limit: brandsLimit,
              })
              : () => { }
    );

    const newUrl = `/${source}/?page=1&name=${keyword}`;
    router.push(newUrl);
  }

  return (
    <Grid container gap={1} className={styles.search_options_wrapper}>
      {
        options.map((option, index) => (
          <Grid key={index} item xs={true} className={styles.search_option_item}
            onClick={() => searchFrom(option.value, searchValue)}
          >
            <SimpleTypography text={option.title} sx={{ textAlign: 'center' }} />
          </Grid>
        ))
      }
    </Grid>
  )
}