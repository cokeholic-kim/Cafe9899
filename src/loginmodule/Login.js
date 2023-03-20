import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL, KAKAO_AUTH_URL, NAVER_CLIENT_ID, NAVER_REDIRECT } from '../config/apiurl';
import { goToHome, setLogin } from '../modules/logincheck';
import { setCookie } from '../util/cookie';

const LoginStyle = styled.div`
    width:50%;
    height:60vh;
    margin: 70px auto;
    text-align: center;
    .login-container{
        border:1px solid #ccc;
        border-radius:15px;
        padding:40px;
    }
    .login-title{
        h2{
            font-size: 35px;
            font-weight: 600;
            color: #000000;
        }
        div{color:#616161}
    }
    form{
        width:50%;
        margin:0 auto;
        text-align:left;
        .data{
            height: 45px;
            width: 100%;
            margin: 40px 0;        
            input{
                height: 100%;
                width: 100%;
                padding-left: 10px;
                font-size: 17px;
                border: none;
                border-bottom: 1px solid #e0e0e0;
                border-radius: 0 !important;
            }
        }
        .btn{
            margin: 30px 0;
            height: 45px;
            width: 100%;
            position: relative;
            overflow: hidden;
            button{
                height: 100%;
                width: 100%;
                background: none;
                border: none;
                color: #fff;
                font-size: 18px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                border-radius: 4px;
                background-color: #ffc288;
            }
        }
    }
    a{font-weight:700}
    .divider-container{
        position: relative;
        text-align: center;
        margin: 8px;
        .divider{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            height: 1px;
            width: 100%;
            background-color: #616161;
        }
        span{
            position: relative;
            width: 10vw;
            background-color: #fff;
            display: inline-block;
            margin: 30px 0;
            font-size:20px;
        }
    }
    .socialBtn-container{
        display:flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        .socialBtn{
            width: 38px;
            height: 100%;
            display: flex;
            cursor: pointer;
            img{
                max-height:48px;
                width:100%;
            }
        }
    }
`

const Login = () => {    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData,setLoginData] = useState({
        userEmail:"",
        userPass:""
    })
    const onChange = (e)=> {
        const {name,value} = e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        const {userEmail,userPass} = loginData
        if(userEmail === '' || userPass === ''){
            alert('이메일과 비밀번호를 입력해주세요')
        }else{
            axios.post(`${API_URL}/login`,loginData)
            .then(result => {
                if(result.data === '실패'){
                    alert("아이디와 비밀번호를 확인해주세요")
                }
                const { m_email , m_nickname ,m_point } = result.data[0];
                if(m_email && m_nickname){
                    alert("로그인 되었습니다.");
                    let expires = new Date();
                    expires.setMinutes(expires.getMinutes()+60)
                    setCookie('userEmail',`${m_email}`,{path:'/',expires});
                    setCookie('userName',`${m_nickname}`,{path:'/',expires});
                    setCookie('userPoint',`${m_point}`,{path:'/',expires});
                    dispatch(setLogin());
                    dispatch(goToHome(navigate))
                }
            })
            .catch(e=>{
                console.log(e)
            })
        }
    }
      useEffect(() => {
        const {naver} = window 
        const naverLogin = new naver.LoginWithNaverId({
            clientId:NAVER_CLIENT_ID,
            callbackUrl:NAVER_REDIRECT,
            isPopup:false,
            loginButton: {
              color: "green",
              type: 1,
              height: 38,
            },
          });
          console.log(naverLogin)
        naverLogin.init();
      }, []);    


      return (
        <LoginStyle className='center'>
            <div className='login-container'>
                <div className='login-title'>
                    <h2>LOG IN</h2>   
                    <div>정성과 마음을 가득 담아만드는 9899</div>
                </div>
                <div>
                    <form onSubmit={onSubmit}>
                        <div className='data'>
                            <label>E-mail</label>
                            <input type='text' name='userEmail' required onChange={onChange}/>
                        </div>
                        <div className='data'>
                            <label>Password</label>
                            <input type='password' name='userPass' required onChange={onChange}/>
                        </div>
                        <div className='forgot-pass'>
                            <Link to="/findPass">비밀번호를 잊으셨나요</Link>
                        </div>
                        <div className='btn'>
                            <div className='inner'></div>
                            <button type="submit">로그인</button>
                        </div>
                    </form>
                    <div>
                        "회원이 아니라면?"
                        <Link to="/Join">회원가입하기</Link>
                    </div>
                    <div className="sns-text">SNS 간편 로그인</div>
                    <div className="divider-container">
                        <div className="divider"></div>
                        <span>or</span>
                    </div>
                    <div className="socialBtn-container">
                        <div className="socialBtn">
                            <a href={KAKAO_AUTH_URL}>
                                <img src="/imgs/kakaolink_btn.png" alt="logo"/>
                            </a>
                        </div>
                        <div className="socialBtn">
                            <div id='naverIdLogin'>
                                <img src="imgs/naver_btn.png" alt="logo"/>
                            </div>
                        </div>
                        {/* <div className="socialBtn google-mobile-login">
                            <div id='google-signin-btn' onClick={signIn}>
                                <img src="/imgs/google_btn.png" alt="logo"/>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </LoginStyle>
    );
};

export default Login;