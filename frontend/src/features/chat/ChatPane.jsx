import { useState } from "react";
import menuImg from "../../assets/menu.png";

import styles from "./ChatPane.module.css";
function ChatPane() {
  const [isUserPaneOpen, setIsUserPaneOpen] = useState(true);
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
    </div>
  );
}

export default ChatPane;
