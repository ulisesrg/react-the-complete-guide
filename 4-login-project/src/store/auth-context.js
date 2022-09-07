import React from 'react';

/*
    The following default value would be used if we don't have a provider and
    we are just using a consumer
*/
const AuthContext = React.createContext({
    isLoggedIn: false,
});

export default AuthContext;
