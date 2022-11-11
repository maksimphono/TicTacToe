import {useState, useRef, useMemo} from 'react';
import BoardCellView from "./BoardCellView.jsx";
import {Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import placeOnBoard from "../testing_win.js";

function range(length){
    return Array.from({ length }, (_, i) => i); 
}


function Board(props){
    const row = range(props.colNumber);
    const signs = useMemo(() => [..."🐊🔥"]);
    const tictacmatrix = useMemo(() => (row.map(i => [...row.map(j => null)])), []);
    console.log(props.playerNum);

    const updateMatrix = (x, y) => {
        if (tictacmatrix[x][y] !== null) return false;
        console.log("REady to place ", signs[0]);
        if (placeOnBoard(tictacmatrix, x, y, signs[0]))
            alert(signs[0] + " Won!!!");
        
        return new Promise((res) => (res(() => signs.push(signs.shift()))));
    }

    return (
        <>
            <h1>Board View</h1>
            <Container className="d-grid justify-content-center mb-5" style={{gap: "1vw"}}>
            {console.log("Row : ", row)}
            {row.map((i) => {
                {console.log("Render Col with i = ", i)}
                return (<Row key = {i}>
                    {row.map(j => (
                        <Col style={{"margin-right": "1vw", padding: "0"}} key = {i * 10 + j} className="d-grid">
                            <BoardCellView
                                x = {i} 
                                y = {j}
                                signs = {signs}
                                updateMatrix = {updateMatrix}
                             />
                        </Col>
                    ))}
                </Row>)
            })}
            </Container>
        </>
    );
}

export default Board;