import React, { useEffect } from 'react';
import { FaUserCircle} from "react-icons/fa";
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
    .nav{
        display:flex;
        justify-content:space-between;
        align-items:center;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        z-index:5;
        padding: 20px;
        .categories{
            width:70%;
            display:flex;
            justify-content:space-between;
            align-items:center;
        }    
        ul:nth-child(2){
            color:rgb(47,46,46);
            font-weight:bold;
            font-size:20px;
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
                dispatch(setLogin()); //헤더에서 다시 디스패치 해주면 새로고침해도 로그아웃안됨
            }else{
                dispatch(setLogout())
                clearInterval(loop)
            }
        },3000)
    },[userName,dispatch])
    return (
        <Headerstyle>
            <div className='nav' style={{height:'100px'}}>
                <h1><Link to="/">9899</Link></h1>
                <ul className='categories'>
                    <li><Link to='/Menu'>특별한 메뉴들</Link></li>
                    <li><Link to='/Catering'>픽업예약</Link></li>
                    <li><Link to='/About'>9899 이야기</Link></li>
                    <li><Link to='/Catering'>새소식 & 공지</Link></li>
                </ul>
                <ul>
                    {isLogin ? 
                    <>
                        <li onClick={logoutClick}><Link to='/'><FaUserCircle/><span>Log Out</span></Link></li>
                        <li><Link to="/Mypage">회원정보</Link></li>
                        <li><Link to="/Posting">포스팅</Link></li>
                        {userName === "코카콜라" ? 
                        <>
                        <div className='admin'>
                            <div>관리</div>
                            <ul>
                                <li><Link to="/MenuManage">메뉴등록</Link></li>
                                <li><Link to="/OrderManage">주문관리</Link></li>
                                <li><Link to="/Menus">메뉴관리</Link></li>
                                <li><Link to="/Posting">제품포스팅</Link></li>
                            </ul>
                        </div>
                        </>
                        :null}
                    </>:
                    <>
                        <li><Link to='/Login'><FaUserCircle/><span>Log In</span></Link></li>
                    </>
                    }
                </ul>
            </div>
        </Headerstyle>
    );
};

export default Header;