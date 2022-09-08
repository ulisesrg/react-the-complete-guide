import React, { useImperativeHandle, useRef } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    };

    /*
        This hook is used to pass a ref from Login externally to Input component,
        all through the ref parameter that is a "prop" in Login.js
        since the last one is a React Component and not a DOM element.
        React Components can't have refs, so that's the reason why.
    */
    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        };
    });

    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                /* 
                // BASED ON YOUTUBE VIDEO https://www.youtube.com/watch?v=gwFfzIaKnAU THIS TOTALLY WORKS TOO:
                ref={ref} // (the parameter)
                and we wouldn't need inputRef, activate and useImperativeHandler in this file
                */
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

export default Input;
