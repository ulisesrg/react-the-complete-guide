import { useSelector } from 'react-redux';

import Counter from './components/Counter';
// import CounterClassBased from './components/CounterClassBased';
import Header from './components/Header';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';

function App() {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    return (
        <>
            <Header />
            {!isAuth && <Auth />}
            {isAuth && <UserProfile />}
            <Counter />
            {/* <CounterClassBased /> */}
        </>
    );
}

export default App;
