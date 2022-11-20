import {Container, Col, Row} from "react-bootstrap";
import "../../css/UserDetails.scss";

export default function UserDetails(props) {
    return (
        <Container className = "d-grid container container-lg user-data-container">
            <div className = "user-img">
                <img />
            </div>
            <div className = "user-info">
                <h2>Hello,</h2><br />
                <h3>nicname</h3>
                <h4>I know you email: email@mail.com</h4>
            </div>
            <div className = "user-statistic">User statistic here 1</div>
            <div className = "user-statistic">User statistic here 2</div>
            <div className = "user-statistic">User statistic here 3</div>
        </Container>
    );
}