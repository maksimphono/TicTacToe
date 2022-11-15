import {useState} from "react";
import {Button, ButtonGroup, Container} from "react-bootstrap";
import "../css/GameMenu_style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function GameMenu(props) {
    const [settings, changeSettings] = useState({});

    return (
        <Container className="d-flex justify-content-around align-items-center flex-column">
                <div className = "p-3"><h1>Settings</h1></div>
                
        </Container>
    );
}