/* eslint-disable react/prop-types */
import { checkPvtChatByMembers, createNewPvtChat } from "../../utils/chat.util";
import style from "./User.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./userSlice";
import { addChat, setSelectedChat } from "../chat/ChatSlice";

function User({ user, setRegex }) {
  const dispatch = useDispatch();
  const { _id: myID } = useSelector(selectUser);
  async function selectChat() {
    try {
      const pastChat = await checkPvtChatByMembers(user._id, myID);
      if (pastChat) {
        dispatch(setSelectedChat(pastChat));
      } else {
        const newChat = await createNewPvtChat([myID, user._id]);
        dispatch(addChat(newChat));
        dispatch(setSelectedChat(newChat));
      }
      setRegex("");
    } catch (error) {
      console.log("selectChat - User.jsx", error);
    }
  }
  return (
    <div onClick={selectChat} className={style.userCardContainer}>
      <img src={user.profilePic} />
      <div>
        <p className={style.name}>{user.name}</p>
        <p className={style.username}>{user.username}</p>
      </div>
    </div>
  );
}

export default User;
