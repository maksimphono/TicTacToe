import BoardComponent from "./pages/Board/components/BoardComponent.jsx";
import LogInView from "./pages/LogIn/LogInVIew.jsx";
import SignUpView from "./pages/SignUp/SignUpView.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import GameMenu from "./pages/GameMenu/GameMenu.jsx";
import UserDetails from "./pages/UserDetails/UserDetails.jsx";
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
          <Route path="LogIn" element = {<LogInView />} />
          <Route path="SignUp" element = {<SignUpView />} />
          <Route path="Userdetails" element = {<UserDetails />} />
        </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
