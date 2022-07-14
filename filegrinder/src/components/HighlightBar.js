
import React, { useReducer, useEffect} from 'react';

import {KEYS, BuildConfig} from '../logic/Config';

const containerStyle = {
    margin : '10px 10px',
    padding : '10px 0px',
    textAlign : 'left'
}

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

const inputStyle = {
    color: '#bbbbbb',
    background : '#222222',
    fontWeight : 'bold',
    fontSize : '14px',
    marginRight : '10px',
    width : '20%'
}

const inputHighlightStyle = {
    color: '#bbbbbb',
    background : '#222222',
    fontSize : '14px',
    marginRight : '10px',
    width : '80px'
}

const cbStyle = {
    transform: 'scale(1.5)',
    marginRight : '40px',
    marginLeft : '5px'
}

const labelStyle = {
    color: '#bbbbbb',
    fontWeight : 'bold',
    marginRight : '5px'
}

const addButtonStyle = {
    backgroundColor: '#222222', 
    color : '#FFFFFF',
    /* backgroundImage: `url(${background})`, */
    backgroundSize: 'contain', 
    height:'20px', 
    border: '1px solid #AAAAAA',
    marginLeft: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px'
}

const previewButtonStyle = {
    backgroundColor: '#222222', 
    color : '#FFFFFF',
    /* backgroundImage: `url(${background})`, */
    backgroundSize: 'contain', 
    height:'20px', 
    border: '1px solid #AAAAAA',
    marginLeft: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px'
}

const initialSearchState = {
    SearchValue : "",
    Highlight : "",
    Regex : false
}

const searchReducer = (state, action) => {    
    switch( action.Type ) {
        case KEYS.SEARCH:
            return { ...state, SearchValue : action.Value};
        case KEYS.HIGHLIGHT:
            return { ...state, Highlight : action.Value};
        case KEYS.REGEX:
            return { ...state, Regex : !state.Regex };
        default:
            return state;
    }
} 

function HighlightBar( props ) {

    var [searchState, dispatch] = useReducer(searchReducer, BuildConfig("","",false) ); 

    const handleSearchChange = (e) => {
        dispatch( {Type : e.Type, Value : e.Value} );        
    }

    const handlePersistRequest = (e) => {
        props.onPersistHighlightConfig( BuildConfig( searchState.SearchValue, searchState.Highlight, searchState.Regex ) );
    }

    const handlePreviewRequest = (e) => {
        props.onSearchUpdated( BuildConfig( searchState.SearchValue, searchState.Highlight, searchState.Regex ) );
    }

    return(

        <div style={containerStyle} >
            <div style={titleStyle}>
                <p style={titleTextStyle}>Highlight</p>
            </div>
            <div style={bodyStyle}>
                <label style={labelStyle}>Text:</label>
                <input  type="text" 
                        style={inputStyle} 
                        value={searchState.SearchValue} 
                        onChange={ (e) => handleSearchChange( { Type : KEYS.SEARCH, Value : e.target.value } ) } />            
                <label style={labelStyle}>Regex:</label>
                <input  type="checkbox" 
                        style={cbStyle} 
                        value={searchState.Regex} 
                        onChange={ (e) => handleSearchChange( { Type : KEYS.REGEX, Value : e.target.value } ) } />
                <label  style={labelStyle}>Highlight:</label>
                <input  type="text" 
                        style={inputHighlightStyle} 
                        value={searchState.Highlight} 
                        onChange={ (e) => handleSearchChange( { Type : KEYS.HIGHLIGHT, Value : e.target.value } ) } />
                <input  type="button" value="Preview" style={previewButtonStyle} onClick={ (e) => handlePreviewRequest() } />
                <input  type="button" value="Add" style={addButtonStyle} onClick={ (e) => handlePersistRequest() } />
            </div>
        </div>
    );

}

export default HighlightBar;
