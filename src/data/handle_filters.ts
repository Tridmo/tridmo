import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  categories: [],
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
  page: 1,
  error: null,
  progress: 0,
};

const handle_filters = createSlice({
  name: 'handle_filters',
  initialState,
  reducers: {
    setCategoryFilter(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.categories = params.knex;
    },
    setCategoryId(state: any, action: any) {
      const { ...id } = action.payload;
      state.selected__category = id
    },
    setChildrenCategory(state: any, action: any) {
      const { ...params } = action.payload;
      state.children_category = params.children;
    },
    setChildrenCategoriesForFilters(state: any, action: any) {
      const { ...params } = action.payload;
      state.filter_categories.push(params.all_data);
    },
    removeChildrenCategoryForFilters(state: any, action: any) {
      const { ...params } = action.payload;
      state.filter_categories = params.filtered;
    },
    refreshModel(state: any, action: any) {
      console.log(action, state.refreshModelOrder, "triggered")
      state.refreshModelOrder = action.payload;
    },
    setCategoryNameFilter(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.category_name = params.knnex;
    },
    setCategorySelectedChild(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.selected_child.push(params.selected);
    },
    removeCategorySelectedChild(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.selected_child = params.selected;
    },
    setColorFilter(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.colors = params.cnex;
    },
    setSelectedColors(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.selected_colors.push(params.selected);
    },
    removeSelectedColors(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.selected_colors = params.selected;
    },
    setSelectedColorsId(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.selected_colors__id.push(params.id)
    },
    removeSelectedColorsId(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.selected_colors__id = params.id
    },
    setStyleFilter(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.styles = params.snex;
    },
    setSelectedStyles(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.selected_styles.push(params.styles)
    },
    setSelectedStylesId(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.selected_styles_id.push(params.id);
    },
    removeSelectedStyles(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.selected_styles = params.styles;
    },
    removeSelectedStylesId(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.selected_styles_id = params.id
    },
    setPageFilter(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.page = params.page;
    },
    setIs_free(state?: any, action?: any) {
      const { ...params } = action.payload;
      state.is_free = params.is_free;
    },
    resetFilters() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
  }

});

export const {
  setCategoryFilter,
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
  resetFilters,
  setIs_free
} = handle_filters.actions;
export const reducer = handle_filters.reducer;
export default handle_filters;