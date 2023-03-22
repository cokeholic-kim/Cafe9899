import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';
import PostModal from '../page/PostModal';
import FlowSection from './FlowSection';
import Mainbottom from './Mainbottom';
import Maintop from './Maintop';
import MenuStory from './MenuStory';
import SliderComp from './Slider';

async function menuFetch(){
    const response = await axios.get(`${API_URL}/getMenu`);
    return response.data
}


const Mainpage = () => {
    const [Modal,setModal]=useState(false)
    const onClickPost = (data)=>{
        setModal(data)
    }
    const onClosePost = ()=>{
        setModal(false)
    }
    const {loading,error,data} = useAsync(()=>menuFetch(),[])
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null  

    return (
        <>
            {Modal && <PostModal onClose={onClosePost} data={Modal}/>}
            <Maintop/>
            <MenuStory data={data}/>
            {/* <Mainbottom/>
            <FlowSection imgname="lotuscookie.jpg" p={"바삭바삭"} header={"로터스쿠키"}/>
            <Mainbottom/>
            <FlowSection imgname="muffin.jpg" p={"귀여운"} header={"눈사람머핀"}/>
            <Mainbottom/>
            <FlowSection imgname="saltbread.jpg" p={"바삭짭짤"} header={"소금빵"}/> */}
            <SliderComp onClick={onClickPost}/>
        </>
    );
};

export default Mainpage;