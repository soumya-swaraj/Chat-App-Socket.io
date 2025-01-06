import { useSelector } from "react-redux";
import ChatPane from "../chat/ChatPane";
import NavBar from "../ui/NavBar";
import styles from "./AppLayout.module.css";
import { selectSelectedChat } from "../chat/ChatSlice";
import NoChatSelected from "../chat/NoChatSelected";
import SelectedChatBar from "../chat/SelectedChatBar";
import MessageDraft from "../chat/MessageDraft";
import ChatHistory from "../chat/ChatHistory";

function HomePage() {
  const selectedChat = useSelector(selectSelectedChat);

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
