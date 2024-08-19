import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NewTeam from "./components/pages/NewTeam";
import TeamLeague from "./components/pages/TeamLeague";
import TeamMatches from "./components/pages/TeamMatches";
import EditTeam from "./components/pages/EditTeam";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/NewTeam" element={<NewTeam />}></Route>
        <Route path="/teamLeague" element={<TeamLeague />}></Route>
        <Route path="/teamMatches" element={<TeamMatches />}></Route>
        <Route path="/editTeam/:id" element={<EditTeam />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
