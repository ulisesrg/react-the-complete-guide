import { useState } from 'react';

const useInput2 = (validate) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    let valueIsValid = validate(enteredValue);
    let inputShowError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = (event) => {
        setIsTouched(true);
    };

    const inputTouchHandler = (isTouched) => {
        setIsTouched(isTouched);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        valueChangeHandler,
        inputBlurHandler,
        inputIsValid: valueIsValid,
        inputShowError,
        inputTouchHandler,
        reset,
    };
};

export default useInput2;
