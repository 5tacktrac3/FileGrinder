// Takes the text of a row and finds the indexes of matching
// strings or regex. Returning them as a list.
export function GetAllIndexes( text, searchString, bRegex ) {

    var startPos = 0;
    var results = [];

    if ( bRegex ) {
        let matches = [...text.matchAll(searchString)];        
        matches.forEach( (m) => {
            results.push(m.index);
        });
        results.sort();
    }
    else
    {
        var foundPos = -1;
        foundPos = text.indexOf(searchString, startPos);
        while ( foundPos > -1 ){
            results.push( foundPos );
            startPos = foundPos + 1;
            foundPos = text.indexOf(searchString, startPos);
        }
    }

    return results;

}



// Takes the text of a single row and returns a list
// split by the indexes provided
function SplitTextByIndexes( rowText, allIndexes ) {

    // Split at indexes
    var position = 0;
    var results = [];

    for( var index = 0; index < allIndexes.length; index++ ) {
        var part = rowText.slice(position, allIndexes[index]);
        if ( part.length > 0) {
            results.push(part);
        }
        position = allIndexes[index];
    }

    // Last Index
    var lastPart = rowText.slice(position, rowText.length);
    if ( lastPart.length > 0) {
        results.push(lastPart);
    }

    return results;

}




export const buildRowArray = ( text, persistedConfigs ) => {

    // Test Data
    var testPersist = persistedConfigs;

    // Display All Indexes
    // console.log( "Configs " + testPersist.length);

    // Get All Indexes
    var allIndexes = [];
    for ( var iPersistedConfigs = 0; iPersistedConfigs < testPersist.length; iPersistedConfigs++ ){
        const searchString = testPersist[iPersistedConfigs].SEARCH;
        allIndexes.push( ...GetAllIndexes( text, searchString, testPersist[iPersistedConfigs].REGEX ) );
    }
    allIndexes = [... new Set(allIndexes) ];
    allIndexes.sort();

    // Display All Indexes
    // console.log( "All Indexes ");
    // console.log( ...allIndexes );

    try {

        // const xText = text.replaceAll(" ", "\u00a0");
        const xText = text;

        var results = SplitTextByIndexes(xText,allIndexes)

        // console.log( "First Slice");
        // console.log( ...results );

        var id = 1;
        var finalArray = [];
        results.forEach( ele => {

            // Element has search?
            var matchString = "";
            var matchedHighlight = "";

            for ( var i = 0; i < testPersist.length; i++ ){
                if ( testPersist[i].REGEX ) {
                    var expression = new RegExp(testPersist[i].SEARCH);        
                    if ( expression.test( ele ) ) {
                        matchString = ele.match(testPersist[i].SEARCH)[0];
                        matchedHighlight = testPersist[i].HIGHLIGHT;                        
                    }
                }
                else
                {
                    const searchString = testPersist[i].SEARCH;
                    if ( ele.includes( searchString ) ) {
                        matchString = searchString;
                        matchedHighlight = testPersist[i].HIGHLIGHT;
                    }    
                }
            }


            if ( matchString.length > 0 ) {

                var matchedValue = ele.slice(0,matchString.length);
                if ( matchedValue.length > 0 ) {
                    finalArray.push(
                        { key: id, style: { color : "#" + matchedHighlight, fontSize : '14px' }, content : matchedValue }
                    );
                    id++;
                }

                var theRest = ele.slice(matchString.length, ele.length);
                if ( theRest.length > 0 ) { 
                    finalArray.push(
                        { key: id, style: { color : "#FFFFFF", fontSize : '14px' }, content : theRest }
                    );
                    id++;
                };

            }
            else 
            {
                finalArray.push(
                    { key: id, style: { color : "#FFFFFF", fontSize : '14px' }, content : ele }
                );
                id++;
            }

        });        

        // console.log( "Final");
        // console.log( ...finalArray );

        return finalArray;

    }
    catch (error) { 
        // console.log("YYY");
    }

};



