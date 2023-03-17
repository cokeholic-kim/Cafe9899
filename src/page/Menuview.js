import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';

async function menuFetch(){
    const response = await axios.get(`${API_URL}/getMenu`);
    return response.data
}

const Rowstyle = styled.tr`
    img{
        width:100%;
    }
    td:nth-of-type(3){
        cursor: pointer;
        text-decoration:underline;
    }
`

const Tablerow = ({menu})=>{
    const navigate = useNavigate()
    const onClick = ()=>{
        navigate(`/menuUpdate/${menu.m_number}`)
    }
    return(
        <Rowstyle>
            <td><img src={`${API_URL}/upload/menu/${menu.m_img}`} alt=""/></td>
            <td>{menu.m_number}</td>
            <td onClick={onClick}>{menu.m_name}</td>
            <td>{menu.m_price}</td>
            <td>{menu.m_category}</td>
        </Rowstyle>
    )
}

const Tablestyle = styled.table`
    border-collapse:collapse;
    width: 80%;
    margin:0 auto;
    th,td{
        border:1px solid #333;
        text-align:center;
    }
    tr{
        td:first-child,th:first-child{
            width:130px;
        }
    }
`

const Menuview = () => {
    const {loading,error,data} = useAsync(()=>menuFetch(),[])
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null  
    return (
        <Tablestyle>
            <tbody>
                <tr>
                    <th>이미지</th>
                    <th>상품번호</th>
                    <th>상품명</th>
                    <th>상품가격</th>
                    <th>카테고리</th>
                </tr>
                {data.map((e,index)=><Tablerow key={index} menu={e}/>)}
            </tbody>
        </Tablestyle>
    );
};

export default Menuview;