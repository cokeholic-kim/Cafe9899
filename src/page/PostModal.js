import React from 'react';
import styled from 'styled-components';
import { AiOutlineMore,AiOutlineHeart } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { API_URL } from '../config/apiurl';

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
            svg{margin:5px}
        }
        div:nth-of-type(4){
            padding:0 15px;
        }
    }
`

const PostModal = ({data,onClose}) => {
    const hashes = JSON.parse(data.p_hashtag)
    return (
        <Modalstyle>
            <div id="popup">
                <div id='postheader'>
                    <div>
                        <img src='./imgs/logo.jpg' alt="관리자 이미지"/>
                        <p>9899</p>
                    </div>
                    <ImCross onClick={onClose}/>
                </div>
                <div>
                    <img src={`${API_URL}/upload/post/${data.p_img}`}/>
                </div>
                <div>
                    <AiOutlineHeart/>
                    <FiMessageCircle/>
                    <IoPaperPlaneOutline/>
                </div>
                <div>
                    <strong>좋아요 맻개고?</strong>
                    <p>{hashes.map(tag=>`#${tag} `)}</p>
                    <p>{data.p_desc}</p>
                </div>
            </div>
        </Modalstyle>
    );
};

export default PostModal;