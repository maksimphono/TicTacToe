import {useState, useRef} from "react";
import {Button, Container, Modal, ModalBody, FormControl} from "react-bootstrap";
import {Form} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import $ from 'jquery';

const standartSigns = [..."XO🦊🐀🐵🦈🐠🐞🐝🌸🌻"];

function checkValidity(settings) {
    return settings.playerSign1 !== settings.playerSign2;
}

function ValidityAlert({hide, show}){
    return (
        <Modal show = {show}>
            <Modal.Header>
                <Modal.Title>
                    OOOOps...
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <p>Please, make sure all fields are set correctly</p>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant = "secondary" className = "border border-3 border-light w-25" onClick = {hide}>
                        Close
                    </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default function Settings(props) {
    const [showAlert, setShowAlert] = useState(false);
    const sinbolPlayer1 = useRef();
    const sinbolPlayer2 = useRef();
    const colNumber = useRef();
    const fullRow = useRef();
    const settings = useRef(JSON.parse(window.localStorage.getItem("tictaktoesettings")));

    const playerCustomizationChange = ({target}) => {
        const pl1 = $(sinbolPlayer1.current);
        const pl2 = $(sinbolPlayer2.current);
        const $target = $(target);

        if (pl1.val() === pl2.val()){
            $target.addClass("invalid");
        } else {
            pl1.removeClass("invalid");
            pl2.removeClass("invalid");
        }
    }

    const handleSumbmit = event => {
        event.preventDefault();
        const newSettings = {
            colNumber : $(colNumber.current).val() || 3,
            fullRow : $(fullRow.current).val() || 3,
            playerSign1 : $(sinbolPlayer1.current).val(),
            playerSign2 : $(sinbolPlayer2.current).val()
        }
        if (checkValidity(newSettings)) {
            window.localStorage.setItem("tictaktoesettings", JSON.stringify(newSettings));
            props.hide();
        } else {
            setShowAlert(true);
        }
    }

    return (
        <>
        <ValidityAlert 
            show = {showAlert}
            hide = {() => setShowAlert(false)}/>
        <Container className="d-flex justify-content-center align-items-around flex-column mt-3 w-75">
                <div className = "d-grid" style = {{gridTemplateColumns : "1fr 2fr 1fr"}}>
                    <Button
                        variant = "light"
                        className = "btn-outline-dark rounded-pill border border-3 border-dark w-50"
                        style = {{maxWidth: "max-content", height: "max-content", "fontSize" : "1.2rem", gridColumn: "1 / 2"}}
                        onClick = {props.hide}>
                        <i class="bi bi-arrow-left"></i>
                    </Button>
                    <h1 className = "d-flex justify-content-center">Settings</h1>
                </div>
                
                <Form 
                    className = "d-grid p-3"
                    style = {{gridTemplateColumns: "1fr 1fr", gap : "1rem"}}
                    onSubmit = {handleSumbmit}
                >
                    <Form.Group>
                        <Form.Label className = "h5">
                            Set number of rows at game field:
                        </Form.Label>
                        <FormControl 
                            type = "number" 
                            defaultValue = {+settings.current.colNumber} 
                            ref = {colNumber} 
                            placeholder = "3" 
                            min = "3" max = "7" />
                        <span>
                            Minimun value: 3, Maximum: 7
                        </span>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label className = "h5">
                            Set number of signs in row to win:
                        </Form.Label>
                        <FormControl 
                            type = "number" 
                            defaultValue = {+settings.current.fullRow} 
                            ref = {fullRow} 
                            placeholder = "3" 
                            min = "3" max = "7" />
                        <details>
                            <p>
                                Specify the length of the row of same elements to win. Default value: 3, Meximum value is 7 
                            </p>
                        </details>
                    </Form.Group>
                    <Form.Group className = "customize-player-1">
                        <Form.Label className = "h5">
                            Customize player 1:
                        </Form.Label>
                        <Form.Select name = "playerSign1" ref = {sinbolPlayer1} placeholder = "3" onChange = {playerCustomizationChange}>
                            {standartSigns.map((sign) => 
                                (sign == settings.current.playerSign1)?
                                    <option key = {sign} selected>
                                        {sign}
                                    </option>
                                    :<option key = {sign}>
                                    {sign}
                                    </option>
                            )}
                        </Form.Select>
                        <span>Select or enter any unicode character, you want to play</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className = "h5">
                            Customize player 2 (AI):
                        </Form.Label>
                        <Form.Select name = "playerSign2" ref = {sinbolPlayer2} placeholder = "3" onChange = {playerCustomizationChange}>
                            {standartSigns.map((sign) => 
                                (sign == settings.current.playerSign2)?
                                    <option key = {sign} selected>
                                        {sign}
                                    </option>
                                : <option key = {sign}>
                                    {sign}
                                </option>
                            )}
                        </Form.Select>
                        <span>Select or enter any unicode character, you want to play</span>
                    </Form.Group>
                    <div className = "d-flex justify-content-center" style = {{width: "auto", "grid-column": "1 / span 2"}}>
                        <Button className = "settings-submit-button game-menu" type="submit" style = {{"minWidth": "30%", width: "30%"}}>
                            Submit
                        </Button>
                    </div>
                    
                </Form>
        </Container>
        </>
    );
}