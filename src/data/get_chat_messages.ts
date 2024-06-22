import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api, { chatApi } from '../utils/axios'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  progress: 0,
};
export const getChatMessages = createAsyncThunk('/messages/conversation',
  async ({ conversation_id }: { conversation_id: string }) => {
    const response = await chatApi.get(`/messages/${conversation_id}`)
    return response.data
  })

const get_chat_messages = createSlice({
  name: 'get_chat_messages',
  initialState,
  reducers: {
    setChatMessages(state: any, action: PayloadAction<any>) {
      state.data[0] = { data: {} }
      state.data[0].data.messages = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getChatMessages.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getChatMessages.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getChatMessages.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export const { setChatMessages } = get_chat_messages.actions;
export const reducer = get_chat_messages.reducer;
export const selectChatMessages = (state: any) => state?.get_chat_messages?.data[0]?.data?.messages
export default get_chat_messages;