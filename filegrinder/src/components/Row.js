import React from 'react';
import {buildRowArray} from '../logic/Parser';

const outerRowStyle = {
    width: '100%',
    display: 'flex'
}

function processRow( text, persistedConfigs ) {
    return buildRowArray( text, persistedConfigs );
}

export default function Row( props ) {

    var elements = processRow( props.contents, props.persistedConfigs, props.previewConfig );

    return(
        <div style={outerRowStyle} >            
            {                
                elements.map( (e) => ( <pre key={e.key} style={e.style}>{e.content}</pre> ) )
            }
        </div>
    );    

}