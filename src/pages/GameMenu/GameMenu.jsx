import {useState} from "react";
import {Button, ButtonGroup, Container} from "react-bootstrap";
import "../../css/GameMenu_style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import $ from "jquery";

export default function GameMenu(props) {
    const handleClick = ({target}) => {
        let $self = $(target);

        props.setView($self.val());
    }

    return (
        <Container className="d-flex justify-content-around align-items-center flex-column" style={{height: "80vh"}}>
                <div className = "p-3"><h1>Wellcome to Tic Tak Toe Game</h1></div>
                <div className = "d-flex gap-1 flex-column align-items-center">
                    <button className = "game-menu" value = "Board" onClick = {handleClick}>
                        <i className="bi bi-controller"></i> Start
                    </button>
                    <button value = "Settings" className = "game-menu">
                        <i className="bi bi-gear"></i> Settings
                    </button>
                    <ButtonGroup>
                        <button value = "LogIn" className="d-flex justify-content-between align-items-center px-3 gap-1 game-menu">
                            <i className="bi bi-door-open"></i>
                            <span>Log In</span>
                        </button>
                        <button value = "SignUp" className="d-flex justify-content-between align-items-center px-3 gap-1 game-menu">
                            <i className="bi bi-person-plus"></i>
                            <span>Sign Up</span>                   
                        </button>
                    </ButtonGroup>
                    
                </div>
        </Container>
    );
}