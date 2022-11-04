import {useState} from 'react';

import BoardView from "../views/BoardView.jsx";

function BoardComponent(props){
    console.log("Render Board component");
    return (
        <>
            <h1 className = "display-5">Here is your board:</h1>
            <BoardView
                colNumber = {props.colNumber}
            />
        </>
    );
}

export default BoardComponent;