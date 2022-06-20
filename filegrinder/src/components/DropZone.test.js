import { render, renderHook, screen, fireEvent, getByRole } from "@testing-library/react"

import DropZone from './DropZone';

describe( DropZone, () => {

    it("On Start: 'Drop File' message is visible",() => {
        render( <DropZone /> ); 
        const dropF = screen.getByText('Drop File...');
        expect( dropF ).toBeInTheDocument();
    });

    it("On Start: 'Drop File' message is visible (Alt Method)",() => {
        const { container } = render( <DropZone /> );   
        const innerText = getByRole(container, "drop-area").textContent;
        expect( innerText ).toBe('Drop File...');
    });
    
    it("On Start: Initial style set",() => {
        const {result} = renderHook( () => DropZone() );
        expect( result.current.props.style.border ).toBe('1px solid #bbbbbb');       
    });

    it("On Start: Initial style set (Alt Method)",() => {
        const { container } = render( <DropZone /> );   
        const border = getByRole(container, "drop-area").style.border;
        expect( border ).toBe('1px solid #bbbbbb');
    });
    

    it("'HandleDrop' function is called after a drop event",() => {
        
        const handleDrop = jest.fn();
        render( <DropZone onTextLoaded={ handleDrop } />); 

        fireEvent.drop(
            screen.getByRole('drop-area'), 
            {
                dataTransfer : {
                    files: [new File(['The quick brown fox'], 'text.txt')]
                }
            });

        expect( handleDrop ).toHaveBeenCalledTimes(1);
        expect( handleDrop.mock.calls[0][0].name ).toBe('text.txt');
        expect( handleDrop.mock.calls[0][0].size ).toBe(19);

    });    


    it("Drop Event sets the background color",() => {

        const handleDrop = jest.fn();
        const { container } = render( <DropZone onTextLoaded={ handleDrop }/> );   

        const innerTextBefore = getByRole(container, "drop-area").style.backgroundColor;
        expect( innerTextBefore ).toBe('');            

        fireEvent.drop(
            getByRole(container, 'drop-area'), 
            {
                dataTransfer : {
                    files: [new File(['The quick brown fox'], 'text.txt')]
                }
            });

        const innerTextAfter = getByRole(container, "drop-area").style.backgroundColor;
        expect( innerTextAfter ).toBe('rgb(187, 187, 187)');            

    });

    it("Drag over changes the border width",() => {

        const handleDrop = jest.fn();

        const { container } = render( <DropZone onTextLoaded={ handleDrop }/> );  
        const dropArea = getByRole(container, "drop-area");

        expect( dropArea.style.border ).toBe('1px solid #bbbbbb');            

        fireEvent.dragOver( dropArea );

        expect( dropArea.style.border ).toBe('3px solid #bbbbbb');            

    });

});

