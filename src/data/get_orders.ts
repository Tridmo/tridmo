import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import Cookies from 'js-cookie'

const initialState = {
   data: [],
   refreshModelOrder: false,
   status: 'idle',
   error: null,
   progress: 0,
};

export const get_orders = createAsyncThunk(`/cart/current`, async () => {
   const response = await api.get(`/cart/current`
   , {
      headers: {
         Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
   })
   return response.data
})

const OrdersSlice = createSlice({
   name: 'OrdersSlice',
   initialState,
   reducers: {
      reset(state: any, action: any){
         state.status = 'idle'
         state.error = null
         state.progress = 0
      },
      resetAll(){
         return {
            ...initialState
         }
      }
   },
   extraReducers(builder) {
      builder
         .addCase(get_orders.pending, (state?: any, action?: any) => {
            state.status = 'loading'
         })
         .addCase(get_orders.fulfilled, (state?: any, action?: any) => {
            state.progress = 20
            state.status = 'succeeded'
            // Add any fetched posts to the array;
            state.data = [];
            state.data = state.data.concat(action.payload)
            state.progress = 100
         })
         .addCase(get_orders.rejected, (state?: any, action?: any) => {
            state.status = 'failed'
            state.error = action.error.message
         })
   }
});

export const { reset, resetAll } = OrdersSlice.actions
export const reducer = OrdersSlice.reducer;
export const selectGetOrders = (state: any) => state?.get_orders?.data[0]?.data
export default OrdersSlice