import { Link } from "react-router-dom";
import styles from "./NavLeague.module.css";

function NavLeague({ btn1Clicked, btn2Clicked }) {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li>
          <Link className={styles[btn1Clicked]} to="/teamLeague">
            Classificação
          </Link>
        </li>
        <li>
          <Link className={styles[btn2Clicked]} to="/teamMatches">
            Partidas
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default NavLeague;
