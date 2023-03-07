import axios from 'axios';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../config/apiurl';

const UpdatePassStyle = styled.div`
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

const UpdatePass = () => {
    
    const userid = useSelector(state=>state.logincheck.updateId)
    const navigate= useNavigate();
    const [formData,setFormData]=useState({
        m_pass:"",
        m_passch:"",
        m_email:userid
    })
    const onChange=(e)=>{
        const {name,value}= e.target;
        
        setFormData({
            ...formData,
            [name]:value   
        })
    }
    const onSubmit = (e) => {
        //axios.put은 리소스 전체를 patch는 일부를 업데이트 할수있게 해준다.
        e.preventDefault();
        if(formData.m_pass==formData.m_passch){
            axios.patch(`${API_URL}/updatePass`,formData)
            .then(res=>{
                if(res.data){
                    alert('패스워드가 변경되었습니다.');
                    navigate('/login')
                }
            })
            .catch(e=>{
                console.log(e)
            })
        }else{
            console.log(formData.m_pass)
            console.log(formData.m_passch)
            alert('비밀번호가 일치하지 않습니다.')
        }
    }
    return (
        <UpdatePassStyle>
            <div className="text">비밀번호 변경</div>
            <form onSubmit={onSubmit}>
                <label >비밀번호</label>
                <div>
                    <input value={formData.m_pass} name="m_pass" minLength="10" maxLength="20" onChange={onChange} type="password"placeholder="영문 대,소문자 + 숫자 + 특수문자를 포함하여 10~20자" />
                </div>
                <label>비밀번호 재확인</label>
                <div>
                    <input value={formData.m_passch} name="m_passch" minLength="10" maxLength="20" onChange={onChange} type="password"placeholder="" />
                </div>
            <div>
                <button type="submit">발급받기</button>
            </div>
            </form>
            <div>
                <Link to="/login"><button>뒤로가기</button></Link>
            </div>
        </UpdatePassStyle>
    );
};

export default UpdatePass;