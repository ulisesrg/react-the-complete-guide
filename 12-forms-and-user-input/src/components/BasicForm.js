import useInput2 from '../hooks/use-input2';

const BasicForm = (props) => {
    const {
        value: nameValue,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        inputIsValid: nameIsValid,
        inputShowError: nameShowError,
        inputTouchHandler: nameTouchHandler,
    } = useInput2((value) => value !== '');

    const {
        value: lastNameValue,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        inputIsValid: lastNameIsValid,
        inputShowError: lastNameShowError,
        inputTouchHandler: lastNameTouchHandler,
    } = useInput2((value) => value !== '');

    const {
        value: emailValue,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        inputIsValid: emailIsValid,
        inputShowError: emailShowError,
        inputTouchHandler: emailTouchHandler,
    } = useInput2((value) => value.includes('@'));

    const formIsValid = nameIsValid && lastNameIsValid && emailIsValid;

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        nameTouchHandler(true);
        lastNameTouchHandler(true);
        emailTouchHandler(true);

        if (formIsValid) {
            console.log('name ', nameValue);
            return;
        }

        console.log('form is invalid');
    };

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className="control-group">
                <div className="form-control">
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        value={nameValue}
                    />
                    {nameShowError && <p>Name error</p>}
                </div>
                <div className="form-control">
                    <label htmlFor="name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        onChange={lastNameChangeHandler}
                        onBlur={lastNameBlurHandler}
                        value={lastNameValue}
                    />
                    {lastNameShowError && <p>Last Name error</p>}
                </div>
            </div>
            <div className="form-control">
                <label htmlFor="email">E-Mail Address</label>
                <input
                    type="email"
                    id="email"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    value={emailValue}
                />
                {emailShowError && <p>Email error</p>}
            </div>
            <div className="form-actions">
                <button>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
