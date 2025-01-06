import { useEffect, useState } from "react";
import UserList from "../user/UserList";
import { selectUser } from "../user/userSlice";
import "./NavBar.module.css";
import { useSelector } from "react-redux";
import createGroupImg from "../../assets/create-group-button.png";
import styles from "./NavBar.module.css";
import HighPriority from "./HighPriority";
import CreateGroup from "../chat/CreateGroup";

function NavBar() {
  const [regex, setRegex] = useState("");
  const [users, setUsers] = useState([]);
  const user = useSelector(selectUser);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [showCreateGroupOverlay, setShowCreateGroupOverlay] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsUserLoading(true);
        const res = await fetch(
          `http://localhost:4000/api/v1/user/all/${regex}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setUsers(data.data.users);
      } catch (error) {
        console.log("fetchUsers - NavBar.jsx", error);
      } finally {
        setIsUserLoading(false);
      }
    }
    if (regex) fetchUsers();
    if (!regex) setUsers([]);
  }, [regex]);

  return (
    <nav>
      <p>Chatify</p>
      <div>
        <input
          value={regex}
          onChange={(e) => {
            setRegex(e.target.value);
          }}
          type="text"
        />
        {regex && (
          <UserList
            setRegex={setRegex}
            users={users}
            isUserLoading={isUserLoading}
          />
        )}
      </div>
      <div className={styles.rightContainer}>
        <img
          src={createGroupImg}
          className={styles.profilePic}
          onClick={() => {
            setShowCreateGroupOverlay(true);
          }}
        />
        <img src={user.profilePic} className={styles.createGroup} />
      </div>
      {showCreateGroupOverlay && (
        <HighPriority>
          <CreateGroup setShowCreateGroupOverlay={setShowCreateGroupOverlay} />
        </HighPriority>
      )}
    </nav>
  );
}

export default NavBar;
