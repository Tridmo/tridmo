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
export const getAllInteriors = createAsyncThunk('/interiors',
  async (wrapper?: any) => {
    let send__route = `/interiors`

    for (let i = 0; i < wrapper?.style_id?.length; i++) {
      if (!send__route?.includes("/?")) {
        send__route += `/?styles=${wrapper?.style_id[i]}`
      } else {
        send__route += `&styles=${wrapper?.style_id[i]}`
      }
    }
    if (!send__route?.includes("/?") && wrapper?.page) {
      send__route += `/?page=${wrapper?.page}`
    } else if (wrapper?.page) {
      send__route += `&page=${wrapper?.page}`
    }
    const response = await api.get(send__route)
    return response.data
  })

const get_all_interiors = createSlice({
  name: 'get_all_interiors',
  initialState,
  reducers: {
    resetAllInteriors() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllInteriors.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getAllInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getAllInteriors.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetAllInteriors } = get_all_interiors.actions;
export const reducer = get_all_interiors.reducer;
export const selectAllInteriors = (state: any) => state?.get_all_interiors?.data
export default get_all_interiors;