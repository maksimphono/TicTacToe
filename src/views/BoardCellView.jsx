import { useEffect, useRef, useState, useMemo } from 'react';
import {Button} from "react-bootstrap";
import "../css/Cell_style.scss";
import $ from 'jquery';

function BoardCellView(props){
    const [sign, setSign] = useState('');
    const selfRef = useRef('');
    const handleClick = event => {
        const rotate = props.updateMatrix(props.x, props.y)
        rotate && setSign(props.signs[0]);
        rotate.then(res => res());
    };

    useEffect(() => {
        const $self = $(selfRef.current);
        //sign && $self.attr("disabled", "true")
        const height = $self.height();
        console.log("Height : ", height);
        $self.css("font-size", `${height - 10}px`);
    }, [sign]);

    return (
        <>
            <Button 
                ref = {selfRef}
                className="btn-secondary"
                variant="outline-dark"
                onhandleClick = {handleClick}>
                <span>{sign}</span>
            </Button>
        </>
    );
}

export default BoardCellView;