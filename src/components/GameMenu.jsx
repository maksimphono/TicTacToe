import {useState} from "react";
import {Button, ButtonGroup, Container} from "react-bootstrap";
import "../css/GameMenu_style.scss";

export default function GameMenu(props) {
    const [settings, changeSettings] = useState({});

    return (
        <Container className="d-flex justify-content-around align-items-center flex-column">
                <h1>Wellcome to Tic Tak Toe Game</h1>
                <div className = "d-grid gap-1 m-3">
                    <Button variant="dark">
                        Start
                    </Button>
                    <Button variant="dark">
                        Settings
                    </Button>
                    <ButtonGroup>
                        <Button variant = "outline-dark">
                            Log In
                        </Button>
                        <Button variant = "outline-dark">
                            Sign Up                    
                        </Button>
                    </ButtonGroup>
                    
                </div>
        </Container>
    );
}