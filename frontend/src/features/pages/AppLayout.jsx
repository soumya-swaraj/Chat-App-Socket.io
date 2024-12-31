import ChatPane from "../chat/ChatPane";
import NavBar from "../ui/NavBar";
import styles from "./AppLayout.module.css";

function HomePage() {
  return (
    <div className={styles.topContainer}>
      <NavBar />
      <div className={styles.mainContainer}>
        <div className={styles.chatPaneContainer}>
          <ChatPane />
        </div>
        <div>
          {/* selected user name */}
          {/* chat */}
          {/* form */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
