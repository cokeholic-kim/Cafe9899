import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { AiFillTwitterCircle,AiFillInstagram } from 'react-icons/ai'
import styled from 'styled-components';

const Footerstyle = styled.footer`
    &{
        position:relative;
        z-index:2;
        background-color:black;
        padding:40px 20px;
        display:flex;
        flex-direction:column;
        color:#fff;
        height:30vh;
    }
    &>ul{
        display:flex;
        li{
            width:22%;
            h2{margin-bottom:20px}
            &:nth-child(4){
                display:flex;
                flex-direction:column;
                width:34%;
                input,button{
                    height:30px;
                    margin-bottom:10px;
                    border:2px solid #fff;
                    background-color:black;
                    color:#fff;
                    &::placeholder{
                        padding:3px 3px 3px 21px;
                        color:#fff;
                        margin-left:3px;
                    }
                }
            }
        }
        
    }
    &>div{
        margin-top:50px;
        display:flex;
        p{
            width:66%;

        }
        ul{
            width:34%;
            display:flex;
            li{
                font-size:28px;
                margin-right:8px;             
            }
        }
    }
`

const Footer = () => {
    return (
        <Footerstyle>
            <ul>
                <li>
                    <h2>ADDRESS</h2>
                    <p>광주 광역시 서구 마륵복개로141</p>
                    <p>Mareukbokgae-ro, Seo-gu, Gwangju, South Korea</p>
                </li>
                <li>
                    <h2>CONTACT</h2>
                    <a href='jttp://pf.kakao.com/_Yxkxcnxj'>카카오톡</a>
                    <p>Tel: 062-371-9233</p>
                </li>
                <li>
                    <h2>HOURS</h2>
                    <p>OPEN DAILY</p>
                    <p>10AM-10PM</p>
                    <p>SUNDAY CLOSE</p>
                </li>
                <li>
                    <h2>MAILING LIST</h2>
                    <input placeholder='Enter your email here*'/>
                    <button>SUBSCRIBE</button>
                </li>
            </ul>
            <div>
                <p>©2022 by 9899. Powered and secured</p>
                <ul>
                    <li><FaFacebook/></li>
                    <li><AiFillTwitterCircle/></li>
                    <li><AiFillInstagram/></li>
                </ul>
            </div>
        </Footerstyle>
    );
};

export default Footer;