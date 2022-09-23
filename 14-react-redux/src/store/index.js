import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
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
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    },
});

const store = configureStore({
    reducer: counterSlice.reducer,
});

/* 
    counterSlice.actions.toggleCounter()
    returns an action object of this shape:
    { type: 'some auto-generated unique identifier }
*/
export const counterActions = counterSlice.actions;

export default store;
