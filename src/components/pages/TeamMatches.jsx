import { useState, useEffect } from "react";
import NavLeague from "../layouts/NavLeague";
import styles from "./TeamMatches.module.css";
import AddMatch from "../modal/AddMatch";
import EditMatch from "../modal/EditMatch";
import AddButton from "../layouts/AddButton";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import Footer from "../layouts/Footer";

function TeamMatches() {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [teams, setTeams] = useState([]);
  const [getMatches, setgetMatches] = useState([]);
  const [match, setMatch] = useState();
  const location = useLocation();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getTeamMatches() {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/matches`);
        setgetMatches(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getTeamMatches();
  }, [location.key]);

  useEffect(() => {
    async function getTeams() {
      try {
        const response = await axios.get(`${apiUrl}/teams`);
        setTeams(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getTeams();
  }, []);

  function getMatchId(match) {
    setMatch(match);
    setModalEditShow(true);
  }

  function removeMatch(id) {
    axios.delete(`${apiUrl}/matches/${id}`);
    setgetMatches(getMatches.filter((match) => match.id !== id));
  }
  return (
    <section className={styles.matches_section}>
      <NavLeague btn1Clicked="btn" btn2Clicked="btn_clicked" />
      {loading ? (
        <p className={styles.loading}>Carregando...</p>
      ) : (
        <>
          <div className={styles.btn_container}>
            <AddButton
              text="Criar Partida"
              addMatch={() => setModalShow(true)}
            />
          </div>
          <div className={styles.matches_container}>
            {getMatches.length === 0 ? (
              <p></p>
            ) : (
              <p>Selecione a partida para editá-la</p>
            )}
            <AddMatch
              teams={teams}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />

            <EditMatch
              match={match}
              show={modalEditShow}
              onHide={() => setModalEditShow(false)}
            />

            <div className={styles.matches_area}>
              {getMatches.length === 0 ? (
                <p>Não há pártidas definidas</p>
              ) : (
                getMatches.map((match, index) => (
                  <div className={styles.match_area} key={index}>
                    <div
                      key={index}
                      className={styles.match}
                      onClick={() => getMatchId(match)}
                    >
                      <div>
                        <p>P{index + 1} |</p>
                      </div>
                      <p>
                        <span>{match.team1}</span>
                        <span>
                          {match.goalTeam1 || ""} X {match.goalTeam2 || ""}
                        </span>
                        <span>{match.team2}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeMatch(match.id)}
                      className={styles.deleteBtn}
                    >
                      <BsFillTrashFill />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
      <Footer />
    </section>
  );
}
export default TeamMatches;
