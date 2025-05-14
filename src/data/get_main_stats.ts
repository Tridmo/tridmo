import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios";

export interface Type {
  data: any,
  status: string,
  error: null
}

const initialState: Type = {
  data: [],
  status: 'idle',
  error: null
};

export const getMainStats = createAsyncThunk('/statistics/main', async () => {
  const response = await axios.get('/statistics/main')
  return response.data
})

const mainStats = createSlice({
  name: 'get_main_stats',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getMainStats.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getMainStats.fulfilled, (state?: any, action?: any) => {
        state.status = 'succeeded'
        state.data = [];
        state.data = state.data.concat(action.payload)
      })
      .addCase(getMainStats.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const selectMainStats = (state: any) => state?.get_main_stats?.data[0]?.data
export const selectMainStats_status = (state: any) => state?.get_main_stats?.status
export const selectMainStats_error = (state: any) => state?.get_main_stats?.error
export const reducer = mainStats.reducer;