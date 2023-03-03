import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginStyle = styled.div`
    width:50%;
    height:60vh;
    margin: 0 auto;
`

const Login = () => {
    return (
        <LoginStyle className='center'>
            <div className='login-container'>
                <div>LOG IN</div>
                <div>정성과 마음을 가득 담아만드는 9899</div>
                <div>
                    <form>
                        <div>
                            <label>E-mail</label>
                            <input type='text' name='useremail' required/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type='password' name='userpass' required/>
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
                        <Link to="/join">회원가입하기</Link>
                    </div>
                </div>
            </div>
        </LoginStyle>
    );
};

export default Login;