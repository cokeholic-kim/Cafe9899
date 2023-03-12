import React, { useReducer, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/esm/locale"
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getCookie} from '../util/cookie'
import Noitem from '../components/Noitem';
import { setCancel } from '../modules/oreder';
import { API_URL } from '../config/apiurl';
import axios from 'axios';

const Titlestyle = styled.h2`
    font-size:40px;
    width:60%;
    padding-bottom:20px;
    margin:30px auto;
    border-bottom:2px solid black;

`
const ReservationTitle = ({text})=>{
    return(
        <Titlestyle>{text}</Titlestyle>
    )
}

const ReservationBoard = styled.div`
    display:flex;
    padding:20px;
    justify-content:space-between;
    >div{
        width:28%;
        height:100%
    }
    .react-datepicker {
    font-size: 100%;
    }
    .react-datepicker__header {
        background-color:black;
        padding-top: 0.8em;
    }
    .react-datepicker__navigation-icon::before{
        border-color:#fff;
    }
    .react-datepicker__month {
    margin: 0.4em 1em;
    }
    .react-datepicker__day-name,
    .react-datepicker__day {
        width: 2.5em;
        line-height: 2.5em;
        margin: 0.166em;
    }
    .react-datepicker__day-name{
        color:#fff;
        font-weight:600;
    }
    .react-datepicker__current-month {
    font-size: 1.2em;
    color:#fff;
    }
    .react-datepicker__navigation {
    top: 1em;
    line-height: 1.7em;
    border: 0.45em solid transparent;
    }
    .react-datepicker__navigation--previous {
    border-right-color: #ccc;
    left: 1em;
    border-right-color:#fff;
    }
    .react-datepicker__navigation--next {
    border-left-color: #ccc;
    right: 1em;
    border-left-color:#fff;
    }
    .react-datepicker__day--selected{
        background-color:black;
        color:#fff;
        &:hover{
            background-color:gray;
        }
    }
    table{
        margin: 0 auto;
        width:60%;
        padding-bottom:20px;
        text-align:left;
        border-bottom:1px solid #777;
        margin-bottom:10px;
        tbody{
            width: 100%;
            margin: 0 auto;
            th{font-size:80.5%; padding-bottom:10px;}
        }
    }
    >div:nth-child(2){
        width:30%;
        text-align:center;
        p{
            margin:20px auto;
            width:97%;
            background-color:black;
            padding: 20px 0;
            border-radius:20px;
            color:#fff;
            font-size:22px;
            font-weight:700;
            
        }
        ul{
            display:flex;
            flex-wrap:wrap;
            li{
                width:47%;
                padding:20px 0;
                margin:1.25%;
                background-color:black;
                color:#fff;
                font-size:22px;
                font-weight:700;
                border-radius:20px;
                &.active{
                    background-color:gray;
                }
            }
        }

    }
    >div:nth-child(3){
        width:30%;
        text-align:center;
        ul{
            margin:0 auto;
            width:60%;
            text-align:left;
            .total:last-child{
                border-top:2px dashed black;
                text-align:right;
            }
        }
        button{
            margin-top:50px;
            width:60%;
            height:50px;
            background-color:black;
            color:#fff;
            font-size:24px;
            border-radius:10px;
            letter-spacing:5px;
            font-weight:700;
        }
    }


`

const Reservation = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userPoint = getCookie("userPoint")

    const shopcart = useSelector(state=>state.orderAdd.orders)
    const today = (new Date())
    const todayformat = `${today.getFullYear()}-
    ${("00"+(today.getMonth()+1).toString()).slice(-2)}-
    ${("00"+(today.getDate().toString())).slice(-2)}
    `
    const [orderData,setOrderData] = useState({
        o_product:JSON.stringify(shopcart.map(e=>({name:[e.name],count:e.count}))),
        o_pickupday:"",
        o_pickuptime:"",
        o_totalP:total(),
        o_name:getCookie("userName")
    })
    console.log(orderData)
    const [pickupDate,setPickupDate] = useState(today);
    const dateFormat = (pickupDate) => {
        if(pickupDate){
            
          const month = pickupDate.getMonth();
          const monthformat = String(month+1).padStart(2,"0")
          const date = pickupDate.getDate();
          const dayformat = String(date).padStart(2,"0")
          const year = pickupDate.getFullYear()
          return `${year}-${monthformat}-${dayformat}`
        }
    }
    const onclick = (e) =>{
        let list = document.querySelectorAll('#reserveTime li')
        list.forEach(li=>{
            if(e.target === li){
                li.classList.add('active');
            } else {
                li.classList.remove('active')
            }
        })
        if(e.target.tagName === "LI"){
            setOrderData({
                ...orderData,
                o_pickuptime:e.target.innerText
            })
        }
    }

    function total (){
        let num = 0
        shopcart.forEach(e=>num+=Number(e.price))
        return num
    }

    const onPay = ()=>{
        console.log(orderData)
        // 결제가 완료되면
        // store orders초기화 디스패치
        axios.post(`${API_URL}/reservation`,orderData)
        .then(res=>{
            alert('등록되었습니다')
            dispatch(setCancel())
            navigate("/")
        })
        .catch(e=>{
            console.log("에러발생")
            console.log(e)
        })
        // 주문상품,갯수,픽업시간,총금액 데이터베이스에 저장        
    }

    if(shopcart.length === 0) return <Noitem/>
    return (
        <div>
            <h1>장바구니</h1>
            <h3>가져갈 날짜와 시간을 선택해주세요</h3>
            <ReservationBoard>
                <div>
                <ReservationTitle text="PickUp Date"/>
                <DatePicker
                    selected={pickupDate}
                    onChange={(date)=>{
                        setPickupDate(date)
                        setOrderData({
                            ...orderData,
                            o_pickupday:dateFormat(date)
                        })

                        console.log(orderData.o_pickupday)}}
                    locale={ko}
                    inline
                />
                </div>
                <div>
                    <ReservationTitle text="PickUp Time"/>
                    <p>{dateFormat(pickupDate)}</p>
                    <ul id="reserveTime" onClick={onclick}>
                        <li>10:00</li>
                        <li>11:00</li>
                        <li>12:00</li>
                        <li>13:00</li>
                        <li>14:00</li>
                        <li>15:00</li>
                    </ul>
                </div>
                <div>
                    <ReservationTitle text="Service Details"/>
                    <table>
                        <tbody>
                            <tr>
                            <th>상품명</th>
                            <th>가격</th>
                            <th>개수</th>
                            <th>총 금액</th>
                            </tr>
                            {shopcart.map((e,index)=><tr key={index}>
                                <td>{e.name}</td>                                
                                <td>{e.price}</td>                                
                                <td>{e.count}</td>                                
                                <td>{e.price * e.count}</td>                                
                            </tr>)}
                        </tbody>
                    </table>
                    <ul>
                        <li>총 금 액: {total()}</li>
                        <li>할 인 액: { total() > 100000 ? "5%" : "0%"}</li>
                        <li>청구 금액: {total() > 100000 ? total()*(1-0.05) : total()} 원</li>
                        <li>포인트 잔액: {userPoint}</li>
                        <li>픽업일 : {orderData.o_pickupday} {orderData.o_pickuptime}</li>
                    </ul>
                    <button onClick={onPay}>결제하기</button>
                </div>
            </ReservationBoard>
        </div>
    );
};

export default Reservation;