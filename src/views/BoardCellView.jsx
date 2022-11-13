import { useEffect, useRef, useState, useMemo } from 'react';
import {Button} from "react-bootstrap";
import "../css/Cell_style.scss";
import $ from 'jquery';

function BoardCellView(props){
    const [sign, setSign] = useState('');
    const selfRef = useRef('');
    
    const handleClick = async (event) => {
        const rotate = await props.updateMatrix(props.x, props.y);

        if (rotate){
            $(selfRef.current).css({transform : "scaleX(.05)"});
            setTimeout(() => {setSign(props.signs[0]); $(selfRef.current).css({transform : "scaleX(1)"})}, 500);
            rotate();
        }
    };

    useEffect(() => {
        const $self = $(selfRef.current);
        const height = $self.height();
        $self.css("font-size", `${height * .8}px`);
    }, [sign]);

    return (
        <>
            <Button
                style={{transform : "rotate(0)"}}
                ref = {selfRef}
                className="btn-secondary tictakcell"
                variant="outline-dark"
                onClick = {handleClick}>
                <span>{sign}</span>
            </Button>
        </>
    );
}

export default BoardCellView;