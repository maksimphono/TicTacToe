import {Container, Col, Row} from "react-bootstrap";
import "../../css/UserDetails.scss";
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from "react-router-dom"; 

export default function UserDetails(props) {
    const {user, isAuthenticated, logout} = useAuth0();

    if (isAuthenticated)
    return (
        <Container className = "d-grid container container-lg user-data-container">
            <div className = "user-img">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
            </svg>
            </div>
            <div className = "user-info">
                <h2>Hello,</h2><br/>
                <h3>{user.email.slice(0, user.email.indexOf("@"))}</h3>
                <h4>Your email adress was {user.email}</h4>
            </div>
            <button 
                className = "game-menu"
                onClick = {() => logout({returnTo: window.location.origin})}>
                    Log Out
            </button>
        </Container>
    )
    else 
        return (
        <Container className = "d-flex justify-content-around align-items-center flex-column gap-5 w-75 not-auth-container">
            <h1 className = "display-3">You don't supposed to be here!!</h1>
            <h1 className = "display-5">Soory, you are not authenticated yet</h1>
            <Link className = "game-menu" to = "/"><i className = "bi bi-door-closed"></i>Back to main menu</Link>
        </Container>
    );
}