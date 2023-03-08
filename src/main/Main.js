import React from 'react';
import FlowSection from './FlowSection';
import Mainbottom from './Mainbottom';
import Maintop from './Maintop';
import Slider from './Slider';

const Mainpage = () => {


    return (
        <>
            <Maintop/>
            <Mainbottom/>
            <FlowSection imgname="lotuscookie.jpg" p={"바삭바삭"} header={"로터스쿠키"}/>
            <Mainbottom/>
            <FlowSection imgname="muffin.jpg" p={"귀여운"} header={"눈사람머핀"}/>
            <Mainbottom/>
            <FlowSection imgname="saltbread.jpg" p={"바삭짭짤"} header={"소금빵"}/>
            <Slider/>
        </>
    );
};

export default Mainpage;