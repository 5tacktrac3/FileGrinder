import { render, getByText } from "@testing-library/react"

import { KEYS, BuildConfig } from '../logic/Config';

import Row from './Row';

describe( Row, () => {

    it("Basic test to check text is loaded and displayed.",() => {
        var psuedoConfig = [];
        psuedoConfig.push( BuildConfig("AA","brown","CC") );
        const { container } = render( <Row contents="The quick brown fox jumps.." persistedConfigs={psuedoConfig} /> );         
        const renderedOut = getByText( container, 'The quick brown fox jumps..');
        expect( renderedOut ).toBeInTheDocument();
    });

    it("Highlight simple text in the middle of a row.",() => {
        var psuedoConfig = [];
        psuedoConfig.push( BuildConfig("brown","ff00ff", false) );
        const { container } = render( <Row contents="The quick brown fox jumps.." persistedConfigs={psuedoConfig} /> );         
        const renderedOut = getByText( container, 'brown');
        expect( renderedOut ).toBeInTheDocument();
    });

});