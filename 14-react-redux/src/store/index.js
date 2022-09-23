import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

createSlice({
    name: 'counter',
    initialState,
    reducers: {
        /* 
            We were told that with legacy or regular reducers (not from redux toolkit)
            we were not allowed to modify or mutate the state object. With redux toolkit,
            we can write instructions that "would" mutate the object but redux toolkit
            will internally work a way to automatically create a new object, so we can
            "mutate" the object to write shorter instructions and not to worry about
            preventing to mutate it.
        */
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.amount;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    },
});

const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        /* 
            It is very important to not modify the state object, but rather
            return a new state without modifying the one we are receiving
            by an argument
        */
        return {
            counter: state.counter + 1,
            showCounter: state.showCounter,
        };
    }

    if (action.type === 'increase') {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter,
        };
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter,
        };
    }

    if (action.type === 'toggle') {
        return {
            showCounter: !state.showCounter,
            counter: state.counter,
        };
    }

    return state;
};

const store = createStore(counterReducer);

export default store;
