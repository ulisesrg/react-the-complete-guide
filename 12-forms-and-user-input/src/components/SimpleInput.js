import { useRef, useState } from 'react';

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput,
    } = useInput((value) => value.trim() !== '');

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    const enteredEmailIsValid = enteredEmail.includes('@');
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const emailInputChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const emailInputBlurHandler = (event) => {
        setEnteredEmailTouched(true);
    };

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        // setEnteredNameTouched(true);
        setEnteredEmailTouched(true);

        // we could also create a formIsValid constant outside of this funcion
        if (!enteredNameIsValid || !enteredEmailIsValid) {
            return;
        }

        console.log('state ', enteredName, ' ', enteredEmail);

        // const enteredValue = nameInputRef.current.value;
        // console.log('ref ', enteredValue);
        // nameInputRef.current.value = ''; NOT IDEAL, DON'T MANIPULATE THE DOM
        
        resetNameInput();

        setEnteredEmail('');
        setEnteredEmailTouched(false);
    };

    const nameInputClasses = nameInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const emailInputClasses = emailInputIsInvalid
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input
                    // ref={nameInputRef}
                    type="text"
                    id="name"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                />
                {nameInputHasError && (
                    <p className="error-text">Name must not be empty.</p>
                )}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor="email">Your Email</label>
                <input
                    type="email"
                    id="email"
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                    value={enteredEmail}
                />
                {emailInputIsInvalid && (
                    <p className="error-text">Please enter a valid email.</p>
                )}
            </div>
            <div className="form-actions">
                {/* Disabling the button is optional since there are different opinions regarding UX */}
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
