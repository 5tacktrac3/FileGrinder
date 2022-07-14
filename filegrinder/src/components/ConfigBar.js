import React, {useState} from 'react';

import ConfigRow from './ConfigRow';

const containerStyle = {
    margin : '10px 10px',
    padding : '10px 0px',
    textAlign: 'left'
};

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

const tableStyle = {
    display : 'table',
    marginLeft : '5px',
    marginRight : '5px'
}

const headingStyle = {
    display : 'table-row',
    fontWeight : 'bold'
}

const headingCellStyle = {
    display : 'table-cell',
    paddingRight : '50px',
    color : '#bbbbbb'    
}


function ConfigBar( props )  {

    return(

        <div style={containerStyle}>
            <div style={titleStyle}>
                <p style={titleTextStyle}>Config</p>
            </div>
            <div style={tableStyle}>
                <div style={headingStyle}>
                    <div style={headingCellStyle}>Test</div>
                    <div style={headingCellStyle}>Highlight</div>
                    <div style={headingCellStyle}>Regex</div>
                    <div style={headingCellStyle}>Hide</div>
                    <div style={headingCellStyle}></div>
                </div>                
                {
                    props.persistedConfigs.map( (e) => ( <ConfigRow key={e.SEARCH+e.HIGHLIGHT} 
                                                                    config={e}
                                                                    removeRequest={props.removeRequest} /> ) )
                }
            </div>
        </div>

    );    

}

export default ConfigBar;