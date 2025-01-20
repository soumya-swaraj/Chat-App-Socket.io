import { useEffect, useState } from "react";
import styles from "./ChatHistory.module.css";
import MessageContainer from "./MessageContainer";
import { selectMessages, selectSelectedChat } from "./ChatSlice";
import { useSelector } from "react-redux";

function ChatHistory() {
  const messages = useSelector(selectMessages);
  const selectedChat = useSelector(selectSelectedChat);
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);

  useEffect(() => {
    async function fetchMember() {
      setMembersLoading(true);
      try {
        const memberData = await Promise.all(
          selectedChat.members.map(async (member) => {
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE_API_URL_V1}user/${member}`,
              {
                credentials: "include",
              }
            );
            const data = await res.json();
            return data.data.user;
          })
        );
        setMembers(memberData);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setMembersLoading(false);
      }
    }

    if (selectedChat?.members?.length > 0) {
      fetchMember();
    }
  }, [selectedChat.members]);

  return (
    <div className={styles.mainContainer}>
      {membersLoading === true ? (
        <p>Loading...</p>
      ) : (
        messages.map((message) => (
          <MessageContainer
            key={message._id}
            message={message}
            sender={members.find((member) => member._id === message.senderID)}
          />
        ))
      )}
    </div>
  );
}

export default ChatHistory;
