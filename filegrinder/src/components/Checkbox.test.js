import { render, renderHook, screen, fireEvent, getByRole, logDOM } from "@testing-library/react"

import Checkbox from './Checkbox';

describe( Checkbox, () => {

    it("Test Initialisation",() => {
        const handleClick = jest.fn();
        render( <Checkbox onUpdate={handleClick} /> ); 
        const outercontainer = screen.getByRole("cbContainer");
        expect( outercontainer ).toBeInTheDocument();
    });

    it("Test Initialisation Check Set",() => {
        const handleClick = jest.fn();
        render( <Checkbox checked={true} onUpdate={handleClick} /> ); 
        const actualCheckbox = screen.getByRole("cbCheckbox");
        expect(actualCheckbox.checked).toBe(true);
    });

    it("Test Initialisation Check Set to Unset",() => {
        const handleClick = jest.fn();
        render( <Checkbox checked={true} onUpdate={handleClick} /> ); 
        const actualCheckbox = screen.getByRole("cbCheckbox");
        fireEvent.click(actualCheckbox);
        expect(actualCheckbox.checked).toBe(false);
    });

    it("Test Initialisation Check Unset",() => {
        const handleClick = jest.fn();
        render( <Checkbox checked={false} onUpdate={handleClick} /> ); 
        const actualCheckbox = screen.getByRole("cbCheckbox");
        expect(actualCheckbox.checked).toBe(false);
    });

    it("Test Initialisation Check Unset to Set",() => {
        const handleClick = jest.fn();
        render( <Checkbox checked={false} onUpdate={handleClick} /> ); 
        const actualCheckbox = screen.getByRole("cbCheckbox");
        fireEvent.click(actualCheckbox);
        expect(actualCheckbox.checked).toBe(true);
    });

    it("Test Return from a single click on unset Checkbox",() => {
        const handleClick = jest.fn();
        render( <Checkbox checked={false} onUpdate={handleClick} /> ); 
        const actualCheckbox = screen.getByRole("cbCheckbox");
        fireEvent.click(actualCheckbox);
        expect(handleClick.mock.lastCall[0]).toBe(true);
    });

    it("Test Return from a double click on unset Checkbox",() => {
        const handleClick = jest.fn();
        render( <Checkbox checked={false} onUpdate={handleClick} /> ); 
        const actualCheckbox = screen.getByRole("cbCheckbox");
        fireEvent.click(actualCheckbox);
        fireEvent.click(actualCheckbox);
        expect(handleClick.mock.lastCall[0]).toBe(false);
    });

});
/*
        fireEvent.click(screen.getByRole("cbCheckbox"));
        expect(handleClick).toHaveBeenCalledTimes(1);

*/

