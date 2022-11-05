import {useState, useRef} from 'react';
import BoardCellView from "./BoardCellView.jsx";
import {Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function range(length){
    return Array.from({ length }, (_, i) => i); 
}


function Board(props){
    const row = range(props.colNumber);
    const [signs, setSigns] = useState([..."XO"]);
    
    const tictacmatrix = row.map(i => [...row.map(j => '')]);
    
    const updateMatrix = (x, y) => {
        tictacmatrix[x][y] = signs[0];
        signs.push(signs.shift());
    }
    
    console.table(tictacmatrix);

    return (
        <>
            <h1>Board View</h1>
            <Container className="d-grid justify-content-center" style={{gap: "1vw"}}>
            {console.log("Row : ", row)}
            {row.map((i) => {
                {console.log("Render Col with i = ", i)}
                return (<Row key = {i}>
                    {row.map(j => (
                        <Col style={{"margin-right": "1vw", padding: "0"}} key = {i * 10 + j} className="d-grid">
                            <BoardCellView
                                x = {i} 
                                y = {j}
                                sign = {signs}
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