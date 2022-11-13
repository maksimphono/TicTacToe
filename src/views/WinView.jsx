import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {memo, useState, useCallback} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css";

export default function GameOverView(props) {
    const handleClose = e => {props.hide();};

    return (
        <Modal show={props.show} backdrop="static" onHide={useCallback(props.hide)}>
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
                    onClick={useCallback(props.hide)}>
                    Yeayyyyyy!!{props.sign}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};