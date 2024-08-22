import styles from "./EditTeam.module.css";
import AddButton from "../layouts/AddButton";
import LinkButton from "../layouts/LinkButton";
import Input from "../form/Input";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;


function EditTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getTeam() {
      try {
        const response = await axios.get(`${apiUrl}/teams/${id}`);
        setTeam(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTeam();
  }, [id]);

  async function changeTeam(e) {
    e.preventDefault();
    try {
      await axios.patch(`${apiUrl}/teams/${id}`, team);
      navigate("/teamLeague");
    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
    console.log(team);
  };
  function reset() {
    setTeam({ ...team, p: 0, j: 0, v: 0, e: 0, d: 0, gm: 0, gs: 0, sg: 0 });
  }

  return (
    <div className={styles.edit_container}>
      <h4>Editar Time</h4>
      <form className={styles.form} onSubmit={changeTeam}>
        <Input
          text="Nome:"
          type="text"
          name="name"
          placeholder="Defina o nome do time"
          value={team?.name ? team.name : ""}
          handleChange={handleChange}
        />
        <Input
          text="Pontuação:"
          type="number"
          name="p"
          placeholder="Quantidade de pontos do time"
          value={team?.p ? team.p : "0"}
          handleChange={handleChange}
        />

        <Input
          text="Jogos:"
          type="number"
          name="j"
          placeholder="Quantidade de jogos do time"
          value={team?.j ? team.j : "0"}
          handleChange={handleChange}
        />
        <Input
          text="Vitórias:"
          type="number"
          name="v"
          placeholder="Quantidade de vitórias do time"
          value={team?.v ? team.v : "0"}
          handleChange={handleChange}
        />
        <Input
          text="Empates:"
          type="number"
          name="e"
          placeholder="Quantidade de empates do time"
          value={team?.e ? team.e : "0"}
          handleChange={handleChange}
        />
        <Input
          text="Derrotas:"
          type="number"
          name="d"
          placeholder="Quantidade de derrotas do time"
          value={team?.d ? team.d : "0"}
          handleChange={handleChange}
        />
        <Input
          text="Gols Marcados:"
          type="number"
          name="gm"
          placeholder="Quantidade de gols marcados do time"
          value={team?.gm ? team.gm : "0"}
          handleChange={handleChange}
        />
        <Input
          text="Gols Sofridos:"
          type="number"
          name="gs"
          placeholder="Quantidade de gols sofridos do time"
          value={team?.gs ? team.gs : "0"}
          handleChange={handleChange}
        />
        <Input
          text="Saldo de Gols:"
          type="number"
          name="sg"
          placeholder="Quantidade de saldo de gols do time"
          value={team?.sg ? team.sg : "0"}
          handleChange={handleChange}
        />
        <div className={styles.btn}>
          <AddButton type="submit" text="Salvar" />
          <button type="reset" className={styles.btn_reset} onClick={reset}>
            Reset
          </button>
          <LinkButton to="/teamLeague" text="Voltar" btnStyle="btn_red" />
        </div>
      </form>
    </div>
  );
}
export default EditTeam;
