import React, { useState } from 'react';

import AddUser from './components/users/AddUser';
import UsersList from './components/users/UsersList';

function App() {
    const [usersList, setUsersList] = useState([]);

    const addUserHandler = (userName, userAge) => {
        setUsersList((prevUsersList) => {
            return [
                ...prevUsersList,
                { name: userName, age: userAge, id: Math.random().toString() },
            ];
        });
    };

    return (
        <>
        {/* It could also be React.Fragment or just Fragment if we import it at the side of useState */}
            <AddUser onAddUser={addUserHandler} />
            <UsersList users={usersList} />
        </>
    );
}

export default App;
