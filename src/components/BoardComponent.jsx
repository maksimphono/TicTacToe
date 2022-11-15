import {useState, useEffect} from 'react';
import BoardView from "../views/BoardView.jsx";
import GameMenu from "./GameMenu.jsx";
import $ from "jquery";

function BoardComponent(props){
    const [view, setView] = useState("GameMenu");

    useEffect(() => {
        console.log(view);
    }, [view]);
    switch (view){
        case "GameMenu":
            return (
                <div id="GameMenuDiv">
                    <GameMenu 
                        setView = {setView}
                    />
                </div>
                
            );
        case "Board":
            return (
                <div id={view}>
                    <BoardView
                    setView = {setView}
                    colNumber = {5}
                    />
                </div>
            )
    }

    
}

export default BoardComponent;