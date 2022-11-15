import {Outlet, Link} from "react-router-dom";
import {Container, Nav, Navbar} from 'react-bootstrap';
import "./css/App_style.scss";
import $ from "jquery";



export default function Layout() {
    const NavLinkCollapsed = function (props) {
        return <Link to = {props.to} className="nav-link" onClick={collapse}>{props.children}</Link>
    }
    const collapse = (e) => {
        const $toggler = $(".navbar-toggler");
        const $collapse = $(".navbar-collapse");
        
        $toggler.addClass("collapsed");
        $collapse.removeClass("show");
    };
    return (
        <div className = "d-flex flex-column justify-content-between" >
        <Navbar expand = "sm">
            <Container className = "w-75">
                <Navbar.Brand href = "/">
                    <i class="bi bi-grid-3x3"></i> Tic Tak Toe
                </Navbar.Brand>
                <Navbar.Toggle area-controls = "main-nav">
                </Navbar.Toggle>
                <Navbar.Collapse id = 'main-nav'>
                    <Nav className = "me-auto">
                        <NavLinkCollapsed to = "/">Menu</NavLinkCollapsed>
                        <NavLinkCollapsed to = "/Board">Start</NavLinkCollapsed>
                        <NavLinkCollapsed to = "/LogIn">Log In</NavLinkCollapsed>
                        <NavLinkCollapsed to = "/SignUp">Sign Up</NavLinkCollapsed>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Outlet />

        </div>
    );
}