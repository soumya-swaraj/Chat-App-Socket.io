import { useEffect, useState } from "react";
import UserList from "../user/UserList";
import { removeUser, selectUser } from "../user/userSlice";
import "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import createGroupImg from "../../assets/create-group-button.png";
import leaveImg from "../../assets/leave.png";
import styles from "./NavBar.module.css";
import HighPriority from "./HighPriority";
import CreateGroup from "../chat/CreateGroup";
import { useNavigate } from "react-router-dom";
import { reset as resetChat } from "../chat/ChatSlice";

function NavBar() {
  const [regex, setRegex] = useState("");
  const [users, setUsers] = useState([]);
  const user = useSelector(selectUser);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [showCreateGroupOverlay, setShowCreateGroupOverlay] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsUserLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_API_URL_V1}user/all/${regex}`,
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

  async function logout() {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_API_URL_V1}user/logout`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      dispatch(removeUser());
      dispatch(resetChat());
      navigate("/login");
    }
  }

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
          className={styles.leftIcon}
          onClick={() => {
            setShowCreateGroupOverlay(true);
          }}
        />
        <img className={styles.leftIcon} src={leaveImg} onClick={logout} />
        <img
          src={user.profilePic}
          className={styles.leftIcon + " " + styles.profilePic}
        />
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
