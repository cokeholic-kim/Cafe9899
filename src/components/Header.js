import React from 'react';
import { FaUserCircle,FaFacebook } from "react-icons/fa";
import {AiFillTwitterCircle,AiFillInstagram} from "react-icons/ai"
import styled from 'styled-components';

const Headerstyle = styled.div`
    &{
        display:flex;
        flex-direction:column;
        text-align:center;
    }
    div:first-child{
        background-color:black;
        color:#fff;

    }
    .nav{
        display:flex;
        justify-content:space-between;
        align-items:center;
        position:relative;
        padding: 20px 0;
        ul{display:flex}    
        h1{
            position:absolute;
            left:50%;
            transform:translateX(-50%)
        }
    }
`

const Header = () => {
    return (
        <Headerstyle>
            <div>정성과 마음을 가득 담아만드는 담은 & 구팔구구 | 구움과자 음료 수제도시락</div>
            <div className='nav'>
                <ul>
                    <li>MENU</li>
                    <li>ORDER ONLINE</li>
                    <li>SPECIAL MENU</li>
                    <li>ABOUT</li>
                </ul>
                <h1>9899</h1>
                <ul>
                    <li><FaUserCircle/><span>Log In</span></li>
                    <li><FaFacebook/></li>
                    <li><AiFillTwitterCircle/></li>
                    <li><AiFillInstagram/></li>
                </ul>
            </div>
        </Headerstyle>
    );
};

export default Header;