import { useEffect, useState } from "react";
import styles from "./ChatHistory.module.css";
import MessageContainer from "./MessageContainer";
import {
  addMessage,
  fetchMessages,
  selectMessageLoading,
  selectMessages,
  selectSelectedChat,
  selectSocket,
} from "./ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";

function ChatHistory() {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const messageLoadingStatus = useSelector(selectMessageLoading);
  const selectedChat = useSelector(selectSelectedChat);
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const socket = useSelector(selectSocket);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (socket?.connected) {
      socket.on("new message", (message) => {
        if (
          message.chatID === selectedChat._id &&
          message.senderID !== user._id
        ) {
          dispatch(addMessage(message));
        }
      });
    }
  }, [dispatch, selectedChat._id, socket, user._id]);

  useEffect(() => {
    async function fetchMember() {
      setMembersLoading(true);
      try {
        const memberData = await Promise.all(
          selectedChat.members.map(async (member) => {
            const res = await fetch(
              `http://localhost:4000/api/v1/user/${member}`,
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

  useEffect(() => {
    async function loadMessages() {
      dispatch(fetchMessages());
    }
    loadMessages();
  }, [dispatch, selectedChat]);

  return (
    <div className={styles.mainContainer}>
      {messageLoadingStatus === "idle" ||
      messageLoadingStatus === "pending" ||
      membersLoading === true ? (
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
