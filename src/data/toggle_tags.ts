import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  show_tags: false,
  adding_tags: false,
  status: 'idle',
  error: null,
}

const toggle_tags = createSlice({
  name: "toggle_tags",
  initialState,
  reducers: {
    toggleShowTags(state: any, action: PayloadAction<boolean>) {
      state.show_tags = null;
      state.show_tags = action.payload;
    },
    toggleAddingTags(state: any, action: PayloadAction<boolean>) {
      state.adding_tags = null;
      state.adding_tags = action.payload;
    },
  }
});

export const { toggleShowTags, toggleAddingTags } = toggle_tags.actions;
export const selectToggleShowTags = (state: any) => state?.toggle_tags?.show_tags;
export const selectToggleAddingTags = (state: any) => state?.toggle_tags?.adding_tags;
export const reducer = toggle_tags.reducer;
export default toggle_tags;