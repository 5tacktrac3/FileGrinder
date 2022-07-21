import React from 'react';
import {buildRowArray} from '../logic/Parser';

const outerRowStyle = {
    width: '100%',
    display: 'flex'
}

function processRow( text, persistedConfigs ) {

    // Check For Full Line Colour
    return buildRowArray( text, persistedConfigs );
}

export default function Row( props ) {

    var elements = [];
    if ( props.lineHighlight !== undefined && props.lineHighlight.length > 0 ) {
        elements.push(
            { key: 1, style: { color : "#"+props.lineHighlight, fontSize : '14px', margin : '0px' }, content : props.contents }
        );
    } else {
        elements = processRow( props.contents, props.persistedConfigs );
    }

    return(
        <div style={outerRowStyle} >            
            {                
                elements.map( (e) => ( <pre key={e.key} style={e.style}>{e.content}</pre> ) )
            }
        </div>
    );    

}