import BoardComponent from "./pages/Board/components/BoardComponent.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import GameMenu from "./pages/GameMenu/GameMenu.jsx";
import Layout from "./Layout.js";
import Settings from "./pages/SettingsComponent/Settings.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element = {<Layout />}>
          <Route index element = {<GameMenu />} />
          <Route path="Board" element = {
            <BoardComponent
              colNumber = {4}
              playerNum = {2}
            />
          } 
          />
          <Route path="Settings" element = {<Settings />} />
        </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
