import Counter from './components/Counter';
// import CounterClassBased from './components/CounterClassBased';
import Header from './components/Header';
import Auth from './components/Auth';

function App() {
    return (
        <>
            <Header />
            <Auth />
            <Counter />
            {/* <CounterClassBased /> */}
        </>
    );
}

export default App;
