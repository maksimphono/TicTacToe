import {useState, useRef} from 'react';
import BoardCellView from "./BoardCellView.jsx";
import {Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function range(length){
    return Array.from({ length }, i => i); 
}

function Board(props){
    const row = useRef(range(props.colNumber));
    console.log("Render board View. Col: ", props.colNumber);
    return (
        <>
            <h1>Board View</h1>
            <Container className="d-grid justify-content-center" style={{gap: "1vw"}}>
            {row.current.map((i) => (
                <Row key = {i}>
                    {row.current.map(j => (
                        <Col style={{"margin-right": "1vw", padding: "0"}} key = {i * 10 + j} className="d-grid">
                            <BoardCellView />
                        </Col>
                    ))}
                </Row>
            ))}
            </Container>
        </>
    );
}

export default Board;