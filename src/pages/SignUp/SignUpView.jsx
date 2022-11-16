import {Form, FormControl, Container, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function LogInView(props){
    return (
        <Container className = "mt-3">
            <div className = "d-grid" style = {{gridTemplateColumns : "1fr 2fr 1fr"}}>
                    <Link to = "/">
                        <Button
                            variant = "light"
                            className = "btn-outline-dark rounded-pill border border-3 border-dark w-50"
                            style = {{maxWidth: "max-content", height: "max-content", "fontSize" : "1.2rem", gridColumn: "1 / 2"}}
                            >
                        
                        <i class="bi bi-arrow-left"></i>
                        </Button>
                    </Link>
                    <h1 className = "d-flex justify-content-center">Sign Up</h1>
            </div>
        </Container>
    )
}