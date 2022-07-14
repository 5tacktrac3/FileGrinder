import React, {useEffect, useState} from 'react';

const textStyle = {
    color : '#00FF41',
};

const containerStyle = {
    margin : '10px',
    padding : '10px',
    textAlign : 'left'
};

const containerStyle_Idle = {
    ...containerStyle,
    border: '2px solid #008f11'
};

const containerStyle_Hover = {
    ...containerStyle,    
    margin : '9px',
    padding : '9px',
    border: '3px solid #008f11'
};

const containerStyle_Dropped = {
    ...containerStyle,
    border: '2px solid #008f11',
    backgroundColor : '#003B00'
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
