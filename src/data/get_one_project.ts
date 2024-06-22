import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import Cookies from 'js-cookie';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getOneProject = createAsyncThunk('/projects/:id', async (id: any) => {
  const response = await api.get(`projects/${id}`)
  return response.data
})

const get_one_project = createSlice({
  name: 'get_one_project',
  initialState,
  reducers: {
    resetOneInterior() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOneProject.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getOneProject.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getOneProject.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { resetOneInterior } = get_one_project.actions;
export const reducer = get_one_project.reducer;
export const selectOneProject = (state: any) => state?.get_one_project?.data[0]?.data?.project
export default get_one_project;