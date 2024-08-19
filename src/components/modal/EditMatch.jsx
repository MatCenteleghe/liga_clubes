import styles from "./EditMatch.module.css";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function EditMatch(props) {
  const [getMatch, setGetMatch] = useState();
  const [editMatch, setEditMatch] = useState();
  const [disableSave, setDisableSave] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getSingleMatch(id) {
      try {
        const response = await axios.get(`${apiUrl}/matches/${id}`);
        setEditMatch(response.data);
        setGetMatch(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (props.show) {
      getSingleMatch(props.match?.id);
    }
  }, [props.match?.id]);

  useEffect(() => {
    async function getTeam1(id) {
      try {
        const response = await axios.get(`${apiUrl}/teams/${id}`);
        setTeam1(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (props.show) {
      getTeam1(props.match?.team1Id);
    }
  }, [props.match?.team1Id]);

  useEffect(() => {
    async function getTeam2(id) {
      try {
        const response = await axios.get(`${apiUrl}/teams/${id}`);
        setTeam2(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (props.show) {
      getTeam2(props.match?.team2Id);
    }
  }, [props.match?.team2Id]);

  useEffect(() => {
    function checkTeamGoals() {
      if (getMatch?.goalTeam1 === "" && getMatch?.goalTeam2 === "") {
        setDisableSave(false);
        setDisableUpdate(true);
      } else {
        setDisableSave(true);
        setDisableUpdate(false);
      }
    }
    if (props.show) {
      checkTeamGoals();
    }
  }, [getMatch?.goalTeam1, getMatch?.goalTeam2]);

  async function updateMatch(id, e) {
    e.preventDefault();
    try {
      await axios.patch(`${apiUrl}/matches/${id}`, editMatch);
      navigate("/teamMatches");
    } catch (error) {
      console.log(error);
    }
    updateTeam1(props.match?.team1Id);
    updateTeam2(props.match?.team2Id);
  }

  async function updateTeam1(id) {
    try {
      await axios.patch(`${apiUrl}/teams/${id}`, team1);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTeam2(id) {
    try {
      await axios.patch(`${apiUrl}/teams/${id}`, team2);
    } catch (error) {
      console.log(error);
    }
  }
  function updateTeams() {
    if (parseInt(editMatch?.goalTeam1) > parseInt(editMatch?.goalTeam2)) {
      setTeam1((prev) => ({
        ...prev,
        p: parseInt(prev?.p) + 3,
        j: parseInt(prev?.j) + 1,
        v: parseInt(prev?.v) + 1,
        gm: parseInt(prev?.gm) + parseInt(editMatch?.goalTeam1),
        gs: parseInt(prev?.gs) + parseInt(editMatch?.goalTeam2),
        sg:
          parseInt(prev?.sg) +
          parseInt(editMatch?.goalTeam1 - editMatch?.goalTeam2),
      }));
      setTeam2((prev) => ({
        ...prev,
        j: parseInt(prev?.j) + 1,
        d: parseInt(prev?.d) + 1,
        gm: parseInt(prev?.gm) + parseInt(editMatch?.goalTeam2),
        gs: parseInt(prev?.gs) + parseInt(editMatch?.goalTeam1),
        sg:
          parseInt(prev?.sg) +
          parseInt(editMatch?.goalTeam2 - editMatch?.goalTeam1),
      }));
    } else if (
      parseInt(editMatch?.goalTeam1) < parseInt(editMatch?.goalTeam2)
    ) {
      setTeam2((prev) => ({
        ...prev,
        p: parseInt(prev?.p) + 3,
        j: parseInt(prev?.j) + 1,
        v: parseInt(prev?.v) + 1,
        gm: parseInt(prev?.gm) + parseInt(editMatch?.goalTeam2),
        gs: parseInt(prev?.gs) + parseInt(editMatch?.goalTeam1),
        sg:
          parseInt(prev?.sg) +
          parseInt(editMatch?.goalTeam2 - editMatch?.goalTeam1),
      }));
      setTeam1((prev) => ({
        ...prev,
        j: parseInt(prev?.j) + 1,
        d: parseInt(prev?.d) + 1,
        gm: parseInt(prev?.gm) + parseInt(editMatch?.goalTeam1),
        gs: parseInt(prev?.gs) + parseInt(editMatch?.goalTeam2),
        sg:
          parseInt(prev?.sg) +
          parseInt(editMatch?.goalTeam1 - editMatch?.goalTeam2),
      }));
    } else {
      setTeam1((prev) => ({
        ...prev,
        p: parseInt(prev?.p) + 1,
        j: parseInt(prev?.j) + 1,
        e: parseInt(prev?.e) + 1,
        gm: parseInt(prev?.gm) + parseInt(editMatch?.goalTeam1),
        gs: parseInt(prev?.gs) + parseInt(editMatch?.goalTeam2),
        sg:
          parseInt(prev?.sg) +
          parseInt(editMatch?.goalTeam1 - editMatch?.goalTeam2),
      }));
      setTeam2((prev) => ({
        ...prev,
        p: parseInt(prev?.p) + 1,
        j: parseInt(prev?.j) + 1,
        e: parseInt(prev?.e) + 1,
        gm: parseInt(prev?.gm) + parseInt(editMatch?.goalTeam2),
        gs: parseInt(prev?.gs) + parseInt(editMatch?.goalTeam1),
        sg:
          parseInt(prev?.sg) +
          parseInt(editMatch?.goalTeam2 - editMatch?.goalTeam1),
      }));
    }
    props.onHide();
  }

  //----------------------------------------------------------------//

  function updateSameMatch() {
    if (parseInt(getMatch?.goalTeam1) > parseInt(getMatch.goalTeam2)) {
      if (parseInt(editMatch?.goalTeam1) > parseInt(editMatch?.goalTeam2)) {
        setTeam1((prev) => ({
          ...prev,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)) -
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)),
        }));
        setTeam2((prev) => ({
          ...prev,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)) -
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)),
        }));
      } else if (
        parseInt(editMatch?.goalTeam1) < parseInt(editMatch?.goalTeam2)
      ) {
        setTeam1((prev) => ({
          ...prev,
          p: parseInt(prev?.p) - 3,
          v: parseInt(prev?.v) - 1,
          d: parseInt(prev?.d) + 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)) -
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)),
        }));
        setTeam2((prev) => ({
          ...prev,
          p: parseInt(prev?.p) + 3,
          v: parseInt(prev?.v) + 1,
          d: parseInt(prev?.d) - 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)) -
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)),
        }));
      } else {
        setTeam1((prev) => ({
          ...prev,
          p: parseInt(prev?.p) - 2,
          v: parseInt(prev?.v) - 1,
          e: parseInt(prev?.e) + 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)) -
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)),
        }));
        setTeam2((prev) => ({
          ...prev,
          p: parseInt(prev?.p) + 1,
          e: parseInt(prev?.e) + 1,
          d: parseInt(prev?.d) - 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)) -
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)),
        }));
      }
    } else if (parseInt(getMatch?.goalTeam1) < parseInt(getMatch.goalTeam2)) {
      if (parseInt(editMatch?.goalTeam1) < parseInt(editMatch?.goalTeam2)) {
        setTeam1((prev) => ({
          ...prev,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)) -
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)),
        }));
        setTeam2((prev) => ({
          ...prev,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)) -
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)),
        }));
      } else if (
        parseInt(editMatch?.goalTeam1) > parseInt(editMatch?.goalTeam2)
      ) {
        setTeam1((prev) => ({
          ...prev,
          p: parseInt(prev?.p) + 3,
          v: parseInt(prev?.v) + 1,
          d: parseInt(prev?.d) - 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)) -
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)),
        }));
        setTeam2((prev) => ({
          ...prev,
          p: parseInt(prev?.p) - 3,
          v: parseInt(prev?.v) - 1,
          d: parseInt(prev?.d) + 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)) -
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)),
        }));
      } else {
        setTeam1((prev) => ({
          ...prev,
          p: parseInt(prev?.p) + 1,
          e: parseInt(prev?.e) + 1,
          d: parseInt(prev?.d) - 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)) -
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)),
        }));
        setTeam2((prev) => ({
          ...prev,
          p: parseInt(prev?.p) - 2,
          v: parseInt(prev?.v) - 1,
          e: parseInt(prev?.e) + 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)) -
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)),
        }));
      }
    } else {
      if (parseInt(editMatch?.goalTeam1) > parseInt(editMatch?.goalTeam2)) {
        setTeam1((prev) => ({
          ...prev,
          p: parseInt(prev?.p) + 2,
          v: parseInt(prev?.v) + 1,
          e: parseInt(prev?.e) - 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)) -
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)),
        }));
        setTeam2((prev) => ({
          ...prev,
          p: parseInt(prev?.p) - 1,
          e: parseInt(prev?.e) - 1,
          d: parseInt(prev?.d) + 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)) -
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)),
        }));
      } else if (
        parseInt(editMatch?.goalTeam1) < parseInt(editMatch?.goalTeam2)
      ) {
        setTeam1((prev) => ({
          ...prev,
          p: parseInt(prev?.p) - 1,
          e: parseInt(prev?.d) - 1,
          d: parseInt(prev?.d) + 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)) -
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)),
        }));
        setTeam2((prev) => ({
          ...prev,
          p: parseInt(prev?.p) + 2,
          v: parseInt(prev?.v) + 1,
          e: parseInt(prev?.v) - 1,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)) -
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)),
        }));
      } else {
        setTeam1((prev) => ({
          ...prev,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)) -
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)),
        }));
        setTeam2((prev) => ({
          ...prev,
          gm:
            parseInt(prev?.gm) +
            parseInt(editMatch?.goalTeam2) -
            parseInt(getMatch?.goalTeam2),
          gs:
            parseInt(prev?.gs) +
            parseInt(editMatch?.goalTeam1) -
            parseInt(getMatch?.goalTeam1),
          sg:
            parseInt(prev?.sg) +
            (parseInt(editMatch?.goalTeam2) - parseInt(getMatch?.goalTeam2)) -
            (parseInt(editMatch?.goalTeam1) - parseInt(getMatch?.goalTeam1)),
        }));
      }
    }

    props.onHide();
  }

  const handleGoalTeams = (e) => {
    setEditMatch({ ...editMatch, [e.target.name]: e.target.value });
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
          Editar Partida
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(e) => updateMatch(props.match?.id, e)}
          className={styles.form}
        >
          <label>
            {props.match?.team1}
            <input
              type="number"
              name="goalTeam1"
              onChange={handleGoalTeams}
              required="required"
              value={editMatch?.goalTeam1 || ""}
            />
          </label>
          <span>X</span>
          <label>
            <input
              type="number"
              name="goalTeam2"
              onChange={handleGoalTeams}
              required="required"
              value={editMatch?.goalTeam2 || ""}
            />
            {props.match?.team2}
          </label>
          <div>
            <button
              type="submit"
              className={styles.btn_save}
              disabled={disableSave}
              onClick={updateTeams}
            >
              Salvar
            </button>
            <button
              type="submit"
              className={styles.btn_update}
              disabled={disableUpdate}
              onClick={updateSameMatch}
            >
              Atualizar
            </button>
          </div>
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
export default EditMatch;
