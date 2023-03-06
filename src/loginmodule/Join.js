import React, { useRef, useState } from 'react';
import axios, { formToJSON } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import styled from 'styled-components';

const Joinpage = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    background: #fff;
    width: 410px;
    padding: 30px;
    box-shadow: 0 0 8px rgb(0 0 0 / 10%);
    h1{
        font-family: 'Montserrat';
        font-size: 35px;
        font-weight: 600;
        text-align: center;
        color: #000000;
    }
    h3{
        font-size: 12px;
        text-align: center;
        color: #616161;
        letter-spacing: 1px;
        padding: 8px
    }
    form .join-data{
        .inputflex{
            display:flex
        }
        label{
            font-size: 12px;
            color: #999;
        }
        button{
            height: 32px;
            font-size: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            width: 50px;
            padding: 0;
            cursor: pointer;
        }
        input{
            height: 32px;
            width: 100%;
            border: none;
            background-color: #fafafa;
            font-size: 0.8rem;
        }
    }
    .join-btn{
        margin-top: 24px;
        height: 45px;
        width: 100%;
        background: none;
        border: none;
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 4px;
        background-color: #FFC288;
    }
    .join-btn-back{
        margin-top: 24px;
        height: 45px;
        width: 100%;
        background: none;
        border: none;
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        border-radius: 4px;
        background-color: #adeae8;
    }
    
`

const Join = () => {
    const passcheck = useRef()
    const pass = useRef()
    const passch = useRef()
    const navigate =useNavigate();
    const [formData,setFormData]=useState({
        m_name:"",
        m_pass:"",
        m_passch:"",
        m_nickname:"",
        m_email:"",
        m_phone:"",
        m_address1:"",
        m_address2:"",
    });
    const onChange = (e)=>{
        const {name,value} =e.target;
        setFormData({
            ...formData,
            [name]:value
        })
        if(passch.current.value){
            if(pass.current.value !== passch.current.value){
                passcheck.current.innerText = `비밀번호가 일치하지 않습니다.`
            }else{
                passcheck.current.innerText = `비밀번호가 일치합니다.`
            }
        }else{
            passcheck.current.innerText = ""
        }
    }
    
    //폼전송 이벤트
    const onSubmit = (e) => {
        e.preventDefault();
        if(formData.m_name && formData.m_pass && formData.m_passch &&formData.m_nickname &&formData.m_email){
            // if(formData.m_pass === formData.m_passch){
            //         // console.log("비밀번호들 일치")
            //     if(checkPassword(formData.m_pass) === true){
            //             // console.log("비밀번호 정규표현식 시작")
            //         // addMember();
            //     }else{
            //         alert("비밀번호의 형식이 일치하지 않습니다.")
            //             // console.log("정규표현식이 틀림")
            //     }
            // }else{
            //     alert("비밀번호와 비밀번호재확인이 일치하지 않습니다.")
            // }
            if(formData.m_email){}
        }else{
            alert("빈칸없이 입력해주세요")
        }
    }
    // const addMember = () => {
    //     axios.post(`${API_URL}/join`,formData)
    //     .then(res=>{
    //         alert('등록되었습니다.');
    //         navigate('/');
    //     })
    //     .catch(e=>{
    //         console.log("에러발생")
    //         console.log(e);
    //     })
    // }
    const checkPassword= (pass) =>{
        // 영문자,특수문자,숫자 8~20자 사이
        const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,20}$/;
        return regExp.test(pass)
        // if(regExp.test(e)){
        //     // alert("조건을 만족하였습니다.")
        //     addMember();
        // }else{
        //     alert("비밀번호에는 영문자,특수문자,숫자가 1개이상 포함되어야 합니다.")
        // }
    }
    const checkemail=(e)=>{
        e.preventDefault()
        const {m_email} = formData;
        const regExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.com$/
        if(regExp.test(m_email)){
            alert(`${m_email}은 사용가능한 이메일 입니다`)
        }else{
            alert(`${m_email}은 사용할수없는 이메일 입니다`)
        }
    }


    return (
        <Joinpage>
            <h1>Join 9899</h1>
            <h3>정성과 마음을 가득 담아만드는 9899</h3>
            <form onSubmit={onSubmit}>
                <div className='join-data'>
                    <label className="label-text" htmlFor="signInEmail">이메일</label>
                    <div className='inputflex'>
                        <input type="text" id="signInEmail" maxLength="30"  name="m_email" value={formData.m_email} onChange={onChange}/>
                        <button className="email-btn" id="checkEmail" onClick={checkemail}>확인</button>
                    </div>
                </div>
                <div className='join-data'>
                    <label className="label-text" htmlFor="signInName">이름</label>
                    <div>
                        <input type="text" id="signInName"  name="m_name" maxLength="12" value={formData.m_name} onChange={onChange}/>
                    </div>
                </div>
                <div className='join-data'>
                    <label className="label-text" htmlFor="signInNickname">닉네임</label>
                    <div>
                        <input type="text" id="signInNickname"  name="m_nickname" maxLength="12" value={formData.m_nickname} onChange={onChange}/>
                    </div>
                </div>
                <div className='join-data'>
                    <label className="label-text" htmlFor="signInPwd">비밀번호</label>
                    <div> 
                        <input type="password" id="signInPwd" ref={pass} name="m_pass"  placeholder="비밀번호(영문자, 숫자, 특수문자 포함 8~20자)" maxLength="20" value={formData.m_pass} required="" onChange={onChange} />
                    </div>
                </div>
                <div className='join-data'>
                    <label className="label-text" htmlFor="checkSignInPwd">비밀번호확인</label>
                    <div>
                        <input type="password" id="checkSignInPwd" ref={passch} name="m_passch" placeholder="비밀번호 재입력"  value={formData.m_passch}  maxLength="20" required="" onChange={onChange} />
                    </div>
                    <span id='password-check' ref={passcheck}></span>
                </div>
                <div>
                    <button className="join-btn">
                        회원가입
                    </button>
                </div>
            </form>
                <div>                    
                    <Link to="/login" ><button className="join-btn-back" id="backPage">뒤로가기</button></Link>
                </div>
        </Joinpage>
    );
};

export default Join;