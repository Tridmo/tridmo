import { brandOrderBy, interiorOrderBy, modelOrderBy, order } from '@/types/filters';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState = {
  author: '',
  model_brand: '',
  model_name: '',
  model_top: undefined,
  model_orderby: '',
  model_order: 'desc',
  brand_styles: [],
  brand_name: '',
  brand_orderby: '',
  brand_order: 'desc',
  brand_country: '',
  country: '',
  categories: [],
  interior_categories: [],
  interiors_name: '',
  interiors_order: 'desc',
  interiors_orderby: 'created_at',
  selected_child: [],
  children_category: [],
  filter_categories: [],
  category_name: [],
  colors: [],
  selected_colors: [],
  selected_colors__id: [],
  selected__category: null,
  is_free: false,
  refreshModelOrder: false,
  styles: [],
  selected_styles: [],
  selected_styles_id: [],
  brand_models_category: '',
  models_page: 1,
  interiors_page: 1,
  my_interiors_page: 1,
  designer_interiors_page: 1,
  projects_page: 1,
  saved_models_page: 1,
  brand_models_page: 1,
  designers_name: '',
  designers_order: 'desc',
  designers_orderby: 'rating',
  designers_page: 1,
  brands_page: 1,
  error: null,
  progress: 0,
};

const handle_filters = createSlice({
  name: 'handle_filters',
  initialState,
  reducers: {
    setAuthor: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.author = params.author;
    },
    setCountryFilter: (state: any, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setBrandCountryFilter: (state: any, action: PayloadAction<string>) => {
      state.brand_country = action.payload;
    },
    setCategoryFilter: (state: any, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    setModelBrandFilter: (state: any, action: PayloadAction<string>) => {
      state.model_brand = action.payload;
    },
    setModelTopFilter: (state: any, action: PayloadAction<boolean | undefined>) => {
      state.model_top = action.payload;
    },
    setModelNameFilter: (state: any, action: PayloadAction<string | null>) => {
      state.model_name = action.payload;
    },
    setModelOrderBy: (state: any, action: PayloadAction<modelOrderBy>) => {
      state.model_orderby = action.payload;
    },
    setModelOrder: (state: any, action: PayloadAction<order>) => {
      state.model_order = action.payload;
    },
    setBrandNameFilter: (state: any, action: PayloadAction<string>) => {
      state.brand_name = action.payload;
    },
    setBrandOrderBy: (state: any, action: PayloadAction<brandOrderBy>) => {
      state.brand_orderby = action.payload;
    },
    setBrandOrder: (state: any, action: PayloadAction<order>) => {
      state.brand_order = action.payload;
    },
    setInteriorCategoryFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.interior_categories = params.knex;
    },
    setCategoryId: (state: any, action: PayloadAction<any>) => {
      const { ...id } = action.payload;
      state.selected__category = id
    },
    setChildrenCategory: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.children_category = params.children;
    },
    setChildrenCategoriesForFilters: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.filter_categories.push(params.all_data);
    },
    removeChildrenCategoryForFilters: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.filter_categories = params.filtered;
    },
    refreshModel: (state: any, action: PayloadAction<any>) => {
      state.refreshModelOrder = action.payload;
    },
    setCategoryNameFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.category_name = params.knnex;
    },
    setCategorySelectedChild: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_child.push(params.selected);
    },
    removeCategorySelectedChild: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_child = params.selected;
    },
    setColorFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.colors = params.cnex;
    },
    setSelectedColors: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_colors.push(params.selected);
    },
    removeSelectedColors: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_colors = params.selected;
    },
    setSelectedColorsId: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_colors__id.push(params.id)
    },
    removeSelectedColorsId: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_colors__id = params.id
    },
    setStyleFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.styles = params.snex;
    },
    setSelectedStyles: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_styles.push(params.styles)
    },
    setSelectedStylesId: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_styles_id.push(params.id);
    },
    setBrandModelsCategory: (state: any, action: PayloadAction<any>) => {
      state.brand_models_category = action.payload;
    },
    removeSelectedStyles: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_styles = params.styles;
    },
    removeSelectedStylesId: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.selected_styles_id = params.id
    },
    setPageFilter: (
      state: any,
      action: PayloadAction<{
        p:
        'models_page' |
        'interiors_page' |
        'my_interiors_page' |
        'designer_interiors_page' |
        'projects_page' |
        'saved_models_page' |
        'brand_models_page' |
        'designers_page' |
        'brands_page';
        n: number;
      }>
    ) => {
      const { ...params } = action.payload;
      state[params.p] = params.n;
    },
    setLimitFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.limit = params.limit;
    },
    setOrderByFilter: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.orderBy = params.by;
    },
    setIs_free: (state: any, action: PayloadAction<any>) => {
      const { ...params } = action.payload;
      state.is_free = params.is_free;
    },

    set_interior_categories: (state: any, action: PayloadAction<any>) => {
      state.interior_categories = action.payload;
    },
    set_interiors_name: (state: any, action: PayloadAction<any>) => {
      state.interiors_name = action.payload;
    },
    set_interiors_order: (state: any, action: PayloadAction<order>) => {
      state.interiors_order = action.payload;
    },
    set_interiors_orderby: (state: any, action: PayloadAction<interiorOrderBy>) => {
      state.interiors_orderby = action.payload;
    },

    set_designers_name: (state: any, action: PayloadAction<any>) => {
      state.designers_name = action.payload;
    },
    set_designers_order: (state: any, action: PayloadAction<order>) => {
      state.designers_order = action.payload;
    },
    set_designers_orderby: (state: any, action: PayloadAction<any>) => {
      state.designers_orderby = action.payload;
    },
    resetFilters: () => ({
      ...initialState
    }),
  },
  extraReducers: (builder) => {
  }

});

export const {
  setBrandModelsCategory,
  setAuthor,
  setCountryFilter,
  setBrandCountryFilter,
  setCategoryFilter,
  setModelBrandFilter,
  setModelTopFilter,
  setModelNameFilter,
  setModelOrderBy,
  setModelOrder,
  setBrandNameFilter,
  setBrandOrderBy,
  setBrandOrder,
  setInteriorCategoryFilter,
  setCategorySelectedChild,
  setCategoryId,
  setChildrenCategory,
  refreshModel,
  removeCategorySelectedChild,
  removeChildrenCategoryForFilters,
  setChildrenCategoriesForFilters,
  setSelectedColorsId,
  removeSelectedColorsId,
  setCategoryNameFilter,
  setColorFilter,
  setSelectedColors,
  removeSelectedColors,
  setStyleFilter,
  setSelectedStyles,
  setSelectedStylesId,
  removeSelectedStyles,
  removeSelectedStylesId,
  setPageFilter,
  setLimitFilter,
  setOrderByFilter,
  resetFilters,
  setIs_free,
  set_interior_categories,
  set_interiors_name,
  set_interiors_order,
  set_interiors_orderby,
  set_designers_name,
  set_designers_order,
  set_designers_orderby,
} = handle_filters.actions;
export const reducer = handle_filters.reducer;
export default handle_filters;