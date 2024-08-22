import styles from "./Footer.module.css";
import LinkButton from "./LinkButton";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.email}>
        <p>mateuscenteleghe2000@gmail.com</p>
      </div>
      <div>
        <ul className={styles.social_list}>
          <li>
            <LinkButton
              to="https://github.com/MatCenteleghe"
              text={<FaGithub />}
              target={"_blank"}
            />
          </li>

          <li>
            <LinkButton
              to="https://www.linkedin.com/in/mateus-centeleghe-4abb4125b/"
              text={<FaLinkedin />}
              target={"_blank"}
            />
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
