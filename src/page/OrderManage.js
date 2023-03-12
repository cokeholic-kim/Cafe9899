import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';

const Orderrow = ({order})=>{
    const navigate = useNavigate()
    let Product = []
    const tdrender = useRef()
    const paintProduct = async ()=>{
        const parseProduct = JSON.parse(order.o_product)
        Product = parseProduct.map(P=>`${P.name} : ${P.count}개`)
    }
    paintProduct()
    const pickupDate = (day)=>{
        const pickup = new Date(day)
        const year = pickup.getFullYear(); // 2023
        const month = pickup.getMonth() + 1; // 3 (January is 0, so add 1 to get the actual month)
        const date = pickup.getDate(); // 16 
        return `${year}년 ${month}월 ${date}일`
    }

    const deletesubmit = ()=>{
        axios.post(`${API_URL}/deleteOrder`,{ordernumber:order.o_ordernumber})
        .then(res=>{
            alert('삭제되었습니다.')
            Location.reload()
        })
        .catch(e=>{
            console.log("에러발생")
            console.log(e)
        })
    }
    return(
        <tr>
            <td>{pickupDate(order.o_pickupday)}</td>
            <td>{order.o_pickuptime}</td>
            <td ref={tdrender}>
                {Product.map((p,index)=><p key={index}>{p}</p>)}
            </td>
            <td>{order.o_totalP}원</td>
            <td>{order.o_name}</td>
            <td><button onClick={deletesubmit}>X</button></td>
        </tr>
    )
}

const OrderStyle = styled.div`
        min-height:70vh;
    table{
        border-collapse:collapse;
        margin:0 auto;
        th,td{border:1px solid #333}
    }
`
async function orderFetch(){
    const response = await axios.get(`${API_URL}/getOrder`);
    return response.data
}

const OrderManage = () => {
    const {loading,error,data} = useAsync(()=>orderFetch(),[])
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null  
    let totalP = 0
    data.forEach(o => {
        totalP += o.o_totalP 
    });
    return (
        <OrderStyle>
            <table>
                <tbody>
                    <tr>
                        <th>픽업날짜</th>
                        <th>픽업시간</th>
                        <th>주문 상품</th>
                        <th>총 금액</th>
                        <th>주문한 사람 이름</th>
                        <th>삭제</th>
                    </tr>
                    {data.map((O,index)=><Orderrow key={index} order={O}/>)}
                    <tr>
                        <td colSpan={6}>
                            <p>총 주문금액 : {totalP} 원</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </OrderStyle>
    );
};

export default OrderManage;