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

    elements.forEach( ele => {
        ele.content = ele.content.replaceAll(" ", "\u00a0");
    } );

    return(
        <div style={outerRowStyle} >            
            {                
                elements.map( (e) => ( <div key={e.key} style={e.style}>{e.content}</div> ) )
            }
        </div>
    );    

}