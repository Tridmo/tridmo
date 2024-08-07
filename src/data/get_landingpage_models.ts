import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import { landingModelsLimit, landingTopModelsLimit, modelOrderBy, modelsLimit, order } from '../types/filters';

const initialState = {
  data: [],
  status: 'idle',
  top_data: [],
  top_status: 'idle',
  error: null,
  top_error: null,
  progress: 0,
};
export const getLandingTopModels = createAsyncThunk('/models/landing/top',
  async () => {
    try {
      let send__route = `/models/?top=true&limit=${landingTopModelsLimit}`

      const response = await api.get(send__route)
      return response.data
    } catch (error) {
      console.log(error);
    }
  })
export const getLandingModels = createAsyncThunk('/models/landing',
  async () => {
    try {
      let send__route = `/models/?top=false&limit=${landingModelsLimit}`

      const response = await api.get(send__route)
      return response.data
    } catch (error) {
      console.log(error);
    }
  })

const get_landingpage_models = createSlice({
  name: 'get_landingpage_models',
  initialState,
  reducers: {
    resetAllModels() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLandingModels.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getLandingModels.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getLandingModels.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })

    builder
      .addCase(getLandingTopModels.pending, (state?: any, action?: any) => {
        state.top_status = 'loading'
      })
      .addCase(getLandingTopModels.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.top_status = 'succeeded'
        // Add any fetched posts to the array;
        state.top_data = [];
        state.top_data = state.top_data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getLandingTopModels.rejected, (state?: any, action?: any) => {
        state.top_status = 'failed'
        state.top_error = action.error.message
      })
  }
});

export const { resetAllModels } = get_landingpage_models.actions;
export const reducer = get_landingpage_models.reducer;
export const selectLandingModels = (state: any) => state?.get_landingpage_models?.data?.[0]?.data?.models
export const selectLandingTopModels = (state: any) => state?.get_landingpage_models?.top_data?.[0]?.data?.models
export const selectLandingModels_status = (state: any) => state?.get_landingpage_models?.status
export const selectLandingTopModels_status = (state: any) => state?.get_landingpage_models?.top_status
export default get_landingpage_models;