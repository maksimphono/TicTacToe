import {Modal, Button} from "react-bootstrap";

export default function ValidityAlert({hide, show}){
    return (
        <Modal show = {show}>
            <Modal.Header>
                <Modal.Title>
                    OOOOps...
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <p>Please, make sure all fields are set correctly</p>
            </Modal.Body>
            <Modal.Footer>
                    <Button variant = "secondary" className = "border border-3 border-light w-25" onClick = {hide}>
                        Close
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}