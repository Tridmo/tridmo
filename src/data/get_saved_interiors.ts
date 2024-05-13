import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getSavedInteriors = createAsyncThunk('/saved_interiors',
  async (wrapper?: {
    Authorization?: string;
    [x: string]: any;
  }) => {
    let send__route = `/saved/interiors`

    wrapper?.style_id?.forEach(style_id => {
      send__route += !send__route.includes("/?") ? `/?styles=${style_id}` : `&styles=${style_id}`;
    });
    send__route += !send__route.includes("/?") && wrapper?.page ? `/?page=${wrapper.page}` : wrapper?.page ? `&page=${wrapper.page}` : "";
    send__route += !send__route.includes("/?") && wrapper?.limit ? `/?limit=${wrapper.limit}` : wrapper?.limit ? `&page=${wrapper.page}` : "";

    const response = await api.get(send__route, {
      headers: wrapper?.Authorization ? {
        'Authorization': wrapper?.Authorization,
        'Accept-Language': 'ru'
      } : {
        'Accept-Language': 'ru'
      },
    })
    return response.data
  })

const get_saved_interiors = createSlice({
  name: 'get_saved_interiors',
  initialState,
  reducers: {
    resetMyInteriors() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSavedInteriors.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getSavedInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getSavedInteriors.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetMyInteriors } = get_saved_interiors.actions;
export const reducer = get_saved_interiors.reducer;
export const selectSavedInteriors = (state: any) => state?.get_saved_interiors?.data[0]
export default get_saved_interiors;