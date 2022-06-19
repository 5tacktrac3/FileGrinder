import React, {useEffect, useState} from 'react';

const textStyle = {
    color : '#bbbbbb',
};

const containerStyle = {
    margin : '10px',
    padding : '10px',
};

const containerStyle_Idle = {
    ...containerStyle,
    border: '1px solid #bbbbbb'
};

const containerStyle_Hover = {
    margin : '9px',
    padding : '9px',
    border: '3px solid #bbbbbb'
};

const containerStyle_Dropped = {
    ...containerStyle,
    background : '#bbbbbb'
};

const DRAG_STATES = {
    IDLE : "idle",
    HOVER : "detected",
    DROPPED : "dropped"
};

export default function DropZone( props )  {

    const [dragState, setDragState] = useState( DRAG_STATES.EMPTY );

    useEffect( () => { 
        if ( dragState == DRAG_STATES.DROPPED ) {
            const timeout = setTimeout(() => {
                setDragState( DRAG_STATES.IDLE );
            }, 500)
        }
    });

    function handleOnDragOver( event ) {
        event.stopPropagation();
        event.preventDefault();
        setDragState( DRAG_STATES.HOVER );
    }

    function handleOnDragLeave( event ) {
        event.stopPropagation();
        event.preventDefault();
        setDragState( DRAG_STATES.IDLE );
    }

    function handleOnDrop( event ) {
        event.stopPropagation();
        event.preventDefault();

        setDragState( DRAG_STATES.DROPPED );

        const fileList = event.dataTransfer.files;
        props.onTextLoaded( fileList[0] )

    }

    let containerStyle = null;

    switch ( dragState ) {
        case DRAG_STATES.HOVER:
            containerStyle = containerStyle_Hover;
            break;
        case DRAG_STATES.DROPPED:
            containerStyle = containerStyle_Dropped;
            break;
        default:
            containerStyle = containerStyle_Idle;
    }

    return(
        <div role="drop-area" style={containerStyle} onDragOver={handleOnDragOver} onDragLeave={handleOnDragLeave} onDrop={handleOnDrop}>
            <p style={textStyle}>Drop File...</p>
        </div>
    );    

}
