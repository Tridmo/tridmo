import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { savedModelsLimit } from '../types/filters';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getSavedModels = createAsyncThunk('/saved_models',
  async (wrapper?: {
    Authorization?: string;
    [x: string]: any;
  }) => {
    let send__route = `/saved/models`

    wrapper?.style_id?.forEach(style_id => {
      send__route += !send__route.includes("/?") ? `/?styles=${style_id}` : `&styles=${style_id}`;
    });
    send__route += !send__route.includes("/?") && wrapper?.page ? `/?page=${wrapper.page}` : wrapper?.page ? `&page=${wrapper.page}` : "";
    send__route +=
      wrapper?.limit
        ? (send__route?.includes("/?") ? `&limit=${wrapper?.limit}` : `/?limit=${wrapper?.limit}`)
        : (send__route?.includes("/?") ? `&limit=${savedModelsLimit}` : `/?limit=${savedModelsLimit}`);

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

const get_saved_models = createSlice({
  name: 'get_saved_models',
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
      .addCase(getSavedModels.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getSavedModels.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getSavedModels.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetMyInteriors } = get_saved_models.actions;
export const reducer = get_saved_models.reducer;
export const selectSavedModels = (state: any) => state?.get_saved_models?.data[0]
export default get_saved_models;