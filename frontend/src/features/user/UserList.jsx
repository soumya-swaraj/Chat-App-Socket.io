/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import User from "./User";
import styles from "./UserList.module.css";
import { HashLoader } from "react-spinners";
import { selectUser } from "./userSlice";

function UserList({ users, isUserLoading, setRegex }) {
  const authUser = useSelector(selectUser);
  return (
    <div className={styles.userList}>
      {isUserLoading && <HashLoader color="#ffffff" loading size={50} />}
      {!isUserLoading &&
        users.map((user) => {
          if (user._id === authUser._id) return;
          return <User setRegex={setRegex} key={user._id} user={user} />;
        })}
      {!isUserLoading && users.length === 0 && "No user found!"}
    </div>
  );
}

export default UserList;
