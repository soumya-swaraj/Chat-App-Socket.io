import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/ChatSlice";
import userReducer from "../features/user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["chat.socket"],
        ignoredActions: ["chat/setSocket"],
      },
    }),
});
