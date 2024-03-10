import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import Cookies from 'js-cookie'

// import { Cookies } from 'react-cookie';
const initialState = {
    data: [],
    status: 'idle',
    error: null,
    progress: 0,
    key:""
};
export const searchModels = createAsyncThunk('products?keyword=3d', async(wrapper:any)=>{
  
  let send__route = `products/?keyword=${wrapper.keyword}`

  for (let i = 0; i < wrapper?.color_id?.length; i++) {
    if (!send__route?.includes("/?")) {
      send__route += `/?colors=${wrapper?.color_id[i]}`
    } else {
      send__route += `&colors=${wrapper?.color_id[i]}`
    }
  }

  for (let i = 0; i < wrapper?.style_id?.length; i++) {
    if (!send__route?.includes("/?")) {
      send__route += `/?styles=${wrapper?.style_id[i]}`
    } else {
      send__route += `&styles=${wrapper?.style_id[i]}`
    }
 
  }

  if (!send__route?.includes("/?") && wrapper?.is_free) {
    send__route += `/?is_free=${wrapper?.is_free}`
  } else if (wrapper?.is_free) {
    send__route += `&is_free=${wrapper?.is_free}`
  }

  for (let i = 0; i < wrapper?.category_id?.length; i++) {
    if (!send__route?.includes("/?")) {
      send__route += `/?categories=${wrapper?.category_id[i]}`
    } else {
      send__route += `&categories=${wrapper?.category_id[i]}`
    }
  }

  
  if(wrapper.keyword !== undefined && wrapper.keyword !== ""){
    const response = await api.get(send__route)
    return response.data 
  }
  

}) 

const search_models = createSlice({
    name: 'search_models',
    initialState,
    reducers: {
      setSearchVal(state?: any, action?: any) {
        const { ...params } = action.payload;
        state.key = action.payload;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(searchModels.pending, (state?: any, action?: any) => {
          state.status = 'loading'
        })
        .addCase(searchModels.fulfilled, (state?: any, action?: any) => {
          state.progress = 20
          state.status = 'succeeded'
          // Add any fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
          state.progress = 100
        })
        .addCase(searchModels.rejected, (state?: any, action?: any) => {
          state.status = 'failed'
          state.error = action.error.message
        })
      }
});

export const { setSearchVal } = search_models.actions;
export const reducer = search_models.reducer;
export const selectSearchedModels = (state: any) => state?.search_models?.data
export default search_models;