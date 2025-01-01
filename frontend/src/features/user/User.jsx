/* eslint-disable react/prop-types */
import { checkPvtChatByMembers } from "../../utils/chat.util";
import style from "./User.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "./userSlice";

function User({ user, setRegex }) {
  const { _id: myID } = useSelector(selectUser);
  async function selectChat() {
    setRegex("");
    const pastChat = await checkPvtChatByMembers(user._id, myID);
    if (pastChat) {
      // set in redux,(selectedChat)
    } else {
      // create chat
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
