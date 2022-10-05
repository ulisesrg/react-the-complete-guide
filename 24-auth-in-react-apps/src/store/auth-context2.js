import React, { useCallback, useEffect, useState } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const isLogged = !!token;

    const loginHandler = (token, deadLine) => {
        localStorage.setItem('token', token);
        localStorage.setItem('deadLine', deadLine);
        logoutTimer = setTimeout(logoutHandler, deadLine - Date.now());
        setToken(token);
    };

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('deadLine');
        clearTimeout(logoutTimer);
    }, []);

    useEffect(() => {
        console.log(token)
        if (token) {
            let timeLeft = localStorage.getItem('deadLine') - Date.now();
            if (timeLeft < 6000) timeLeft = 0;
            logoutTimer = setTimeout(logoutHandler, timeLeft);
        }
    }, [token, logoutHandler]);

    const context = {
        token,
        isLoggedIn: isLogged,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
