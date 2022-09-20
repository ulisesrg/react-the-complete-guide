import { useReducer, useState } from 'react';

const initialInputState = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return { value: action.value, isTouched: state.isTouched };
    }

    if (action.type === 'BLUR') {
        return { isTouched: true, value: state.value };
    }

    // this is important especially if we don't disable the button
    if (action.type === 'TOUCH') {
        return { isTouched: action.isTouched, value: state.value };
    }

    if (action.type === 'RESET') {
        return { isTouched: false, value: '' };
    }

    return inputStateReducer;
};

const useInput2 = (validate) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

    // const [enteredValue, setEnteredValue] = useState('');
    // const [isTouched, setIsTouched] = useState(false);

    let valueIsValid = validate(inputState.value);
    let inputShowError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({ type: 'INPUT', value: event.target.value });
        // setEnteredValue(event.target.value);
    };

    const inputBlurHandler = (event) => {
        dispatch({ type: 'BLUR' });
        // setIsTouched(true);
    };

    const inputTouchHandler = (isTouched) => {
        dispatch({ type: 'TOUCH', isTouched: isTouched });
        // setIsTouched(isTouched);
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
        // setEnteredValue('');
        // setIsTouched(false);
    };

    return {
        value: inputState.value,
        valueChangeHandler,
        inputBlurHandler,
        inputIsValid: valueIsValid,
        inputShowError,
        inputTouchHandler,
        reset,
    };
};

export default useInput2;
