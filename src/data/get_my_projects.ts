import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getMyProjects = createAsyncThunk('/myprojects',
  async (wrapper?: {
    Authorization?: string;
    [x: string]: any;
  }) => {
    let send__route = `/projects`
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

const get_my_projects = createSlice({
  name: 'get_my_projects',
  initialState,
  reducers: {
    resetMyProjects() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyProjects.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getMyProjects.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getMyProjects.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const reducer = get_my_projects.reducer;
export const selectMyProjects = (state: any) => state?.get_my_projects?.data[0]
export default get_my_projects;