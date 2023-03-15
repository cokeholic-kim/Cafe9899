import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMore,AiOutlineHeart } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';
import axios from 'axios';

const Modalstyle = styled.div`
    background: rgba(0,0,0,.6);
    height: 100%;
    opacity: 1;
    overflow: hidden;
    position: fixed;
    top: 0;
    transition: opacity .15s linear;
    width: 100%;
    z-index: 3;
    #popup{
        background: #fff;
        border-radius: 4px;
        position: relative;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        width: 60vw;   
        height:80vh; 
        div:nth-of-type(1){
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:5px;
            img{width:50px;height:50px;border-radius:50%}
            p{
                font-size:24px;
                font-weight:700;
                margin-left:20px;   
            }
            svg{
                font-size:15px;
                margin-right:10px;
            }

        }
        div:nth-of-type(2){
            width:100%;
            height:60%;
            overflow:hidden;
            text-align:center;
            background-color:#f1f1f1;
            img{
                width:auto;
                height:100%;
            }
        }
        div:nth-of-type(3){
            font-size:24px;
            svg{
                margin:5px;
                transition:0.3s;
                &:hover{
                    transform:scale(1.2);
                }
            }
        }
        div:nth-of-type(4){
            padding:0 15px;
        }
        div:nth-of-type(5){
            height:18%;
            max-height:200px;
        }
        div:nth-of-type(6){
            input{
                position:absolute;
                bottom:0;
                width:100%;
                height:38px;
                border-color:#f1f1f1;
            }
        }
    }
`
async function commentfetch(){
    const response = await axios.get(`${API_URL}/getComment`);
    return response.data
}


const PostModal = ({data,onClose}) => {
    const hashes = JSON.parse(data.p_hashtag)
    const [Like,setLike] = useState(data.p_like)
    const [comment,setComment] = useState()
    const onChange = (e)=>{
        setComment(e.target.value)
    }
    const onClickclose = (e)=>{
        if(e.target.id === "Postback"){
            onClose()
        }
    }
    const onClicklike = ()=>{
        setLike(Like+1)
        const newlike = Like+1
        axios.post(`${API_URL}/postLike`,{p_like:newlike,p_id:data.p_id})
        .then(res=>console.log("좋아요"))
        .catch(e=>console.log(e))
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        if(comment){
            axios.post(`${API_URL}/addComment`,{c_comment:comment,c_postid:data.p_id,c_user:data.p_user})
            .then(res=>{
                setComment("")
                console.log("댓글등록")
            })
            .catch(e=>console.log(e))
            }
    }
    let {loading,error,data:commentdata} = useAsync(()=>commentfetch(),[])
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!commentdata) return null  
    console.log(commentdata)
    return (
        <Modalstyle onClick={onClickclose} id="Postback">
            <div id="popup">
                <div id='postheader'>
                    <div>
                        <img src='./imgs/logo.jpg' alt="관리자 이미지"/>
                        <p>{data.p_user}</p>
                    </div>
                    <ImCross onClick={onClose}/>
                </div>
                <div>
                    <img src={`${API_URL}/upload/post/${data.p_img}`}/>
                </div>
                <div>
                    <AiOutlineHeart onClick={onClicklike}/>
                    <FiMessageCircle/>
                    <IoPaperPlaneOutline/>
                </div>
                <div>
                    <strong>좋아요 {Like}개</strong>
                    <p>{hashes.map(tag=>`#${tag} `)}</p>
                    <p>{data.p_desc}</p>
                </div>
                <div>
                    {commentdata.map(comment =>
                        <div key={comment.c_id}>
                            <p>{comment.c_user}</p>
                            <p>{comment.c_comment}</p>
                        </div>
                    )}
                </div>
                <div id="addcomment">
                    <form onSubmit={onSubmit}>
                        <input placeholder='댓글 추가' onChange={onChange} value={comment}></input>
                    </form>
                </div>
            </div>
        </Modalstyle>
    );
};

export default PostModal;