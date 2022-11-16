import {useState, memo, useMemo, useRef, useCallback} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import BoardCellView from "./BoardCellView.jsx";
import HeaderLabel from "./Turn_of_label.jsx";
import placeOnBoard from "../../../testing_win.js";
import {WinnerView, DefaultGameOverView} from "./WinView.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/Board_style.scss";

function range(length){
    return Array.from({ length }, (_, i) => i); 
}

function Board(props){
    const row = range(props.colNumber);
    // Control States:
    const [signs, setSigns] = useState([...props.signs]);
    const [disableEvery, setDisableEvery] = useState(false);
    // Modals :
    const [showGameOver, setShowGameOver] = useState(false);
    const [showWinner, setshowWinner] = useState(false);
    // Static :
    const tictacmatrix = useMemo(() => (row.map(i => [...row.map(j => null)])), []);
    const fullRow = useMemo(() => props.fullRow, []);
    const colNumberSqr = useMemo(() => props.colNumber ** 2, []);
    const occupiedCellNum = useRef(0);
    
    const updateMatrix = useCallback(async (x, y) => {
        if (tictacmatrix[x][y] !== null) return false;

        if (placeOnBoard(tictacmatrix, x, y, signs[0], fullRow)){
            setshowWinner(true);
            setDisableEvery(true);
            return () => "win";
        }
        occupiedCellNum.current += 1;
        if (occupiedCellNum.current == colNumberSqr){
            setShowGameOver(true);

            return () => "gameover";
        }
        return () => setSigns([...signs.slice(1), signs.at(0)]);
    }, [signs]);

    return (
        <>
            <WinnerView
                show = {showWinner}
                disableAll = {showWinner}
                sign = {signs[0]}
                hide = {useCallback(() => setshowWinner(false), [])}
            />
            <DefaultGameOverView 
                show = {showGameOver}
                restart = {() => window.location.reload(true)}
                hide = {useCallback(() => setShowGameOver(false), [])}
            />

            <Container className="board-view">
                <h1 className="display-4 text-center">Tic Tak Toe</h1>
                <HeaderLabel signs={signs} />
                
                <Container className="d-grid justify-content-center mb-5 board-grid">
                {row.map((i) => {
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
    )
}

export default memo(Board);