import React from 'react';

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

    console.log("File Display Running...");

    const rawText = props.allText;

    // Process Text
    // Jump into a second list (future requirement to designate lines to not show)
    var lineNumber = 1;
    const annotatedText = [];
    rawText.forEach(element => {
        var newElement = {};
        newElement["LineNumber"] = lineNumber;
        newElement["Content"] = element;
        annotatedText.push( newElement );
        lineNumber++;
    });

    // Carefully insert current search into persisted config.
    var psuedoConfig = [];
    props.persistedConfigs.forEach( element => {
        psuedoConfig.push( element );
    });

    psuedoConfig.push( props.currentPreviewSearch );

    return(
        <div style={containerStyle}>
            <div style={titleStyle}>
                <p style={titleTextStyle}>File</p>
            </div>
            <div style={bodyStyle}>
                {
                    annotatedText.map( (e) => ( <Row key={e["LineNumber"]} contents={e["Content"]} persistedConfigs={psuedoConfig} /> ) )
                }
            </div>
        </div>
    );    

}