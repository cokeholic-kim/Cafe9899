import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../config/apiurl';
import { setId } from '../modules/logincheck'

const FindPassStyle = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 50%;
    padding: 30px;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    width: 410px;
    box-shadow: 0 0 8px rgb(0 0 0 / 10%);

    .text{
        color: #000;
        font-size: 35px;
        font-weight: 600;
        text-align: center;
    }
    form{
        label{
            color: #999;
            font-size: 12px;
        }
        input{
            background-color: #fafafa;
            border: none;
            font-size: .8rem;
            height: 32px;
            width: 100%;
        }
    }
    .small-text{
            color: #616161;
            font-size: 12px;
            letter-spacing: 1px;
            padding: 8px;
            text-align: center;
    }

    button{
            border: none;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            height: 45px;
            margin-top: 24px;
            width: 100%;
            background-color: #616161;
    }

`

const FindPass = () => {
    const dispatch=useDispatch()
    const [idInfo,setIdinfo]= useState(false)
    const [findPassdata,setFindPassData]=useState({
        userEmail:""
    })
    const onChange=(e)=>{
        const {name,value}= e.target;
        setFindPassData({
            [name]:value   
        })
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        axios.post(`${API_URL}/findPass`,findPassdata)
        .then(res=>{
            alert("이메일이 확인되었습니다.")
            setIdinfo(res.data)
            dispatch(setId(res.data))
        })
        .catch(e=>{
            alert("이메일을 찾을수없습니다.")
            console.log(e)}
        )   
    }
    return (
        <FindPassStyle>
            {idInfo? <div className="text">비밀번호 변경</div>:<div className="text">비밀번호 찾기</div>}
            <form onSubmit={onSubmit}>
                {idInfo?<></>:<label className="label-text">이메일</label>}
                <div className="uk-form-controls">
                    { idInfo? 
                    <></>:
                    <input value={FormData.m_email} 
                        name="userEmail" onChange={onChange} 
                        type="text" placeholder="이용중인 이메일을 입력해주세요" />}
                </div>
                    {idInfo? <></>:
                        <div className="small-text">
                            회원가입시 등록하셨던 이메일 주소를 입력해주시면 새로운 비밀번호를 사용하실수 있습니다. 
                        </div>}
                <div>
                    {idInfo ? <Link to="/updatePass"><button>비밀번호 변경하기</button></Link>:
                            <button type="submit">발급받기</button>}
                </div>
            </form>
            {idInfo ?<></>:<div className="small-text">* 가입한 이메일이 기억나지 않는다면 새로 가입해주세요.</div>}
            <div>
                <Link to="/login"><button>뒤로가기</button></Link>
            </div>
        </FindPassStyle>
    );
};

export default FindPass;