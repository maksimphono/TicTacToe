import {Form, Container, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useRef, FormControl, useState} from "react";
import ValidityAlert from "../AdditionComponents/FormInvalidAlert.jsx";
import "../../css/SignUp_style.scss";
import $ from "jquery";

const MAX_NICNAME_LENGTH = 5;
const MIN_NICNAME_LENGTH = 2;
const MAX_PASSWORD_LENGTH = 10;
const MIN_PASSWORD_LENGTH = 4;

function checkValidity(data) {
    return (
        data.nicname.length <= MAX_NICNAME_LENGTH &&
        data.password === data.passwordAgain &&
        data.password.length <= MAX_PASSWORD_LENGTH &&
        data.password.length >= MIN_PASSWORD_LENGTH
    )
}

export default function LogInView(props){
    const [showAlert, setShowAlert] = useState(false);
    const nicnameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const passwordAgainInput = useRef();

    const onSubmit = (event) => {
        const data = {
            nicname : $(nicnameInput.current).val(),
            email : $(emailInput.current).val(),
            password: $(passwordInput.current).val(),
            passwordAgain : $(passwordAgainInput.current).val(),
        };
        const form = event.target;
        console.table(data);
        
        if (!form.checkValidity()) {
            setShowAlert(true);
            alert(showAlert);
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleSubmit = ({target}) => {
        
    }

    return (
        <>
        <ValidityAlert 
            show = {showAlert}
            hide = {() => setShowAlert(false)}/>
        <Container className = "mt-3">
            <div className = "d-grid" style = {{gridTemplateColumns : "1fr 2fr 1fr"}}>
                <Link to = "/">
                    <Button
                        variant = "light"
                        className = "btn-outline-dark rounded-pill border border-3 border-dark w-50"
                        style = {{maxWidth: "max-content", height: "max-content", "fontSize" : "1.2rem", gridColumn: "1 / 2"}}
                    >
                    <i className="bi bi-arrow-left"></i>
                    </Button>
                </Link>
                <h1 className = "d-flex justify-content-center">Sign Up</h1>
            </div>
            <Form className = "d-flex align-items-center flex-column gap-3 sign-up-form" onSubmit = {onSubmit}>
                <Form.Group>
                    <Form.Label className = "h5">
                        Enter your email
                    </Form.Label>
                    <Form.Control
                        type = "email"
                        ref = {emailInput}
                    />
                    <span>Don't worry, it will only be used in case you forget you password</span>
                </Form.Group>
                <Form.Group>
                    <Form.Label className = "h5">
                        Enter your nicname
                    </Form.Label>
                    <Form.Control
                        ref = {nicnameInput}
                        max = {MAX_NICNAME_LENGTH}
                        min = {MIN_NICNAME_LENGTH}
                        type = "text"
                        required
                        //onChange = {handleChange}
                    />
                    <span>How do you wanna be called inside the game</span>
                </Form.Group>
                <Form.Group>
                    <Form.Label className = "h5">
                        Enter your password
                    </Form.Label>
                    <Form.Control
                        ref = {passwordInput}
                        type = "password"
                        max={MAX_PASSWORD_LENGTH}
                        min={MIN_PASSWORD_LENGTH}
                        required
                    />
                    <Form.Control.Feedback type = "invalid">
                        Password must be from 4 to 10 simbols length
                    </Form.Control.Feedback>   
                </Form.Group>
                <Form.Group className = "h5">
                    <Form.Label>
                        Enter your password again
                    </Form.Label>
                    <Form.Control
                        ref = {passwordAgainInput}
                        max = {MAX_PASSWORD_LENGTH}
                        min = {MIN_PASSWORD_LENGTH}
                        type = "password"
                        required
                    />
                </Form.Group>
                <Button
                    variant = "primary"
                    type = "submit"
                    className = "align-self-center w-25 game-menu"
                >
                    Submit
                </Button>
            </Form>
        </Container>
        </>
    )
}