import {useState} from 'react';
import BoardCellView from "./BoardCellView.jsx";

function Board(props){
    return (
        <>
        <h1>Board View</h1>
        <BoardCellView />
        </>
    );
}

export default Board;