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
    .admin{
        margin-left:20px;
        display:flex;
        flex-direction:column;
        position:relative;
        width: 80px;
        :hover div{
            background-color:gray;
            color:black;
        }
        :hover ul{
            display:block;
        }
        div{
            background-color: black;
            color: white;
            font-size: 20px;
            border: none;
            cursor: pointer;
        }
        ul{
            position:absolute;
            top:50px;
            display: none;
            background-color: #f9f9f9;

            width: 80px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
            li{
                a{
                    font-size:8px !important;
                    font-weight:800;
                }
                margin-left: 0 !important;
                color: black;
                padding: 10px 10px;
                text-decoration: none;
                display: block;
                :hover{
                    background-color: #f1f1f1;
                }
            }
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
                dispatch(setLogin()); //???????????? ?????? ???????????? ????????? ?????????????????? ??????????????????
            }else{
                dispatch(setLogout())
                clearInterval(loop)
            }
        },3000)
    },[userName,dispatch])
    return (
        <Headerstyle>
            <div>????????? ????????? ?????? ??????????????? ?????? & ???????????? | ???????????? ?????? ???????????????</div>
            <div className='nav'>
                <ul>
                    <li><Link to='/Menu'>MENU</Link></li>
                    <li><Link to='/Catering'>ORDERING</Link></li>
                    <li><Link to='/About'>ABOUT</Link></li>
                </ul>
                <h1><Link to="/">9899</Link></h1>
                <ul>
                    {isLogin ? 
                    <>
                        <li onClick={logoutClick}><Link to='/'><FaUserCircle/><span>Log Out</span></Link></li>
                        <li><Link to="/Mypage">????????????</Link></li>
                        <li><Link to="/Posting">?????????</Link></li>
                        {userName === "????????????" ? 
                        <>
                        <div className='admin'>
                            <div>??????</div>
                            <ul>
                                <li><Link to="/MenuManage">????????????</Link></li>
                                <li><Link to="/OrderManage">????????????</Link></li>
                                <li><Link to="/Menus">????????????</Link></li>
                                <li><Link to="/Posting">???????????????</Link></li>
                            </ul>
                        </div>
                        </>
                        :null}
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