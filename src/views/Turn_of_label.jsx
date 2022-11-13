import {useEffect, useState, memo, Component} from "react";
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import equal from "fast-deep-equal";

export default memo(function TurnOfLabel({signs}){
    return (
        <div className="d-flex flex-column">
            <div id="turn-of-label" className="d-flex justify-content-between align-items-center flex-wrap mb-1 px-1">
                <h1 className="display-5">This is turn of {signs[0]}</h1>
                <Dropdown>
                    <Dropdown.Toggle
                        variant="warning"
                        className="rounded-pill"
                        size="lg"
                        id = "dropdown-game-menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            eventKey="1"
                            className="btn btn-primary d-flex justify-content-between align-items-center"
                            onClick = {() => window.location.reload(true)}
                        >    
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                            </svg>
                            <span style={{fontSize : 20, height: "100%"}}>Restart</span>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2" className="btn btn-primary d-flex justify-content-between align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            <span style={{fontSize : 20, height: "100%"}}>Back</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
        </div>
    );
});