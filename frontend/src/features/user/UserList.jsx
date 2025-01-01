/* eslint-disable react/prop-types */
import User from "./User";
import styles from "./UserList.module.css";
import { HashLoader } from "react-spinners";

function UserList({ users, isUserLoading, setRegex }) {
  return (
    <div className={styles.userList}>
      {isUserLoading && <HashLoader color="#ffffff" loading size={50} />}
      {!isUserLoading &&
        users.map((user) => (
          <User setRegex={setRegex} key={user._id} user={user} />
        ))}
      {!isUserLoading && users.length === 0 && "No user found!"}
    </div>
  );
}

export default UserList;
