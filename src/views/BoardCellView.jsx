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
            setSign(props.signs[0]);
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