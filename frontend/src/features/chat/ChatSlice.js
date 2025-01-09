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
  socket: null,
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

const fetchMessages = createAsyncThunk(
  "message/fetch",
  async function (_, { rejectWithValue, getState }) {
    const state = getState();
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/message/${state.chat.selectedChat._id}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        const data = await res.json();
        return rejectWithValue(data.message);
      }
      const data = await res.json();
      return data.data.messages;
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
      state.messages.push(action.payload);
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
      })
      .addCase(fetchMessages.fulfilled, function (state, action) {
        state.messages = action.payload;
        state.messageLoading = "succeeded";
      })
      .addCase(fetchMessages.pending, function (state) {
        state.messageLoading = "pending";
      })
      .addCase(fetchMessages.rejected, function (state, action) {
        state.messageError = action.payload;
        state.messageLoading = "failed";
      });
  },
});

const { setSelectedChat, addChat, addMessage, setSocket, reset } =
  chatSlice.actions;

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
const selectMessages = createSelector([selectChat], (chat) => chat.messages);
const selectMessageLoading = createSelector(
  [selectChat],
  (chat) => chat.messageLoading
);
const selectSocket = createSelector([selectChat], (chat) => chat.socket);

export {
  reset,
  fetchChats,
  fetchMessages,
  setSelectedChat,
  addChat,
  addMessage,
  setSocket,
  selectChats,
  selectChatLoading,
  selectSelectedChat,
  selectMessages,
  selectMessageLoading,
  selectSocket,
};
export default chatSlice.reducer;
