import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  messages: [],
  selectedChat: null,
  chatLoading: "", //'idle' | 'pending' | 'succeeded' | 'failed',
  messageLoading: "", //'idle' | 'pending' | 'succeeded' | 'failed',
  chatError: "",
  messageError: "",
};

const fetchChats = createAsyncThunk(
  "chat/fetch",
  async function (_, { rejectWithValue }) {
    try {
      const res = await fetch("http://localhost:4000/api/v1/chat/", {
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        return rejectWithValue(data.message);
      }
      const data = await res.json();
      return data.data.chats;
    } catch (error) {
      console.log("fetchChats - chatSlice ", error);
      return rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, function (state, action) {
        state.chatLoading = "succeeded";
        state.chats = action.payload;
      })
      .addCase(fetchChats.pending, function (state) {
        state.chatLoading = "pending";
      })
      .addCase(fetchChats.rejected, function (state, action) {
        state.chatError = action.payload;
        state.chatLoading = "failed";
      });
  },
});

const selectChat = (state) => state.chat;
const selectChats = createSelector([selectChat], (chat) => chat.chats);
const selectChatLoading = createSelector(
  [selectChat],
  (chat) => chat.chatLoading
);
const selectSelectedChat = createSelector(
  [selectChat],
  (chat) => chat.selectedChat
);

export { fetchChats, selectChats, selectChatLoading, selectSelectedChat };
export default chatSlice.reducer;
