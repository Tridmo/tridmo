import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getInteriorTags = createAsyncThunk('/tags/interior',
  async (interior_id: string) => {
    let send__route = `/tags/${interior_id}`
    const response = await api.get(send__route)
    return response.data
  })

const get_interior_tags = createSlice({
  name: 'get_interior_tags',
  initialState,
  reducers: {
    setInteriorTags(state: any, action: PayloadAction<any[]>) {
      state.data = [];
      state.data = state.data.concat([{ data: { tags: action.payload } }])
    },
    resetInteriorTags() {
      return {
        ...initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getInteriorTags.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getInteriorTags.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getInteriorTags.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { setInteriorTags, resetInteriorTags } = get_interior_tags.actions;
export const reducer = get_interior_tags.reducer;
export const selectInteriorTags = (state: any) => state?.get_interior_tags?.data[0]?.data?.tags
export const selectInteriorTags_status = (state: any) => state?.get_interior_tags?.status
export default get_interior_tags;