import { useEffect, useState } from "react";
import menuImg from "../../assets/menu.png";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ChatPane.module.css";
import { fetchChats, selectChatLoading, selectChats } from "./ChatSlice";
import Chat from "./Chat";

function ChatPane() {
  const [isUserPaneOpen, setIsUserPaneOpen] = useState(true);
  const chats = useSelector(selectChats);
  const chatLoading = useSelector(selectChatLoading);

  const dispath = useDispatch();

  useEffect(() => {
    dispath(fetchChats());
  }, [dispath]);

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
