import { useEffect, useRef, useState } from 'react';
import {Button} from "react-bootstrap";
import "../css/Cell_style.scss";
import $ from 'jquery';

function BoardCellView(props){
    const [sign, setSign] = useState('');
    const selfRef = useRef("");
    const click = event => {
        setSign(props.signs[0]);
        props.updateMatrix(props.x, props.y);
        console.log(`Sim ${props.sign} on Cords:  ${props.x}, ${props.y}`);
    };

    useEffect(() => {
        const $self = $(selfRef.current);
        sign && $self.attr("disabled", "true")
        const height = $self.height();
        console.log("Height : ", height);
        $self.css("font-size", height / 1.5);
    }, [sign]);

    return (
        <>
            <Button ref = {selfRef} className="btn-secondary" variant="outline-dark" onClick = {click}>{sign}</Button>
        </>
    );
}

export default BoardCellView;