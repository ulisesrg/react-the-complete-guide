import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../store';
import classes from './Counter.module.css';

const Counter = () => {
    const dispatch = useDispatch();

    /* 
        useSelector can extract a part of the state and it also automatically 
        subscribes the component to the state, so whenever the state changes, the
        component will be re-evaluated 
    */
    const counter = useSelector((state) => state.counter);
    const showCounter = useSelector((state) => state.showCounter);

    const incrementHandler = () => {
        /* 
            counterSlice.actions.increment()
            returns an action object of this shape:
            { type: 'some auto-generated unique identifier }
        */
        dispatch(counterActions.increment());
    };

    const increaseHandler = () => {
        dispatch(counterActions.increase(5)); // { type: SOME_UNIQUE_IDENTIFIER, payload: 5 }
    };

    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    };

    const toggleCounterHandler = () => {
        dispatch(counterActions.toggleCounter());
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {showCounter && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={increaseHandler}>Increase by 5</button>
                <button onClick={decrementHandler}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
