import styles from "./AddMatch.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function AddMatch(props) {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  async function createMatch(e) {
    e.preventDefault();
    try {
      matches.goalTeam1 = "";
      matches.goalTeam2 = "";
      await axios.post(`${apiUrl}/matches`, matches);
    } catch (error) {
      console.log(error);
    }
    navigate("/teamMatches");
  }
  const handleTeam1 = (e) => {
    setMatches({
      ...matches,
      team1: e.target.options[e.target.selectedIndex].text,
      team1Id: e.target.options[e.target.selectedIndex].value,
    });
  };
  const handleTeam2 = (e) => {
    setMatches({
      ...matches,
      team2: e.target.options[e.target.selectedIndex].text,
      team2Id: e.target.options[e.target.selectedIndex].value,
    });
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Criar Partida
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "150px" }}>
        <form onSubmit={createMatch} className={styles.matches_form}>
          <label>{`Defina os times para a partida `}</label>
          <div className={styles.form_option}>
            <select name="team1" id="team1_id" onChange={handleTeam1} required>
              <option>Selecione uma opção</option>
              {props.teams.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <span>X</span>
            <select name="team2" id="team2_id" onChange={handleTeam2}>
              <option>Selecione uma opção</option>
              {props.teams.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" onClick={props.onHide}>
            Confirmar
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer
        style={{ height: "50px", display: "flex", alignContent: "center" }}
      >
        <button className={styles.btn_cancel} onClick={props.onHide}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddMatch;
