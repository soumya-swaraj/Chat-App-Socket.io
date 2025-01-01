/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { useEffect, useState } from "react";
import styles from "./Chat.module.css";

function Chat({ chat, isUserPaneOpen }) {
  const { isGroupChat, members } = chat;
  const { _id: myID } = useSelector(selectUser);
  const [chatName, setChatName] = useState();
  const [chatImage, setChatImage] = useState();

  useEffect(() => {
    if (isGroupChat) {
      setChatName(chat.chatName || "Group Chat");
      setChatImage(
        "https://res.cloudinary.com/dli5cdsx2/image/upload/v1735739234/h2fxhzv5qolpnhicafwh.png"
      );
    } else {
      const opponentID = members.find((id) => id !== myID);
      async function fetchUser() {
        const res = await fetch(
          `http://localhost:4000/api/v1/user/${opponentID}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setChatName(data.data.user.name);
        setChatImage(data.data.user.profilePic);
      }
      fetchUser();
    }
  }, [chat.chatName, isGroupChat, members, myID]);
  return (
    <div className={styles.chatContainer}>
      <img src={chatImage} />
      {isUserPaneOpen && <p>{chatName}</p>}
    </div>
  );
}

export default Chat;
