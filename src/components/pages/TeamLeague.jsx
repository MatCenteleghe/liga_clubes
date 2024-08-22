import styles from "./TeamLeague.module.css";
import Footer from "../layouts/Footer";
import LinkButton from "../layouts/LinkButton";
import NavLeague from "../layouts/NavLeague";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function TeamLeague() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getTeams() {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/teams`);
        //const data = response.data;
        setTeams(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    getTeams();
  }, []);

  function removeTeam(id) {
    axios.delete(`${apiUrl}/teams/${id}`);
    setTeams(teams.filter((team) => team.id !== id));
  }

  function orderTeams(teams) {
    return teams.sort((a, b) => {
      if (a.p > b.p) {
        return -1;
      } else if (a.p == b.p && a.sg > b.sg) {
        return -1;
      } else {
        return true;
      }
    });
  }

  function render() {
    orderTeams(teams);
  }

  return (
    <section className={styles.league_section}>
      <NavLeague btn1Clicked="btn_clicked" btn2Clicked="btn" />
      <div className={styles.addTeamButton}>
        <LinkButton to="/NewTeam" text="+ times" btnStyle="btn" />
      </div>
      <div className={styles.table_container}>
        {render()}
        {loading ? (
          <p className={styles.loading}>Carregando...</p>
        ) : (
          <Table responsive size="sm" border="2px">
            <thead>
              <tr className={styles.table_columns}>
                <th scope="col">Time</th>
                <th scope="col">PTS</th>
                <th scope="col">PJ</th>
                <th scope="col">V</th>
                <th scope="col">E</th>
                <th scope="col">D</th>
                <th scope="col">GP</th>
                <th scope="col">GC</th>
                <th scope="col">SG</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>

            {teams.length === 0 ? (
              <tbody>
                <tr>
                  <th>Não há times adicionados...</th>
                </tr>
              </tbody>
            ) : (
              teams.map((team, index) => (
                <tbody key={team.id}>
                  <tr className={styles.table_columns}>
                    <td className={styles.table}>{`${index + 1} | ${
                      team.name
                    }`}</td>
                    <td>{team.p}</td>
                    <td>{team.j}</td>
                    <td>{team.v}</td>
                    <td>{team.e}</td>
                    <td>{team.d}</td>
                    <td>{team.gm}</td>
                    <td>{team.gs}</td>
                    <td>{team.sg}</td>
                    <td className={styles.btn_table}>
                      <button
                        onClick={() => removeTeam(team.id)}
                        className={styles.deleteTeamButton}
                      >
                        <BsFillTrashFill />
                      </button>
                      <Link to={`/editTeam/${team.id}`}>
                        <button className={styles.editTeamButton}>
                          <BsPencil />
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))
            )}
          </Table>
        )}
      </div>
      <Footer />
    </section>
  );
}
export default TeamLeague;
