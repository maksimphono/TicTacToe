import {Container, Col, Row} from "react-bootstrap";
import "../../css/UserDetails.scss";
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from "react-router-dom"; 

export default function UserDetails(props) {
    const {user, isAuthenticated} = useAuth0();

    if (isAuthenticated)
    return (
        <Container className = "d-grid container container-lg user-data-container">
            <div className = "user-img">
                <img />
            </div>
            <div className = "user-info">
                <h2>Hello,</h2><br />
                <h3>{user.email.slice(0, user.email.indexOf("@"))}</h3>
                <h4>Your email adress was user.email</h4>
            </div>
            <div className = "user-statistic">
                Your pie statistic
            </div>
            <div className = "user-statistic">User statistic here 2</div>
            <div className = "user-statistic">User statistic here 3</div>
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