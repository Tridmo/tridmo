import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { myInteriorsLimit } from '../types/filters';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getMyInteriors = createAsyncThunk('/myinteriors',
  async (wrapper?: {
    Authorization?: string;
    [x: string]: any;
  }) => {
    let send__route = `/myinteriors`

    wrapper?.style_id?.forEach(style_id => {
      send__route += !send__route.includes("/?") ? `/?styles=${style_id}` : `&styles=${style_id}`;
    });
    send__route += !send__route.includes("/?") && wrapper?.page ? `/?page=${wrapper.page}` : wrapper?.page ? `&page=${wrapper.page}` : "";

    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : (send__route?.includes("/?") ? `&limit=${myInteriorsLimit}` : `/?limit=${myInteriorsLimit}`);


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

const get_my_interiors = createSlice({
  name: 'get_my_interiors',
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
      .addCase(getMyInteriors.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getMyInteriors.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getMyInteriors.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetMyInteriors } = get_my_interiors.actions;
export const reducer = get_my_interiors.reducer;
export const selectMyInteriors = (state: any) => state?.get_my_interiors?.data[0]
export default get_my_interiors;