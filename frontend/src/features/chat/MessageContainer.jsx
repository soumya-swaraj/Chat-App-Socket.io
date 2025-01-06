/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import styles from "./MessageContainer.module.css";
import { selectUser } from "../user/userSlice";
import MessageBubble from "./MessageBubble";
import { convertToIST } from "../../utils/chat.util";

function MessageContainer({ message, sender }) {
  const me = useSelector(selectUser);
  const ownMessage = me._id === sender?._id;

  return (
    <div
      className={`${styles.messageContainer} ${ownMessage && styles.myMessage}`}
    >
      <p>{convertToIST(message.createdAt)}</p>
      <MessageBubble message={message} ownMessage={message} sender={sender} />
    </div>
  );
}

export default MessageContainer;
