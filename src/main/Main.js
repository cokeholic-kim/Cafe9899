import React from 'react';
import FlowSection from './FlowSection';
import Mainbottom from './Mainbottom';
import Maintop from './Maintop';

const Mainpage = () => {
    return (
        <>
            <Maintop/>
            <Mainbottom/>
            <FlowSection/>
            <Mainbottom/>
            <FlowSection/>
            <Mainbottom/>
            <FlowSection/>
        </>
    );
};

export default Mainpage;