import {useState, memo, useMemo, useRef} from 'react';
import BoardCellView from "./BoardCellView.jsx";
import {Container, Row, Col} from "react-bootstrap";
import HeaderLabel from "./Turn_of_label.jsx";
import placeOnBoard from "../testing_win.js";
import { useEffect } from 'react';
import {WinnerView, DefaultGameOverView} from "./WinView.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Board_style.scss";

function range(length){
    return Array.from({ length }, (_, i) => i); 
}

function Board(props){
    const row = range(props.colNumber);
    // Control States:
    const [signs, setSigns] = useState([..."🐊🔥"]);
    const [disableEvery, setDisableEvery] = useState(false);
    // Modals :
    const [showGameOver, setShowGameOver] = useState(false);
    const [showWinner, setshowWinner] = useState(false);
    // Static :
    const tictacmatrix = useMemo(() => (row.map(i => [...row.map(j => null)])), []);
    const fullRow = useMemo(() => Math.min(props.colNumber, 4), []);
    const colNumberSqr = useMemo(() => props.colNumber ** 2, []);
    const occupiedCellNum = useRef(0);
    
    const updateMatrix = async (x, y) => {
        if (tictacmatrix[x][y] !== null) return false;

        if (placeOnBoard(tictacmatrix, x, y, signs[0], fullRow)){
            setshowWinner(true);
            setDisableEvery(true);
            return () => "win";
        }
        occupiedCellNum.current += 1;
        console.log("occupiedCellNum : ", occupiedCellNum.current);
        if (occupiedCellNum.current == colNumberSqr){
            setShowGameOver(true);
            alert("Default")
            return () => "gameover";
        }
        return () => setSigns([...signs.slice(1), signs.at(0)]);
    }

    return (
        <>
            <WinnerView
                show = {showWinner}
                disableAll = {showWinner}
                sign = {signs[0]}
                hide = {() => setshowWinner(false)}
            />
            <DefaultGameOverView 
                show = {showGameOver}
                restart = {() => window.location.reload(true)}
                hide = {() => setShowGameOver(false)}
            />

            <Container className="board-view">
                <h1 className="display-4 text-center">Tic Tak Toe</h1>
                <HeaderLabel signs={signs} />
                <Container className="d-grid justify-content-center mb-5 board-grid">
                {row.map((i) => {
                    {console.log("Render Col with i = ", i)}
                    return (<Row key = {i}>
                        {row.map(j => (
                            <Col style={{"width": "max-content", padding: "0"}} key = {i * 10 + j} className="d-grid">
                                <BoardCellView
                                    x = {i} 
                                    y = {j}
                                    signs = {signs}
                                    disable = {disableEvery}
                                    updateMatrix = {updateMatrix}
                                />
                            </Col>
                        ))}
                    </Row>)
                })}
                </Container>
            </Container>
        </>
    );
}

export default Board;