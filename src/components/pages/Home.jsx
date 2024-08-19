import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import LinkButton from "../layouts/LinkButton";
import Footer from "../layouts/Footer";

function Home() {
  return (
    <section className={styles.home_container}>
      <div className={styles.home_content}>
        <h1>
          Bem vindo ao <span>Liga de clubes</span>
        </h1>
        <p>
          Aqui você poderá criar sua liga personalizada com a quantidade de
          times que desejar!
        </p>
        <LinkButton to={"/NewTeam"} text={"Criar Liga"} btnStyle="btn" />
      </div>
      <Footer />
    </section>
  );
}
export default Home;
