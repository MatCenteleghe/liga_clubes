import styles from "./NewTeam.module.css";
import { useState } from "react";
import axios from "axios";
import LinkButton from "../layouts/LinkButton";
import AddButton from "../layouts/AddButton";
import Input from "../form/Input";
import Footer from "../layouts/Footer";
function NewTeam() {
  const [teams, setTeams] = useState([]);
  const [teamCount, setTeamCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;


  async function createTeam(e) {
    e.preventDefault();
    teams.p = 0;
    teams.j = 0;
    teams.v = 0;
    teams.d = 0;
    teams.e = 0;
    teams.gm = 0;
    teams.gs = 0;
    teams.sg = 0;

    try {
      setLoading(true);
      await axios.post(`${apiUrl}/teams`, teams);
      setTeamCount(teamCount + 1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const handleAddTeam = (e) => {
    setTeams({ ...teams, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.newTeam_container}>
      <div className={styles.newTeam_content}>
        <h1>Adicionar times </h1>
        {loading ? (
          <p>Adicionando...</p>
        ) : (
          <form className={styles.form} onSubmit={createTeam}>
            <label>Nome dos times </label>
            <Input
              name="name"
              placeholder="Digite o nome do time"
              type="text"
              handleChange={handleAddTeam}
            />
            <AddButton type="submit" text="Adicionar" />
            <p>
              Times adicionados:<span> {teamCount}</span>
            </p>
          </form>
        )}

        <div className={styles.linkbuttons}>
          <LinkButton to="/" text="Voltar" btnStyle="btn_red" />
          <LinkButton to="/teamLeague" text="Confirmar" btnStyle="btn" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default NewTeam;
