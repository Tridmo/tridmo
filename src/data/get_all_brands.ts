import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { brandOrderBy, brandsForLandingPageLimit, brandsLimit, order } from '../types/filters';
import api from '../utils/axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
  landing_page_brands_data: [],
  landing_page_brands_status: 'idle',
  landing_page_brands_error: null,
  landing_page_brands_progress: 0,
  filter_brands_data: [],
  filter_brands_status: 'idle',
  filter_brands_error: null,
  filter_brands_progress: 0,
};
export const getAllBrands = createAsyncThunk('/brands',
  async (wrapper?: {
    name?: string;
    limit?: number;
    orderBy?: brandOrderBy;
    order?: order;
    page?: number;
  }) => {
    let send__route = `/brands`

    if (wrapper?.name) {
      send__route += `/?name=${wrapper?.name}`
    }

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : (send__route?.includes("/?") ? `&limit=${brandsLimit}` : `/?limit=${brandsLimit}`);

    send__route +=
      wrapper?.orderBy
        ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
        : "";

    send__route += !send__route.includes("/?") && wrapper?.page ? `/?page=${wrapper.page}` : wrapper?.page ? `&page=${wrapper.page}` : "";

    const response = await api.get(send__route)
    return response.data
  })

export const getBrandsForLandingPage = createAsyncThunk('/brands/landing-page',
  async (wrapper?: {
    limit?: number;
    orderBy?: brandOrderBy;
    order?: order;
  }) => {
    let send__route = `/brands`

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : (send__route?.includes("/?") ? `&limit=${brandsForLandingPageLimit}` : `/?limit=${brandsForLandingPageLimit}`);

    send__route +=
      wrapper?.orderBy
        ? (send__route?.includes("/?") ? `&orderBy=${wrapper?.orderBy}` : `/?orderBy=${wrapper?.orderBy}`)
        : "";

    const response = await api.get(send__route)
    return response.data
  })

  export const getFilterBrands = createAsyncThunk('/brands/filter',
    async (wrapper?: {
      country_id?: string;
      limit?: number;
    }) => {
      let send__route = `/brands`
  
      if (wrapper?.country_id) {
        send__route += `/?country_id=${wrapper?.country_id}`
      }
      
      const response = await api.get(send__route)
      return response.data
    })
  

const get_all_brands = createSlice({
  name: 'get_all_brands',
  initialState,
  reducers: {
    resetAllBrands() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllBrands.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllBrands.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllBrands.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })

    builder
      .addCase(getBrandsForLandingPage.pending, (state?: any, action?: any) => {
        state.landing_page_brands_status = 'loading'
      })
      .addCase(getBrandsForLandingPage.fulfilled, (state?: any, action?: any) => {
        state.landing_page_brands_progress = 20
        state.landing_page_brands_status = 'succeeded'
        state.landing_page_brands_data = [];
        state.landing_page_brands_data = state.landing_page_brands_data.concat(action.payload)
        state.landing_page_brands_progress = 100
      })
      .addCase(getBrandsForLandingPage.rejected, (state?: any, action?: any) => {
        state.landing_page_brands_status = 'failed'
        state.landing_page_brands_error = action.error.message
      })

    builder
      .addCase(getFilterBrands.pending, (state?: any, action?: any) => {
        state.filter_brands_status = 'loading'
      })
      .addCase(getFilterBrands.fulfilled, (state?: any, action?: any) => {
        state.filter_brands_progress = 20
        state.filter_brands_status = 'succeeded'
        state.filter_brands_data = [];
        state.filter_brands_data = state.filter_brands_data.concat(action.payload)
        state.filter_brands_progress = 100
      })
      .addCase(getFilterBrands.rejected, (state?: any, action?: any) => {
        state.filter_brands_status = 'failed'
        state.filter_brands_error = action.error.message
      })
  }
});

export const { resetAllBrands } = get_all_brands.actions;
export const reducer = get_all_brands.reducer;
export const selectAllBrands = (state: any) => state?.get_all_brands?.data[0]
export const selectAllBrands_status = (state: any) => state?.get_all_brands?.status
export const selectBrandsForLandingPage = (state: any) => state?.get_all_brands?.landing_page_brands_data[0]?.data?.brands
export const selectBrandsForLandingPage_status = (state: any) => state?.get_all_brands?.landing_page_brands_status
export const selectFilterBrands = (state: any) => state?.get_all_brands?.filter_brands_data[0]?.data?.brands
export const selectFilterBrands_status = (state: any) => state?.get_all_brands?.filter_brands_status
export default get_all_brands;