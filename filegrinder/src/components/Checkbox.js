import React, {useState} from 'react';


export default function Checkbox( props ) {

    const [checked, setChecked] = useState(props.checked);

    const onUpdate = () => {
        const newState = !checked;
        setChecked(newState);
        props.onUpdate(newState);
    }

    return(
        <label role="cbContainer" className="cbContainer">
            <input role="cbCheckbox" type="checkbox" checked={checked} onChange={ onUpdate } />
            <span className="cbCheckmark" ></span>
        </label>
    );    

};
