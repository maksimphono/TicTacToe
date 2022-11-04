import {useState} from 'react';
import {Button} from "react-bootstrap";
import "../css/Cell_style.scss";

function BoardCellView(props){
    const click = event => {
        alert("Click");
    };
    console.log("Render Cell");
    return (
        <>
            <Button className="btn-secondary" variant="outline-dark" />
        </>
    );
}

export default BoardCellView;