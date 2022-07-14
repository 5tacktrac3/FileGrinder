
import { GetAllIndexes } from './Parser';

describe( "Testing the GetAllIndexes function", () => {

    it("finds the index of a single instance of text", () => {
        const indexes = GetAllIndexes("This is a large piece of text", "piece", false);
        expect( indexes ).toEqual( [16] );
    })

    it("finds the indexes of multiple cases of text with a sample I", () => {
        const indexes = GetAllIndexes("0his now c0ntains two1text samples within a large piece of text", "text", false);
        expect( indexes ).toEqual( [22,59] );
    })

    it("finds the indexes of multiple cases of text with a sample II", () => {
        const indexes = GetAllIndexes("Much longer text, is now a much, much, much test", "uch", false);
        expect( indexes ).toEqual( [1,28,34,40] );
    })

    it("ensure that not matching results in an empty array", () => {
        const indexes = GetAllIndexes("This is a large piece of text", "missing", false);
        expect( indexes ).toEqual( [] );
    })

    it("finds the index of a single instance of text (Using REGEX)", () => {
        const indexes = GetAllIndexes("This is a large 111 piece of text", "[0-9]{3}", true);
        expect( indexes ).toEqual( [16] );
    })

    it("finds the indexes of multiple cases of text within a sample (Using REGEX))", () => {
        const indexes = GetAllIndexes("This is a 777 large piece 665 of text", "[0-9]{3}", true)
        expect( indexes ).toEqual( [10,26] );
    })

    it("ensure that not matching results in an empty array (Using REGEX)", () => {
        const indexes = GetAllIndexes("This is a 777 large piece 665 of text", "[0-9]{5}", true)
        expect( indexes ).toEqual( [] );
    })

});
