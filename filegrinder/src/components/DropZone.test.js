import { render, screen } from "@testing-library/react"

import DropZone from './DropZone';

describe( DropZone, () => {
    it("The *Drop File* message is shown",() => {
        render( <DropZone /> ); 
        const dropF = screen.getByText('Drop File...');
        expect( dropF ).toBeInTheDocument();
    });
});

