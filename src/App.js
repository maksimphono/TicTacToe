import BoardComponent from "./pages/Board/components/BoardComponent.jsx";
import LogInView from "./pages/LogIn/LogInVIew.jsx";
import SignUpView from "./pages/SignUp/SignUpView.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import GameMenu from "./pages/GameMenu/GameMenu.jsx";
import UserDetails from "./pages/UserDetails/UserDetails.jsx";
import Layout from "./Layout.js";
import Settings from "./pages/SettingsComponent/Settings.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import {domain, clientId} from "./secret_codes.js";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("render App");
  }, []);
  return (
      <Auth0Provider
        domain = {domain}
        clientId = {clientId}
        redirectUri={window.location.origin}
      >
        <BrowserRouter>
          <Routes>
          <Route path="/" element = {<Layout />}>
            <Route index element = {<GameMenu />} />
            <Route path="Board" element = {
              <BoardComponent
              />
            }
            />
            <Route path="LogIn" element = {<LogInView />} />
            <Route path="SignUp" element = {<SignUpView />} />
            <Route path="Userdetails" element = {<UserDetails />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
  );
}

export default App;
