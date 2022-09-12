import React from 'react';

import MyParagraph from './MyParagraph';

const DemoOutput = (props) => {
    console.log('DemoOutput RUNNING');
    return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>;
};

/*
this tells React to only re-evalute the component if the props changed
as props.show === props.previous.show will be true, it will not re-evaluate it
*/

export default React.memo(DemoOutput);
