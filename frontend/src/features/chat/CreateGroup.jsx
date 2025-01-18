/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./CreateGroup.module.css";
import UserListForGroupChat from "./UserListForGroupChat";
import pencil from "../../assets/pencil.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../user/userSlice";
import { addChat } from "./ChatSlice";

function CreateGroup({ setShowCreateGroupOverlay }) {
  const me = useSelector(selectUser);
  const [groupName, setGroupName] = useState("");
  const [userRegex, setUserRegex] = useState("");
  const [image, setImage] = useState("");
  const [members, setMembers] = useState([me]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_API_URL_V1}user/all/${userRegex}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setSearchedUsers(data.data.users);
      } catch (error) {
        console.log("fetchUsers - NavBar.jsx", error);
      }
    }
    if (userRegex) fetchUsers();
  }, [userRegex]);

  function addMember(member) {
    setMembers((prev) => [...prev, member]);
  }

  function removeUserFromMembers(id) {
    setMembers((prev) => [...prev.filter((member) => member._id !== id)]);
  }

  async function createGroup() {
    try {
      setIsCreatingGroup(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_API_URL_V1}chat/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatName: groupName,
            ...(image && { image }),
            admins: [me],
            members,
            isGroupChat: true,
          }),
          credentials: "include",
        }
      );
      const data = await res.json();

      setShowCreateGroupOverlay(false);
      setIsCreatingGroup(false);
      dispatch(addChat(data.data.chat));
    } catch (error) {
      console.log("createGroup - CreateGroup.jsx", error);
    }
  }

  function setImageHandler(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div
        onClick={() => {
          setShowCreateGroupOverlay(false);
        }}
        className={styles.closeBtnContainer}
      >
        &times;
      </div>
      <div className={styles.formContainer}>
        <div className={styles.photoInput}>
          <input onChange={setImageHandler} id="groupImg" type="file" name="" />
          <img
            src={
              image ||
              "https://res.cloudinary.com/dli5cdsx2/image/upload/v1735739234/h2fxhzv5qolpnhicafwh.png"
            }
            alt=""
          />
          <label htmlFor="groupImg">
            <img src={pencil} />
          </label>
        </div>
        <div className={styles.rightContainer}>
          <input
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
            type="text"
            placeholder="Group name"
          />
          <input
            value={userRegex}
            onChange={(e) => {
              setUserRegex(e.target.value);
            }}
            type="text"
            placeholder="Search people name"
          />
          <button
            onClick={createGroup}
            disabled={members.length === 0 || isCreatingGroup}
          >
            {!isCreatingGroup ? "Create" : "Creating..."}
          </button>
          {userRegex && (
            <UserListForGroupChat
              members={members}
              setUserRegex={setUserRegex}
              addMember={addMember}
              searchedUsers={searchedUsers}
            />
          )}
        </div>
      </div>
      <div className={styles.membersContainer}>
        {members &&
          members.map((member) => (
            <p key={member._id}>
              {member.name}{" "}
              <span
                onClick={() => {
                  removeUserFromMembers(member._id);
                }}
              >
                &times;
              </span>
            </p>
          ))}
      </div>
    </div>
  );
}

export default CreateGroup;
