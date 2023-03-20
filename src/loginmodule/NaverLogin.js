import { Space, Spin } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAVER_CLIENT_ID, NAVER_REDIRECT } from '../config/apiurl';
import { goToHome, setLogin } from '../modules/logincheck';
import { setCookie } from '../util/cookie';



const NaverLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function getLoginStatus(){
        const {naver} = window
        const naverLogin = new naver.LoginWithNaverId({
            clientId:NAVER_CLIENT_ID,
            callbackUrl:NAVER_REDIRECT,
        });
        naverLogin.init()
        console.log(naverLogin)
        naverLogin.getLoginStatus((status)=>{
            if(status){
                console.log(naverLogin.user)
                let expires = new Date();
                expires.setMinutes(expires.getMinutes()+60)    
                console.log(naverLogin.user)
                setCookie('userEmail',`${naverLogin.user.email}`,{path:'/',expires});
                setCookie('userName',`${naverLogin.user.name}`,{path:'/',expires});
                dispatch(setLogin())
                dispatch(goToHome(navigate))
            }else{
                alert("다시 시도해주세요")
                navigate('/Login')
            }
        })
    }
    
    getLoginStatus()
    return (
        <div style={{lineHeight:'100vh'}}>
            <Space direction='vertical' style={{width:'100%',lineHeight:'100vh'}}>
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            </Space>

        </div>
    );
};

export default NaverLogin;