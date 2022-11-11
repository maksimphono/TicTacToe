import {useState, memo, useMemo} from 'react';
import BoardCellView from "./BoardCellView.jsx";
import {Container, Row, Col} from "react-bootstrap";
import TurnOfLabel from "./Turn_of_label.jsx";       
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Board_style.scss";
import placeOnBoard from "../testing_win.js";
import { useEffect } from 'react';

function range(length){
    return Array.from({ length }, (_, i) => i); 
}

const areEq = (prev, next) => (true);

function Board(props){
    const row = range(props.colNumber);
    const [signs, setSigns] = useState([..."🐊🔥"]);
    const tictacmatrix = useMemo(() => (row.map(i => [...row.map(j => null)])), []);
    console.log(props.playerNum);

    const updateMatrix = (x, y) => {
        if (tictacmatrix[x][y] !== null) return false;
        console.log("REady to place ", signs[0]);
        if (placeOnBoard(tictacmatrix, x, y, signs[0]))
            alert(signs[0] + " Won!!!");
        return new Promise((res) => (res(() => setSigns([...signs.slice(1), signs.at(0)]))));
    }

    return (
        <Container className="board-view">
            
            <TurnOfLabel signs={signs} />
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
        </Container>
    );
}

export default memo(Board, areEq);