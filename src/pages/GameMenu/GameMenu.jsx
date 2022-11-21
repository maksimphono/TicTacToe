import {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import {Button, ButtonGroup, Container} from "react-bootstrap";
import Settings from "../SettingsComponent/Settings.jsx"
import "../../css/GameMenu_style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function GameMenu(props) {
    const [settingsActive, setSettingsActive] = useState(false);
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!window.localStorage.getItem("tictaktoesettings"))
            window.localStorage.setItem("tictaktoesettings", JSON.stringify({
                colNumber : 3,
                fullRow : 3,
                playerSign1 : "X",
                playerSign2 : "O"
            }));
    }, []);

    if (settingsActive) {
        return <Settings hide = {() => setSettingsActive(false)} />
    } else 
    return (
        <Container className="d-flex justify-content-around align-items-center flex-column" style={{height: "80vh"}}>
                <div className = "p-3"><h1>Wellcome to Tic Tak Toe Game</h1></div>
                <div className = "d-flex gap-1 flex-column align-items-center">
                    <Link className = "game-menu" to="/Board">
                        <i className="bi bi-controller"></i> Start
                    </Link>
                    <button className = "game-menu" onClick = {() => setSettingsActive(true)}>
                        <i className="bi bi-gear"></i> Settings
                    </button>
                    {isAuthenticated && 
                        <ButtonGroup>
                            <button 
                                className="d-flex justify-content-between align-items-center px-3 gap-1 game-menu"
                                onClick = {() => logout({returnTo : window.location.origin})}>
                                <i className="bi bi-door-closed"></i>
                                <span>Log Out</span>
                            </button>
                            <Link
                                className="d-flex justify-content-between align-items-center px-3 gap-1 game-menu"
                                to = "/UserDetails">
                                <i className="bi bi-person"></i>
                                <span>Account</span>                   
                            </Link>
                        </ButtonGroup>
                        ||
                        <ButtonGroup>
                            <button 
                                className="d-flex justify-content-between align-items-center px-3 gap-1 game-menu"
                                onClick = {() => loginWithRedirect()}>
                                <i className="bi bi-door-open"></i>
                                <span>Log In</span>
                            </button>
                            <button
                                className="d-flex justify-content-between align-items-center px-3 gap-1 game-menu"
                                to = "/SignUp"
                                onClick = {() => loginWithRedirect()}>
                                <i className="bi bi-person-plus"></i>
                                <span>Sign Up</span>                   
                            </button>
                        </ButtonGroup>
                    }
                    
                </div>
        </Container>
    );
}