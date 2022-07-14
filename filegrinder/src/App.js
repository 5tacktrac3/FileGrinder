import './App.css';

import React, {useState} from 'react';

import {KEYS} from './logic/Config';

import DropZone from './components/DropZone';
import FileDisplay from './components/FileDisplay';
import HighlightBar from './components/HighlightBar';
import ConfigBar from './components/ConfigBar';


function App() {

  const [fileContents, setFileContents] = useState( [] );
  const [previewSearch, setPreviewSearch] = useState( {} );
  const [persistedConfigs, setPersistedConfigs] = useState( [] );

  // Text Loaded into Page 
  function textLoaded( file ) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const rawText = reader.result.split('\n');
      setFileContents( rawText );
    };
  }

  // Update Search List 
  function searchUpdated( newItem ){
    if ( newItem[KEYS.SEARCH] !== previewSearch.search || newItem[KEYS.HIGHLIGHT] !== previewSearch.highlight ) {
      setPreviewSearch( newItem );
    }
  }

  // -- Persist --

  // Add a new Persist Configs
  function persistHighlightConfig( newItem ) {
    setPersistedConfigs( persistedConfigs => [...persistedConfigs, newItem] );
  }

  /// Remove a Persist Config 
  function removeConfig( text ) {

    // Go look for it
    var index = -1;
    for ( var i = 0; i < persistedConfigs.length; i++ ){
      if ( persistedConfigs[i][KEYS.SEARCH] === text ) {
        index = i;
      }
    }

    // Remove if found
    if ( index !== -1 ){
      var copy = [ ...persistedConfigs];
      copy.splice(index,1);
      setPersistedConfigs(copy);
    }

  }



  return (
    <div className="App" >      
      <DropZone onTextLoaded={textLoaded} />
      <HighlightBar   onSearchUpdated={searchUpdated} 
                      onPersistHighlightConfig={persistHighlightConfig} />
      <ConfigBar persistedConfigs={persistedConfigs} removeRequest={removeConfig} />
      <FileDisplay allText={fileContents} currentPreviewSearch={previewSearch} persistedConfigs={persistedConfigs} />
    </div>
  );
}

export default App;
