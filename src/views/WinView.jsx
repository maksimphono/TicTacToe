import {memo, useCallback} from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const DefaultGameOverView = memo(function (props){
    return (
        <Modal show={props.show} backdrop="static" onHide={useCallback(props.hide)}>
            <Modal.Header>
                <Modal.Title>
                    <h1>Game Over</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Sorry, no more space left{"😔"}</h2>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={useCallback(props.restart, [])}>
                    Restart
                </Button>
                <Button
                    variant="secondary"
                    onClick={useCallback(props.hide, [])}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export const WinnerView = memo(function (props) {
    return (
        <Modal show={props.show} backdrop="static" onHide={useCallback(props.hide, [])}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1>We got a winner!!</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>{props.sign} won!!</h2>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={useCallback(props.hide, [])}>
                    Yeayyyyyy!!{props.sign}
                </Button>
            </Modal.Footer>
        </Modal>
    );
});