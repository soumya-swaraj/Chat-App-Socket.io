import { selectUser } from "../user/userSlice";
import "./NavBar.module.css";
import { useSelector } from "react-redux";

function NavBar() {
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <nav>
      <p>Chatify</p>
      <img src={user.profilePic} alt="" />
    </nav>
  );
}

export default NavBar;
