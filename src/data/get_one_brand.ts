import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import Cookies from 'js-cookie'
const initialState = {
   data: [],
   status: 'idle',
   error: null,
   progress: 0,
};
export const get_one_brand = createAsyncThunk(`/brands/:id`, async (id: any) => {
   const response = await api.get(`/brands/${id}`)
   return response.data
   //    , {
   //    headers: {
   //       Authorization: `Bearer ${Cookies.get('accessToken')}`,
   //    },
   // }
})

const userBrands = createSlice({
   name: 'userBrands',
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder
         .addCase(get_one_brand.pending, (state?: any, action?: any) => {
            state.status = 'loading'
         })
         .addCase(get_one_brand.fulfilled, (state?: any, action?: any) => {
            state.progress = 20
            state.status = 'succeeded'
            // Add any fetched posts to the array;
            state.data = [];
            state.data = state.data.concat(action.payload)
            state.progress = 100
         })
         .addCase(get_one_brand.rejected, (state?: any, action?: any) => {
            state.status = 'failed'
            state.error = action.error.message
         })
   }
});


export const reducer = userBrands.reducer;
export const selectOneBrand = (state: any) => state?.get_one_brand?.data[0]?.data
export default userBrands