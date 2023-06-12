import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Accueil from "./Page/Accueil/Accueil";
import Communaute from "./Page/Communaute/Communaute";
import Profil from "./Page/Profil/Profil";
import Reglages from "./Page/Reglages/Reglages";
import Notfound from "./Page/NotFound/Notfound";
import Header from "./Component/Header/Header";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Accueil />} />
        {/* <Route path="/:userId" element={<Accueil />} /> case id param required in url and not in user session */}
        <Route path="/communaute" element={<Communaute />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/reglages" element={<Reglages />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
