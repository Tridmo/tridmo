import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api, { chatApi } from '../utils/axios'
import Cookies from 'js-cookie';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getChatConversations = createAsyncThunk('/conversations',
  async (
    wrapper?:
      {
        token?: string;
        [x: string]: any;
      }
  ) => {
    const response = await chatApi.get(`/conversations`, {
      headers:
        !!wrapper?.token ? { 'Authorization': `Bearer ${wrapper?.token}` } :
          Cookies.get('chatToken') ? { 'Authorization': `Bearer ${Cookies.get('chatToken')}` }
            : {}
    })
    return response.data
  })

const get_chat_conversations = createSlice({
  name: 'get_chat_conversations',
  initialState,
  reducers: {
    setChatConversations(state: any, action: PayloadAction<any>) {
      state.data[0].data.conversations = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getChatConversations.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getChatConversations.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getChatConversations.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { setChatConversations } = get_chat_conversations.actions;
export const reducer = get_chat_conversations.reducer;
export const selectAllChatConversations = (state: any) => state?.get_chat_conversations?.data[0]?.data?.conversations
export default get_chat_conversations;