import logoWhite from "../../assets/logo-white.png";
import hidePasswordImg from "../../assets/hide-password.png";
import showPasswordImg from "../../assets/show-password.png";
import styles from "./Signup.module.css";
import { useEffect, useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailValidationMsg, setEmailValidationMsg] = useState("");
  const [usernameValidationMsg, setUsernameValidationMsg] = useState("");
  const [passwordValidationMsg, setPasswordValidationMsg] = useState("");
  const [confPasswordValidationMsg, setConfPasswordValidationMsg] =
    useState("");

  const [showProfilePicSetSection, setShowProfilePicSetSection] =
    useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function checkUsername() {
      try {
        const data = await fetch(
          `http://localhost:4000/api/v1/user/check/${username}`,
          { signal: controller.signal }
        );
        const res = await data.json();
        if (res.message === "Username is not available")
          setUsernameValidationMsg(res.message);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request canceled");
        } else {
          console.log("checkUsername - Signup.jsx ", error);
        }
      }
    }
    if (username) checkUsername();
  }, [username]);

  function togglePasswordHandler() {
    setShowPassword((prev) => !prev);
  }
  function createAccountHandler(e) {
    e.preventDefault();
    if (!email) setEmailValidationMsg("Provide email");
    if (!username) setUsernameValidationMsg("Provide username");
    if (!password) setPasswordValidationMsg("Provide password");
    if (password !== confPassword)
      setConfPasswordValidationMsg("Password does not match");
    if (!email || !username || !password || password !== confPassword) {
      return;
    }
    setShowProfilePicSetSection(true);
    // fetch("http://localhost:4000/api/v1/user/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username,
    //     email,
    //     password,
    //   }),
    // });
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.logoContainer}>
          <img src={logoWhite} alt="logo" />
          <span>Chatify</span>
        </div>
        <div className={styles.quoteContainer}>
          <p className={styles.firstLine}>Where words become connections.</p>
          <p className={styles.secondLine}>Chatify your world.</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        {!showProfilePicSetSection ? (
          <form onSubmit={createAccountHandler}>
            <div>
              <h1>Welcome!</h1>
              <h3>Create your account</h3>
            </div>
            <div className={styles.inputContainer}>
              <label>Email</label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailValidationMsg("");
                }}
              />
              {emailValidationMsg && (
                <p className={styles.validation}>{emailValidationMsg}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameValidationMsg("");
                }}
              />
              {usernameValidationMsg && (
                <p className={styles.validation}>{usernameValidationMsg}</p>
              )}
            </div>
            <div
              className={`${styles.inputContainer} ${styles.passwordContainer}`}
            >
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordValidationMsg("");
                }}
              />
              {passwordValidationMsg && (
                <p className={styles.validation}>{passwordValidationMsg}</p>
              )}
              <img
                src={showPassword ? showPasswordImg : hidePasswordImg}
                onClick={togglePasswordHandler}
              />
            </div>
            <div
              className={`${styles.inputContainer} ${styles.passwordContainer}`}
            >
              <label>Confirm password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confPassword}
                onChange={(e) => {
                  setConfPassword(e.target.value);
                  if (password === e.target.value) {
                    setConfPasswordValidationMsg("");
                  }
                }}
              />
              {confPasswordValidationMsg && (
                <p className={styles.validation}>{confPasswordValidationMsg}</p>
              )}
            </div>
            <div className={styles.btnContainer}>
              <button type="submit">Create Account</button>
            </div>
          </form>
        ) : (
          <div>
            <label htmlFor="photoInput">
              <div className={styles.photoContainer}></div>
            </label>
            <input id="photoInput" type="file" style={{ display: "none" }} />
            <div className={styles.btnContainer}>
              <button>Create Account</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
