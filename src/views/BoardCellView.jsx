import { useEffect, useRef, useState, useMemo } from 'react';
import {Button} from "react-bootstrap";
import "../css/Cell_style.scss";
import $ from 'jquery';

function BoardCellView(props){
    const [sign, setSign] = useState('');
    const selfRef = useRef('');
    const cellTransitionTime = useMemo(() => 0.5, []);

    const handleClick = async (event) => {
        if (props.disable) return;
        const rotate = await props.updateMatrix(props.x, props.y);
        const $self = $(selfRef.current);

        if (rotate){
            $self.css({transform : "scaleX(.05)"});
            setTimeout(
                () => {
                    setSign(props.signs[0]);
                    $self.css({transform : "scaleX(1)"})
                },
                cellTransitionTime * 1000
            );
            rotate();
        }
    };

    useEffect(() => {
        $(selfRef.current).css({transition: cellTransitionTime + 's'})
    }, []);

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