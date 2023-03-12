import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CLIENT_ID } from '../config/apiurl';

const KakaoLogin = () => {
    let params = new URL(document.location.toString()).searchParams;    
    let code = params.get("code")
    console.log(code)
    useEffect(()=>{
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code");
        let grant_type = "authorization_code"
        let client_id = CLIENT_ID

        axios.post(`https://kauth.kakao.com/oauth/token?
        grant_type=${grant_type}
        &client_id=${client_id}
        &redirect_uri=http://localhost:3000/KAKAOLOGIN
        &code=${code}`
        ,{
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((res)=>{
            console.log(res)
        }).catch(e=>console.log(e))
    },[])
    return (
        <div>
            하이
        </div>
    );
};

export default KakaoLogin;