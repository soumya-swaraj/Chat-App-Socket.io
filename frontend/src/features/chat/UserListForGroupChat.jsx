/* eslint-disable react/prop-types */
import style from "./UserListForGroupChat.module.css";

function UserListForGroupChat({
  searchedUsers,
  addMember,
  setUserRegex,
  members,
}) {
  const ids = members.map((member) => member._id);

  return (
    <div className={style.mainContainer}>
      {searchedUsers.map((user) => {
        if (!ids.includes(user._id)) {
          return (
            <p
              onClick={() => {
                setUserRegex("");
                addMember(user);
              }}
              key={user._id}
            >
              {user.name}
            </p>
          );
        }
      })}
    </div>
  );
}

export default UserListForGroupChat;
