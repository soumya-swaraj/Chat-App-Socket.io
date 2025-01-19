import styles from "./MessageDraft.module.css";
import addImageImg from "../../assets/add-image.png";
import sendImg from "../../assets/send.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, selectSelectedChat } from "./ChatSlice";
import { postMessage } from "../../utils/chat.util";

function MessageDraft() {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [sending, setSending] = useState(false);
  const chat = useSelector(selectSelectedChat);
  const dispatch = useDispatch();

  async function sendMessage() {
    if ((!image && !text) || !chat._id) return;
    setSending(true);
    console.log("Sending...");
    const message = await postMessage(chat._id, text, image);
    dispatch(addMessage({ message, chatID: chat._id }));
    setSending(false);
    setText("");
    setImage("");
  }

  return (
    <div className={styles.mainBar}>
      <textarea
        value={text}
        onKeyDown={(e) => {
          if (e.shiftKey) return;
          if (e.key === "Enter") sendMessage();
        }}
        onChange={(e) => {
          setText(e.target.value);
        }}
        type="text"
      />
      <button disabled={sending}>
        <img src={addImageImg} />
      </button>
      <button disabled={sending} onClick={sendMessage}>
        <img src={sendImg} />
      </button>
    </div>
  );
}

export default MessageDraft;
