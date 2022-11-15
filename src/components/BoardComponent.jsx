import {useState, useEffect} from 'react';
import BoardView from "../views/BoardView.jsx";
import GameMenu from "./GameMenu.jsx";
import $ from "jquery";

function BoardComponent(props){
    const [view, setView] = useState("GameMenu");

    useEffect(() => {
        console.log(view);
    }, [view]);

    return (
        <>
            <BoardView colNumber = {4}/>
        </>
    );
}

export default BoardComponent;