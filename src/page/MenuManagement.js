import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../config/apiurl';
import { getCookie } from '../util/cookie';

const Menus = styled.div`
    table{
        border-collapse: collapse;
        width: 100%;
        min-height:70vh;
        tr{
            display: table-row;
            vertical-align: inherit;
            border-color: inherit; 
        }
        td{
            border-bottom: 1px solid #eee;
            padding: 10px;
        }
        input[type=text] {
            background-color: #eee;
            border: none;
            line-height: 32px;
            margin: 4px 0;
            outline: none;
            width: 100%;
        }
        #file{
                display:none;
        }
        div img{
            margin-top:20px;
            width:100px;
            border:1px solid #ccc;
        }
        button{
            background-color: #333;
            color: #fff;
            margin-right: 8px;
            padding: 6px 30px;
        }

        .btn-upload {
            width: 150px;
            height: 30px;
            background: #fff;
            border: 1px solid rgb(77,77,77);
            border-radius: 10px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                background: rgb(77,77,77);
                color: #fff;
            }
        }
    }
`

const MenuManagement = () => {
    const navigate = useNavigate()
    const isLogin = useSelector(state=>state.logincheck.isLogin)
    const username = getCookie("username")
    const [formData,setFormData] = useState({
        m_name:"",
        m_price:0,
        m_desc:"",
        m_img:"",
        m_category:""
    })

    const onChange = (e) => {
        const { name , value } = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    } 

    const onChangeImage = (e) =>{
        const imageFormData = new FormData();
        imageFormData.append('img',e.target.files[0]);
        console.log(e.target.files[0])
        axios.post(`${API_URL}/upload`,imageFormData,{
            headers:{'content-type':'multipart/formdata'}
        }).then(res=>{
            console.log(res.data.imageURL)
            setFormData({
                ...formData,
                m_img:res.data.imageURL
            })
            console.log(formData)
        })
        .catch(e=>console.log(e))
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        axios.post(`${API_URL}/menus`,formData)
        .then(res=>{
            console.log(res)
            alert("등록되었습니다.")
            navigate('/Menu')
        })
        .catch(e=>console.log(e))

    }
    return (
        <Menus>
            <div className='inner'>
                <form onSubmit={onSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>메뉴이름</td>
                                <td><input type="text" name="m_name" value={formData.m_name} onChange={onChange}/></td>
                            </tr>
                            <tr>
                                <td>가격</td>
                                <td><input type="number" name="m_price" value={formData.m_price} onChange={onChange} step={100}/></td>
                            </tr>
                            <tr>
                                <td>카테고리</td>
                                <td>
                                    <select name='m_category' onChange={onChange}>
                                        <option value=""></option>
                                        <option value="bread">Bread</option>
                                        <option value="drink">Drink</option>
                                        <option value="giftset">GiftSet</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>설명</td>
                                <td><textarea name="m_desc" rows={7} cols={60} value={formData.m_desc} onChange={onChange}/></td>
                            </tr>
                            <tr>
                                <td>상품 이미지</td>
                                <td>
                                    <label htmlFor="file">
                                        <div className="btn-upload">파일 업로드하기</div>
                                    </label>
                                    <input id='file' type="file" name="m_img" onChange={onChangeImage}/>
                                {formData.m_img && <div><img src={`${API_URL}/upload/menu/${formData.m_img}`} alt=''/></div>}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button type="submit">등록</button>
                                    <button type="reset">취소</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </Menus>
    );
};

export default MenuManagement;