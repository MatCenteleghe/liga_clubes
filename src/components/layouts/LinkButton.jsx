import { Link } from "react-router-dom";

import styles from "./LinkButton.module.css";

function LinkButton({ to, text, btnStyle, target }) {
  return (
    <Link to={to} className={styles[btnStyle]} target={target}>
      {text}
    </Link>
  );
}
export default LinkButton;
