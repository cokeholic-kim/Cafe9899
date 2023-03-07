import React, { useEffect } from 'react';
import { FaUserCircle,FaFacebook } from "react-icons/fa";
import {AiFillTwitterCircle,AiFillInstagram} from "react-icons/ai"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin, setLogout } from '../modules/logincheck';
import { getCookie, removeCookie } from '../util/cookie';
import { useSelector } from 'react-redux';

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
    const isLogin = useSelector(state=>state.logincheck.isLogin)
    const userName = getCookie("userName");
    const dispatch = useDispatch();
    const logoutClick = ()=>{
        removeCookie('userName');
        removeCookie('userEmail');
        dispatch(setLogout());
    }

    useEffect(()=>{
        const loop = setInterval(()=>{
            const userName = getCookie("userName")
            if(userName){
                dispatch(setLogin()); //헤더에서 다시 디스패치 해주면 새로고침해도 로그아웃안됨
            }else{
                dispatch(setLogout())
                clearInterval(loop)
            }
        },3000)
    },[userName,dispatch])
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
                    {isLogin ? 
                    <>
                        <li onClick={logoutClick}><Link to='/'><FaUserCircle/><span>Log Out</span></Link></li>
                        <li><Link to="/Mypage">회원정보</Link></li>
                    </>:
                    <>
                        <li><Link to='/Login'><FaUserCircle/><span>Log In</span></Link></li>
                        <li><FaFacebook/></li>
                        <li><AiFillTwitterCircle/></li>
                        <li><AiFillInstagram/></li>
                    </>
                    }
                </ul>
            </div>
        </Headerstyle>
    );
};

export default Header;