
export const KEYS = {
    SEARCH : "SEARCH",
    HIGHLIGHT : "HIGHLIGHT",
    REGEX : "REGEX",
    HIDE : "HIDE"
};

export function BuildConfig( searchString, highlight, regex )  {
    var newItem = {};
    newItem[KEYS.SEARCH] = searchString;
    newItem[KEYS.HIGHLIGHT] = highlight;
    newItem[KEYS.REGEX] = regex;
    newItem[KEYS.HIDE] = false;
    return newItem;
}

