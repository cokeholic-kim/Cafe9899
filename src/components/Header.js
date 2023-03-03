import React from 'react';
import { FaUserCircle,FaFacebook } from "react-icons/fa";
import {AiFillTwitterCircle,AiFillInstagram} from "react-icons/ai"
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Headerstyle = styled.div`
    &{
        width:100%;
        z-index:1;
        display:flex;
        flex-direction:column;
        text-align:center;
    }
    div:first-child{
        background-color:black;
        height:50px;
        line-height:50px;
        font-weight:700;
        color:rgb(232,232,232);
    }
    .nav{
        display:flex;
        justify-content:space-between;
        align-items:center;
        position:relative;
        padding: 20px;
        ul{
            display:flex;
            align-items:center;
        }    
        ul:nth-child(1){
            color:rgb(47,46,46);
            font-weight:600;
            li{margin-right:20px}
        }
        ul:nth-child(3){
            color:rgb(47,46,46);
            font-weight:600;
            li{
                margin-left:20px; 
                font-size:25px;
                span{font-size:20px}
            }
        }

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
                    <li><Link to='/Menu'>MENU</Link></li>
                    <li>ORDER ONLINE</li>
                    <li><Link to='/Catering'>CATERING SERVICE</Link></li>
                    <li><Link to='/About'>ABOUT</Link></li>
                </ul>
                <h1>9899</h1>
                <ul>
                    <li><Link to='/Login'><FaUserCircle/><span>Log In</span></Link></li>
                    <li><FaFacebook/></li>
                    <li><AiFillTwitterCircle/></li>
                    <li><AiFillInstagram/></li>
                </ul>
            </div>
        </Headerstyle>
    );
};

export default Header;