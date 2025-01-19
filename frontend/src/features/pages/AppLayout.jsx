import { useDispatch, useSelector } from "react-redux";
import ChatPane from "../chat/ChatPane";
import NavBar from "../ui/NavBar";
import styles from "./AppLayout.module.css";
import {
  addChat,
  selectChats,
  selectSelectedChat,
  selectSocket,
  setSocket,
} from "../chat/ChatSlice";
import NoChatSelected from "../chat/NoChatSelected";
import SelectedChatBar from "../chat/SelectedChatBar";
import MessageDraft from "../chat/MessageDraft";
import ChatHistory from "../chat/ChatHistory";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { selectUser } from "../user/userSlice";

function HomePage() {
  const selectedChat = useSelector(selectSelectedChat);
  const socket = useSelector(selectSocket);
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);
  const { _id: myID } = useSelector(selectUser);

  useEffect(() => {
    if (!socket?.connected) {
      const socket = io(import.meta.env.VITE_BASE_URL);
      socket.on("connect", () => {
        dispatch(setSocket(socket));
      });
      socket.on("new chat", (chat) => {
        console.log("NewChat triggered");
        dispatch(addChat(chat));
        socket.emit("join chats", [chat._id]);
      });
      socket.on("disconnect", () => {
        dispatch(setSocket(null));
      });
    }
  }, [dispatch, socket?.connected]);

  useEffect(() => {
    if (socket?.connected) {
      const chatIDs = chats.map((chat) => chat._id);
      socket.emit("join chats", [...chatIDs, myID]);
    }
  }, [chats, socket, myID]);

  return (
    <div className={styles.topContainer}>
      <NavBar />
      <div className={styles.mainContainer}>
        <div className={styles.chatPaneContainer}>
          <ChatPane />
        </div>
        <div className={styles.rightContainer}>
          {!selectedChat ? (
            <NoChatSelected />
          ) : (
            <>
              <SelectedChatBar />
              <ChatHistory />
              <MessageDraft />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
