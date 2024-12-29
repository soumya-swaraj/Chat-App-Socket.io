import toast, { Toaster } from "react-hot-toast";
import hidePasswordImg from "../../assets/hide-password.png";
import showPasswordImg from "../../assets/show-password.png";
import styles from "./Login.module.css";
import logoWhite from "../../assets/logo-white.png";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function loginHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (data.status === "fail") {
        toast(data.message);
      } else if (data.status === "success") {
        navigate("/");
      }
    } catch (error) {
      console.log("loginHandler - Login.jsx ", error);
    } finally {
      setIsLoading(false);
    }
  }
  function togglePasswordHandler() {
    setShowPassword((prev) => !prev);
  }
  return (
    <div className={styles.mainContainer}>
      <Toaster />
      <div className={styles.leftContainer}>
        <form onSubmit={loginHandler}>
          <div>
            <h1>Welcome Back!</h1>
            <h3>Login into your account</h3>
          </div>
          <div className={styles.inputContainer}>
            <label>Email or username</label>
            <input
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
              }}
              type="text"
            />
          </div>
          <div
            className={`${styles.inputContainer} ${styles.passwordContainer}`}
          >
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
            />
            <img
              src={showPassword ? showPasswordImg : hidePasswordImg}
              onClick={togglePasswordHandler}
            />
          </div>
          <div className={styles.btnContainer}>
            <button disabled={isLoading} type="submit">
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        <div>
          <span>Don&apos;t have an account?&nbsp;</span>
          <Link style={{ color: "rgb(150, 113, 229)" }} to={"/signup"}>
            Create Account
          </Link>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.logoContainer}>
          <img src={logoWhite} alt="logo" />
          <span>Chatify</span>
        </div>
        <div className={styles.quoteContainer}>
          <p className={styles.firstLine}>Where words become connections.</p>
          <p className={styles.secondLine}>Chatify your world.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
