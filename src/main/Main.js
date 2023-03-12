import React, { useState } from 'react';
import PostModal from '../page/PostModal';
import FlowSection from './FlowSection';
import Mainbottom from './Mainbottom';
import Maintop from './Maintop';
import SliderComp from './Slider';

const Mainpage = () => {
    const [Modal,setModal]=useState(false)
    const onClickPost = (data)=>{
        setModal(data)
    }
    const onClosePost = ()=>{
        setModal(false)
    }
    return (
        <>
            {Modal && <PostModal onClose={onClosePost} data={Modal}/>}
            <Maintop/>
            <Mainbottom/>
            <FlowSection imgname="lotuscookie.jpg" p={"바삭바삭"} header={"로터스쿠키"}/>
            <Mainbottom/>
            <FlowSection imgname="muffin.jpg" p={"귀여운"} header={"눈사람머핀"}/>
            <Mainbottom/>
            <FlowSection imgname="saltbread.jpg" p={"바삭짭짤"} header={"소금빵"}/>
            <SliderComp onClick={onClickPost}/>
        </>
    );
};

export default Mainpage;