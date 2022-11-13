import {useState} from 'react';

import BoardView from "../views/BoardView.jsx";

function BoardComponent(props){
    console.log("Render Board component");
    const [showGameOver, setShowGameOver] = useState(false);

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