import {useState} from 'react';
import BoardView from "../views/BoardView.jsx";
import GameMenu from "./GameMenu.jsx";

function BoardComponent(props){
    const [view, setView] = useState("GameMenu");

    switch (view){
        case "GameMenu":
            return (
                <>
                    <GameMenu>
                    </GameMenu>
                </>
            );
        case "Board":
            return ( 
                <BoardView
                show = {view === "Board"}
                colNumber = {props.colNumber}
                playerNum = {props.playerNum}
                />
            )
    }

    
}

export default BoardComponent;