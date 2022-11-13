import {useState} from 'react';

import BoardView from "../views/BoardView.jsx";

function BoardComponent(props){
    return (
        <>
            <BoardView
                colNumber = {props.colNumber}
                playerNum = {props.playerNum}
            />
        </>
    );
}

export default BoardComponent;