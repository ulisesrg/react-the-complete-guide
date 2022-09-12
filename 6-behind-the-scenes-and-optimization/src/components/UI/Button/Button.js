import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
    console.log('Button RUNNING');

    return (
        <button
            type={props.type || 'button'}
            className={`${classes.button} ${props.className}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

/*
this tells React to only re-evalute the component if the props changed
as props.onClick === props.previous.onClick will be false because
onClick is a function and, hence, an object and two objects can't be the same thing
So, it will re-evaluate it
*/

export default React.memo(Button);
