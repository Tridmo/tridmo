import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import Cookies from 'js-cookie'

export interface TokenType {
  status: string,
  error: null
}

const initialState: TokenType = {
  status: 'idle',
  error: null
};
export const getSetVerified = createAsyncThunk('/verify',
  async (
    wrapper?: {
      Authorization?: string;
      [x: string]: any;
    }
  ) => {
    const response = await axios.get('/auth/verify', {
      headers: wrapper?.Authorization ? { 'Authorization': wrapper?.Authorization, } : {}
    })
    return response.data
  })

const setVerified = createSlice({
  name: 'set_verified',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSetVerified.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getSetVerified.fulfilled, (state?: any, action?: any) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
      })
      .addCase(getSetVerified.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = setVerified.reducer;