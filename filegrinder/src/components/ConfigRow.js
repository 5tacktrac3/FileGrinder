import React, {useState} from 'react';

import Checkbox from './Checkbox';
import { KEYS } from '../logic/Config';

const textStyle = {
    color : '#bbbbbb'
};

const containerStyle = {
    display : 'table-row'
};

const cellStyle = {
    display : 'table-cell',
    paddingRight : '50px',
    color : '#bbbbbb',
    fontWeight : 'bold'
}

const addButtonStyle = {
    backgroundColor: '#222222', 
    color : '#FFFFFF',
    backgroundSize: 'contain', 
    height:'20px', 
    border: '1px solid #AAAAAA',
    marginLeft: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px'
}

function ConfigRow( props )  {

    const search = props.config[KEYS.SEARCH];
    const highlight = props.config[KEYS.HIGHLIGHT];
    const regex = props.config[KEYS.REGEX];
    const fullline = props.config[KEYS.FULLLINE];
    const hide = props.config[KEYS.HIDE];

    const handleFulllineUpdate = (e) => { props.itemUpdated( search, highlight, KEYS.FULLLINE, e ); };
    const handleHideUpdate = (e) => { props.itemUpdated( search, highlight, KEYS.HIDE, e ); };

    return(
        <div style={containerStyle}>
            <div style={cellStyle}>{search}</div>
            <div style={cellStyle}>{highlight}</div>
            <div style={cellStyle}><Checkbox checked={regex} /></div>
            <div style={cellStyle}><Checkbox checked={fullline} onUpdate={handleFulllineUpdate} /></div>
            <div style={cellStyle}><Checkbox checked={hide} onUpdate={handleHideUpdate} /></div>

            <div style={cellStyle}>
                <input type="button" value="Remove" style={addButtonStyle} onClick={ (e) => props.removeRequest( props.text ) } />
            </div>
        </div>
    );    

}

export default ConfigRow;