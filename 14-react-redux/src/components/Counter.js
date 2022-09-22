import { useSelector } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
    /* 
        useSelector can extract a part of the state and it also automatically 
        subscribes the component to the state, so whenever the state changes, the
        component will be re-evaluated 
    */
    const counter = useSelector((state) => state.counter);

    const toggleCounterHandler = () => {};

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            <div className={classes.value}>{counter}</div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
