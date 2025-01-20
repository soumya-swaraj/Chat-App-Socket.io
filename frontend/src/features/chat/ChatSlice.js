import {
  createAsyncThunk,
  createSelector,
  createSlice,
  current,
} from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  selectedChat: null,
  chatLoading: "", //'idle' | 'pending' | 'succeeded' | 'failed',
  messageLoading: "", //'idle' | 'pending' | 'succeeded' | 'failed',
  chatError: "",
  messageError: "",
  socket: null,
};

const fetchChats = createAsyncThunk(
  "chat/fetch",
  async function (_, { rejectWithValue }) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_API_URL_V1}chat/`,
        {
          credentials: "include",
        }
      );
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
  reducers: {
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    addChat(state, action) {
      state.chats.push(action.payload);
    },
    addMessage(state, action) {
      if (!state.chats) return;
      const { message, chatID } = action.payload;
      const chat = state.chats.find((_chat) => _chat._id === chatID);
      if (!chat) return;
      chat.messages.push(message);
      if (state.selectedChat?._id === chatID)
        state.selectedChat.messages.push(message);
    },
    sortChat(state) {
      let chatsWithMsg = [];
      const chatsWithNoMsg = [];
      current(state.chats).forEach((chat) => {
        if (chat.messages.length) chatsWithMsg.push(chat);
        else chatsWithNoMsg.push(chat);
      });
      chatsWithMsg = chatsWithMsg.sort((c1, c2) => {
        return (
          new Date(c2.messages[c2.messages.length - 1].createdAt) -
          new Date(c1.messages[c1.messages.length - 1].createdAt)
        );
      });
      state.chats = [...chatsWithMsg, ...chatsWithNoMsg];
    },
    setSocket(state, action) {
      state.socket = action.payload;
    },
    reset(state) {
      state.chats = [];
      state.messages = [];
      state.selectedChat = null;
      state.chatLoading = "";
      state.messageLoading = "";
      state.chatError = "";
      state.messageError = "";
      state.socket = null;
    },
  },
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

const { setSelectedChat, addChat, addMessage, setSocket, reset, sortChat } =
  chatSlice.actions;

const selectChat = (state) => state.chat;
const selectChats = createSelector([selectChat], (chat) => {
  return chat.chats;
});
const selectChatLoading = createSelector(
  [selectChat],
  (chat) => chat.chatLoading
);
const selectSelectedChat = createSelector(
  [selectChat],
  (chat) => chat.selectedChat
);

const selectMessages = createSelector([selectSelectedChat], (selectedChat) => {
  if (!selectedChat) return [];
  return selectedChat.messages;
});
const selectMessageLoading = createSelector(
  [selectChat],
  (chat) => chat.messageLoading
);
const selectSocket = createSelector([selectChat], (chat) => chat.socket);

export {
  reset,
  fetchChats,
  setSelectedChat,
  addChat,
  addMessage,
  setSocket,
  sortChat,
  selectChats,
  selectChatLoading,
  selectSelectedChat,
  selectMessages,
  selectMessageLoading,
  selectSocket,
};
export default chatSlice.reducer;
