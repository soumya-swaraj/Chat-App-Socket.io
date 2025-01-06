/* eslint-disable react/prop-types */
import styles from "./HighPriority.module.css";

function HighPriority({ children }) {
  return <div className={styles.mainContainer}>{children}</div>;
}

export default HighPriority;
