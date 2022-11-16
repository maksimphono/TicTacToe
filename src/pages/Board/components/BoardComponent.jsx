import {useState, useEffect, useRef} from 'react';
import BoardView from "../views/BoardView.jsx";
import GameMenu from "../../GameMenu/GameMenu.jsx";

function BoardComponent(props){
    const [view, setView] = useState("GameMenu");
    const settings = useRef(JSON.parse(window.localStorage.getItem("tictaktoesettings")));

    useEffect(() => {
        console.table(settings);
    }, [])

    useEffect(() => {
        console.log(view);
    }, [view]);

    return (
        <>
            <BoardView 
                colNumber = {0 + settings.current.colNumber}
                fullRow = {0 + settings.current.fullRow}
                signs = {settings.current.playerSign1 + settings.current.playerSign2}
            />
        </>
    );
}

export default BoardComponent;