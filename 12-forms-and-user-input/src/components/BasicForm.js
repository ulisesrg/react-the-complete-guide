import useInput2 from '../hooks/use-input2';

const isNotEmpty = (value) => value !== '';
const isEmail = (value) => value.includes('@');

const BasicForm = (props) => {
    const {
        value: nameValue,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        inputIsValid: nameIsValid,
        inputShowError: nameShowError,
        inputTouchHandler: nameTouchHandler,
        reset: resetName,
    } = useInput2(isNotEmpty);

    const {
        value: lastNameValue,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        inputIsValid: lastNameIsValid,
        inputShowError: lastNameShowError,
        inputTouchHandler: lastNameTouchHandler,
        reset: resetLastName,
    } = useInput2(isNotEmpty);

    const {
        value: emailValue,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        inputIsValid: emailIsValid,
        inputShowError: emailShowError,
        inputTouchHandler: emailTouchHandler,
        reset: resetEmail,
    } = useInput2(isEmail);

    const formIsValid = nameIsValid && lastNameIsValid && emailIsValid;

    const formSubmitHandler = (event) => {
        event.preventDefault();

        nameTouchHandler(true);
        lastNameTouchHandler(true);
        emailTouchHandler(true);

        if (!formIsValid) {
            console.log('form is invalid');
            return;
        }

        console.log('form submitted');
        console.log(nameValue, lastNameValue, emailValue);
        resetName();
        resetLastName();
        resetEmail();
    };

    const nameInputClasses = nameShowError
        ? 'form-control invalid'
        : 'form-control';

    const lastNameInputClasses = lastNameShowError
        ? 'form-control invalid'
        : 'form-control';

    const emailInputClasses = emailShowError
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="control-group">
                <div className={nameInputClasses}>
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        value={nameValue}
                    />
                    {nameShowError && (
                        <p className="error-text">Please enter a first name.</p>
                    )}
                </div>
                <div className={lastNameInputClasses}>
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                        value={lastNameValue}
                    />
                    {lastNameShowError && (
                        <p className="error-text">Please enter a last name.</p>
                    )}
                </div>
            </div>
            <div className={emailInputClasses}>
                <label htmlFor="email">E-Mail Address</label>
                <input
                    type="email"
                    id="email"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    value={emailValue}
                />
                {emailShowError && (
                    <p className="error-text">
                        Please enter a valid email address.
                    </p>
                )}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
