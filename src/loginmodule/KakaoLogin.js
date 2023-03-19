import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ID } from '../config/apiurl';
import { goToHome, setLogin } from '../modules/logincheck';
import { setCookie } from '../util/cookie';

const KakaoLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let data
    useEffect(()=>{
        let code = new URL(window.location.href).searchParams.get("code")
        let grant_type = "authorization_code"
        let client_id = CLIENT_ID
        axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=http://localhost:3000/KAKAOLOGIN&code=${code}`
        ,{
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(async (res)=>{
            console.log(res.data)
            window.Kakao.init(CLIENT_ID)
            window.Kakao.Auth.setAccessToken(res.data.access_token)
            data = await window.Kakao.API.request({
                url:"/v2/user/me"
            })
            console.log(data.properties.nickname)
            let expires = new Date();
            expires.setMinutes(expires.getMinutes()+60)
            setCookie('userEmail',`${data.kakao_account.email}`,{path:'/',expires});
            setCookie('userName',`${data.properties.nickname}`,{path:'/',expires});
            dispatch(setLogin())
            dispatch(goToHome(navigate))
            //이메일을 데이터베이스에서검색해서 값이있으면 로그인가능 없으면 회원가입창으로 이동
        }).catch(e=>console.log(e))
    },[])
    return (
        <div>
            하이
        </div>
    );
};

export default KakaoLogin;