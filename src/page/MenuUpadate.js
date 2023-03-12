import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';

const Tablestyle = styled.table`
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
`



const UpdateTable = ({formData,data,setFormData,onChange,onChangeImage,onDelete})=>{
    useEffect(()=>{
        setFormData({
            ...formData,
            m_name:data[0].m_name,
            m_price:data[0].m_price,
            m_desc:data[0].m_desc,
            m_img:data[0].m_img,
            m_category:data[0].m_category
        })
    },[data,setFormData])

    return(
        <Tablestyle>
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
                            <option value="">{formData.m_category}</option>
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
                        <button type="submit">수정</button>
                        <button type="reset">취소</button>
                        <button type="reset" onClick={onDelete}>삭제</button>
                    </td>
                </tr>
            </tbody>
        </Tablestyle>
    )
}

async function menuFetch(number){
    const response = await axios.get(`${API_URL}/getOneMenu/${number}`);
    return response.data
}

const MenuUpadate = () => {
    const navigate = useNavigate();
    const {m_number} = useParams();


    const [formData,setFormData] = useState({
        m_number:m_number,
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
        console.log(formData)
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
        axios.post(`${API_URL}/menuUpdate`,formData)
        .then(res=>{
            console.log(res)
            alert("등록되었습니다.")
            navigate('/Menus')
        })
        .catch(e=>console.log(e))
    }

    const onDelete = (e)=>{
        e.preventDefault();
        const confirm = window.confirm("데이터를 삭제 하시겠습니까?")
        if(confirm){
            axios.post(`${API_URL}/menuDel`,{m_number:m_number})
            .then(res=>{
                alert("삭제되었습니다")
                navigate('/Menus')
            })
            .catch(e=>console.log(e))
        }
    }


    const {loading,error,data} = useAsync(()=>menuFetch(m_number),[])
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null
    return (
        <div>
            <div className='inner'>
                <form onSubmit={onSubmit}>
                    <UpdateTable 
                    data={data} 
                    formData={formData} 
                    setFormData={setFormData} 
                    onChange={onChange} 
                    onChangeImage={onChangeImage}
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                   />
                </form>
            </div>
        </div>
    );
};

export default MenuUpadate;