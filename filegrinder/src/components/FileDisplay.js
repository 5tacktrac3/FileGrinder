import React from 'react';

import {KEYS} from '../logic/Config'
import Row from './Row';

const containerStyle = {
    margin : '10px 10px',
    padding : '10px 0px',
    textAlign: 'left'
};

/* -- Title Area -- */

const titleStyle = {
    borderBottom: '2px solid #008F11',
    fontWeight : 'bold',
    marginTop : '0px',
    marginBottom : '10px',
    marginLeft : '0px',
    marginRight : '0px',
    padding : '5px'
};

const titleTextStyle = {
    color : '#00FF41',
    fontWeight : 'bold',
    margin : '0px',
    padding : '0px'
};

/* -- Body Area -- */

const bodyStyle = {
    marginLeft : '5px',
    marginRight : '5px'
};

export default function FileDisplay( props ) {

    // Carefully insert current search into persisted config.
    var psuedoConfig = [];
    props.persistedConfigs.forEach( element => {
        psuedoConfig.push( element );
    });
    psuedoConfig.push( props.currentPreviewSearch );

    // Process Text
    const rawText = props.allText;

    var lineNumber = 1;
    const annotatedText = [];
    rawText.forEach(element => {

        let bMatch = false
        let fullLineHighlight = "";

        psuedoConfig.forEach( eachConfig => {

            let bTextMatch = element.includes( eachConfig[KEYS.SEARCH] );

            if ( bTextMatch && eachConfig[KEYS.HIDE] === true ) {
                bMatch = true;
            }

            if ( bTextMatch && eachConfig[KEYS.FULLLINE] === true ) {
                fullLineHighlight = eachConfig[KEYS.HIGHLIGHT];
            }

        });

        if ( !bMatch ) {
            var newElement = {};
            newElement["LineNumber"] = lineNumber;
            newElement["Content"] = element;
            newElement["FullLine"] = fullLineHighlight;
            annotatedText.push( newElement );
            lineNumber++;            
        }

    });


    return(
        <div style={containerStyle}>
            <div style={titleStyle}>
                <p style={titleTextStyle}>File</p>
            </div>
            <div style={bodyStyle}>
                {
                    annotatedText.map( (e) => ( <Row key={e["LineNumber"]} contents={e["Content"]} lineHighlight={e["FullLine"]} persistedConfigs={psuedoConfig} /> ) )
                }
            </div>
        </div>
    );    

}