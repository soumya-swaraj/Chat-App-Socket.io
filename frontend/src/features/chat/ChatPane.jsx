import { useEffect, useState } from "react";
import menuImg from "../../assets/menu.png";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ChatPane.module.css";
import {
  fetchChats,
  selectChatLoading,
  selectChats,
  addMessage,
  selectSocket,
  sortChat,
} from "./ChatSlice";
import Chat from "./Chat";
import { selectUser } from "../user/userSlice";

function ChatPane() {
  const [isUserPaneOpen, setIsUserPaneOpen] = useState(true);
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);
  const chatLoading = useSelector(selectChatLoading);
  const socket = useSelector(selectSocket);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (socket?.connected) {
      socket.on("new message", (message) => {
        if (message.senderID !== user._id) {
          dispatch(addMessage({ message, chatID: message.chatID }));
        }
        setTimeout(() => {
          dispatch(sortChat());
        }, 50);
      });
    }
  }, [dispatch, socket, user._id]);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div
      className={`${styles.chatPaneMainContainer} ${
        isUserPaneOpen ? styles.chatPaneOpen : styles.chatPaneClose
      }`}
    >
      <div className={styles.header}>
        <button
          onClick={() => {
            setIsUserPaneOpen((prev) => !prev);
          }}
        >
          <img src={menuImg} />
        </button>
        {isUserPaneOpen && <input type="text" />}
      </div>
      {chatLoading === "idle" || chatLoading === "pending" ? (
        "Loading..."
      ) : (
        <div className={styles.userContainer}>
          {chats.map((chat) => (
            <Chat key={chat._id} chat={chat} isUserPaneOpen={isUserPaneOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatPane;
