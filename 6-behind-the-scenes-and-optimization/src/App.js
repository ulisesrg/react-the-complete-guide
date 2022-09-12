import React, { useState } from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';

function App() {
    const [showParagraph, setShowParagraph] = useState(false);

    console.log('APP RUNNING');

    const toggleParagraphHandler = () => {
        setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    };

    return (
        <div className="app">
            <h1>Hi there!</h1>
            {/* Even if a prop value is hardcoded, or if the child components
            don't have any props, they will be re-evaluated */}
            <DemoOutput show={false} />
            <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
        </div>
    );
}

export default App;
