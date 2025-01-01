import { useEffect, useState } from "react";
import UserList from "../user/UserList";
import { selectUser } from "../user/userSlice";
import "./NavBar.module.css";
import { useSelector } from "react-redux";

function NavBar() {
  const [regex, setRegex] = useState("");
  const [users, setUsers] = useState([]);
  const user = useSelector(selectUser);
  const [isUserLoading, setIsUserLoading] = useState(false);

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
      <img src={user.profilePic} alt="" />
    </nav>
  );
}

export default NavBar;
