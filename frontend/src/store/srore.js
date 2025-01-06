import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/chatSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});
