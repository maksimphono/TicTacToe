import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import {Button} from "react-bootstrap";
import "../../../css/Cell_style.scss";
import $ from 'jquery';

function BoardCellView(props){
    const [sign, setSign] = useState('');
    const selfRef = useRef();
    const cellTransitionTime = useMemo(() => 0.5, []);
    let rotateCallback = useRef(() => null);

    useEffect(() => {
        props.clickMatrix[props.x][props.y] = handleClick;
        const height = $(selfRef.current).height();
        $(selfRef.current).css({transition: cellTransitionTime + 's', "font-size" : `${height * .8}px`});
    }, []);

    const handleClick = useCallback(async (event) => {
        if (props.disable) return;
        //const rotate = await props.updateMatrix(props.x, props.y);
        const $self = $(selfRef.current);
        const rotate = await props.updateMatrix(props.x, props.y);

        if (rotate){
            //console.log("rotate:", rotate);
            $self.css({transform : "scaleX(.05)"});

            setTimeout(() => {
                setSign(props.signs[0]); 
            }, cellTransitionTime * 1000);
            
        }
        rotateCallback.current = rotate;
        
    }, [props.signs, props.disable]);

    useEffect(() => {
        const $self = $(selfRef.current);

        $self.css({transform : "scaleX(1)"});
        rotateCallback.current();
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