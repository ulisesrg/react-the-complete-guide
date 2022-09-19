import { useState } from 'react';

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = (event) => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    const touchHandler = (value) => {
        setIsTouched(value);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
        touchHandler,
    };
};

export default useInput;
