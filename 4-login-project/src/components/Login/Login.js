import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') };
    }

    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') };
    }

    return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }

    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }

    return { value: '', isValid: false };
};

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    /*
        previous emailIsValid state was depending on enteredEmail state,
        which is a bad practice, that is the reason to use useReducer and to
        comment and remove those individual states
    */
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null,
    });

    const authCtx = useContext(AuthContext);

    // --------------------------- USE EFFECT SUMMARY STARTS ------------------------------- //
    // NO SECOND ARGUMENT
    /* 
    useEffect(() => {
        // This will run when the component is first rendered and every time it is re-rendered
        console.log('EFFECT RUNNING');

        // This will run every time before the component is re-rendered
        return () => {
            console.log('EFFECT CLEANUP');
        };
    }); 
    */

    // EMPTY ARRAY AS SECOND ARGUMENT
    /* 
    useEffect(() => {
        // This will run ONLY when the component is first rendered
        console.log('EFFECT RUNNING');

        // This will run before the component is unmounted
        return () => {
            console.log('EFFECT CLEANUP');
        };
    }, []); 
    */

    // DEPENDENCIES ARRAY AS SECOND ARGUMENT
    /*
    useEffect(() => {
        // This will run when the component is first rendered AND
        // when the dependencies have been updated (that will cause the component to be re-rendered)
        console.log('EFFECT RUNNING');

        // This will run before the component is unmounted
        return () => {
            console.log('EFFECT CLEANUP');
        };
    }, [enteredEmail]);
    */
    // --------------------------- USE EFFECT SUMMARY ENDS ------------------------------- //

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);

        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
    };

    const validateEmailHandler = () => {
        // setEmailIsValid(enteredEmail.includes('@'));
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        // setPasswordIsValid(enteredPassword.trim().length > 6);
        dispatchPassword({ type: 'INPUT_BLUR' });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        authCtx.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
