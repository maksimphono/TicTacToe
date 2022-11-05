import { useEffect } from 'react';
import {useState} from 'react';
import {Button} from "react-bootstrap";
import "../css/Cell_style.scss";

function BoardCellView(props){
    const [sign, setSign] = useState('');
    const click = event => {
        setSign(props.sign[0]);
        props.updateMatrix(props.x, props.y);
        console.log(`Sim ${props.sign} on Cords:  ${props.x}, ${props.y}`);
    };

    return (
        <>
            <Button className="btn-secondary" variant="outline-dark" onClick = {click}>{sign}</Button>
        </>
    );
}

export default BoardCellView;