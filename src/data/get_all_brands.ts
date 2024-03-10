import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import Cookies from 'js-cookie'
// import { Cookies } from 'react-cookie';
const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getAllBrands = createAsyncThunk('/brands',
  async (wrapper?: any) => {
    let send__route = `/brands`

    if (wrapper?.name) {
      send__route += `/?keyword=${wrapper?.name}`
    }

    if (!send__route?.includes("/?") && wrapper?.page) {
      send__route += `/?page=${wrapper?.page}`
    } else if (wrapper?.page) {
      send__route += `&page=${wrapper?.page}`
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
  }
});

export const { resetAllBrands } = get_all_brands.actions;
export const reducer = get_all_brands.reducer;
export const selectAllBrands = (state: any) => state?.get_all_brands?.data
export default get_all_brands;