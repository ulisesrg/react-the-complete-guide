import React, { useState, useCallback } from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
    const [showParagraph, setShowParagraph] = useState(false);
    const [allowToggle, setAllowToggle] = useState(false);

    console.log('APP RUNNING');

    const toggleParagraphHandler = useCallback(() => {
        /*
            As useCallback is used, we are telling React to store the function somewhere in memory.
            When that happens, toggleParagraphHandler is turn into a closure that remembers
            allowToggle value in that moment, and as the function will not ever change because of
            useCallback, allowToggle value won't change either. To allow this function to read
            the dynamic value of allowToggle, it needs to be passed as a dependency in the second
            argument of the useCallback function. That will cause the function to be recreated too.
        */
        if (allowToggle) {
            setShowParagraph((prevShowParagraph) => !prevShowParagraph);
        }
    }, [allowToggle]);

    const allowToggleHandler = () => {
        setAllowToggle(true);
    }

    return (
        <div className="app">
            <h1>Hi there!</h1>
            {/* Even if a prop value is hardcoded, or if the child components
            don't have any props, they will be re-evaluated */}
            <DemoOutput show={showParagraph} />
            <Button onClick={allowToggleHandler}>Allow Toggling</Button>
            <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
        </div>
    );
}

export default App;
