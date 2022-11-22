import {useState, useEffect, useRef} from 'react';
import BoardView from "../views/BoardView.jsx";
import GameMenu from "../../GameMenu/GameMenu.jsx";

function BoardComponent(props){
    const [view, setView] = useState("GameMenu");
    const settings = useRef(JSON.parse(window.localStorage.getItem("tictaktoesettings")));

    useEffect(() => {
        console.log("rerender board comp");
    }, []);

    return (
        <>
            <BoardView 
                colNumber = {0 + settings.current.colNumber}
                fullRow = {0 + settings.current.fullRow}
                signs = {settings.current.playerSign2 + settings.current.playerSign1}
            />
        </>
    );
}

export default BoardComponent;