/* eslint-disable react/prop-types */
import style from "./User.module.css";

function User({ user }) {
  return (
    <div className={style.userCardContainer}>
      <img src={user.profilePic} alt="" />
      <p>{user.name}</p>
    </div>
  );
}

export default User;
