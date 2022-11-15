import {useState} from "react";
import {Button, ButtonGroup, Container} from "react-bootstrap";
import "../css/GameMenu_style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function GameMenu(props) {
    const [settings, changeSettings] = useState({});

    return (
        <Container className="d-flex justify-content-around align-items-center flex-column">
                <div className = "p-3"><h1>Wellcome to Tic Tak Toe Game</h1></div>
                <div className = "d-flex gap-1 flex-column align-items-center">
                    <button variant="dark">
                        Start
                    </button>
                    <button variant="dark">
                        Settings
                    </button>
                    <ButtonGroup>
                        <button className="d-flex justify-content-between align-items-center px-3 gap-1">
                            <i class="bi bi-door-open"></i>
                            <span>Log In</span>
                        </button>
                        <button className="d-flex justify-content-between align-items-center px-3 gap-1">
                            <i className="bi bi-person-plus"></i>
                            <span>Sign Up</span>                   
                        </button>
                    </ButtonGroup>
                    
                </div>
        </Container>
    );
}