/* eslint-disable react/prop-types */
import styles from "./MessageBubble.module.css";

function MessageBubble({ message, ownMessage, sender }) {
  return <div className={styles.mainContainrt}>{message.text}</div>;
}

export default MessageBubble;
