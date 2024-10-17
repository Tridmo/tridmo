import SimpleTypography from "@/components/typography";
import { Box, Grid } from "@mui/material";
import styles from '@/styles/search_bar.module.scss'
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setModelNameFilter } from "@/data/handle_filters";
import { getAllModels } from "@/data/get_all_models";
import { getAllInteriors } from "@/data/get_all_interiors";
import { interiorsLimit, modelsLimit } from "@/types/filters";

type searchSource = 'models' | 'interiors' | 'brands' | 'designers'

export interface SearchOption {
    title: string;
    value: searchSource;
}

interface Props {
    options: SearchOption[];
    searchValue: string;
}


export function SearchOptionTabs({options, searchValue}: Props) {
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
      const getInteriorPageFilter = useSelector((state: any) => state?.handle_filters?.interiors_page);

    function searchFrom(source: searchSource, keyword: string) {
        dispatch(setModelNameFilter(keyword));
        const newUrl = `/${source}/?page=1&name=${keyword}`;
        router.push(newUrl);
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
            limit: interiorsLimit,
          })
          : () => {}
        );
    }

    return (
        <Grid container gap={1} className={styles.search_options_wrapper}>
            {
                options.map(option => (
                    <Grid item className={styles.search_option_item}
                        onClick={() => searchFrom(option.value, searchValue)}
                    >
                        <SimpleTypography text={option.title} />  
                    </Grid>
                ))
            }
        </Grid>
    )
}