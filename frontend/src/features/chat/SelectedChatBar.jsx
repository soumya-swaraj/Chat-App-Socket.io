import { useEffect, useState } from "react";
import styles from "./SelectedChatBar.module.css";
import { useSelector } from "react-redux";
import { selectSelectedChat } from "./ChatSlice";
import { selectUser } from "../user/userSlice";

function SelectedChatBar() {
  const selectChat = useSelector(selectSelectedChat);
  const [chatName, setChatName] = useState();
  const [chatImg, setChatImg] = useState();
  const { _id: myID } = useSelector(selectUser);

  useEffect(() => {
    if (selectChat.isGroupChat) {
      setChatImg(
        "https://res.cloudinary.com/dli5cdsx2/image/upload/v1735739234/h2fxhzv5qolpnhicafwh.png"
      );
      setChatName(selectChat.name || "Group Chat");
    } else {
      const opponentID = selectChat.members.find((id) => id !== myID);
      async function fetchUser() {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_API_URL_V1}user/${opponentID}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setChatName(data.data.user.name);
        setChatImg(data.data.user.profilePic);
      }
      fetchUser();
    }
  }, [myID, selectChat]);

  return (
    <div className={styles.mainBar}>
      <img src={chatImg} />
      <p>{chatName}</p>
    </div>
  );
}

export default SelectedChatBar;
