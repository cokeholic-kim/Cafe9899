import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/esm/locale"
import styled from 'styled-components';


const ReservationBoard = styled.div`
    display:flex;
    padding:20px;
    >div{height:100%}
    justify-content:space-between;
    .react-datepicker {
    font-size: 1.5em;
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
    >div:nth-child(2){
        width:30%;
        margin:0 1.5%;
        padding:30px 0 ;
        text-align:center;
        p{
            font-size:35px;
            font-weight:600;
        }
        ul{
            margin-top:30px;
            display:flex;
            flex-wrap:wrap;
            
            li{
                background-color:black;
                color:#fff;
                font-size:24px;
                font-weight:600;
                border-radius:10px;
                line-height:60px;
                width:45%;
                margin:2.5%;
                cursor:pointer;
                &.active{background-color:gray}
            }
        }
    }
    >div:nth-child(3){
        width:30%;
        text-align:center;
        h2{
            font-size:40px;
            width:60%;
            padding-bottom:20px;
            margin:30px auto;
            border-bottom:2px solid black;
        }
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
    const today = (new Date())
    const todayformat = `${today.getFullYear()}-
    ${("00"+(today.getMonth()+1).toString()).slice(-2)}-
    ${("00"+(today.getDate().toString())).slice(-2)}
    `
    //li요소에 클릭이벤트 연결
    console.log(today);
    const [pickupDate,setPickupDate] = useState(today);

    const dateFormat = (pickupDate) => {
        if(pickupDate){
          const month = pickupDate.getMonth();
          const monthformat = String(month).padStart(2,"0")
          const date = pickupDate.getDate();
          const dayformat = String(date).padStart(2,"0")
          return `${monthformat}월 ${dayformat}일`
        }
    }
    onclick = (e) =>{
        let list = document.querySelectorAll('#reserveTime li')
        list.forEach(li=>{
            if(e.target === li){
                li.classList.add('active');
            } else {
                li.classList.remove('active')
            }
        })
        console.log(e.target)
    }

    return (
        <div>
            <h1>장바구니</h1>
            <h3>가져갈 날짜와 시간을 선택해주세요</h3>
            <ReservationBoard>
                <DatePicker
                    selected={pickupDate}
                    onChange={(date)=>{
                        setPickupDate(date) 
                        console.log(pickupDate)}}
                    locale={ko}
                    inline
                />
                <div>
                    <p>{dateFormat(pickupDate)}</p>
                    <ul id="reserveTime">
                        <li onClick={onclick}>10:00</li>
                        <li onClick={onclick}>11:00</li>
                        <li onClick={onclick}>12:00</li>
                        <li onClick={onclick}>13:00</li>
                        <li onClick={onclick}>14:00</li>
                        <li onClick={onclick}>15:00</li>
                    </ul>
                </div>
                <div>
                    <h2>Service Details</h2>
                    <ul>
                        <li>메뉴이름  가격  수량  총가격</li>
                        <li>메뉴이름  가격  수량  총가격</li>
                        <li>메뉴이름  가격  수량  총가격</li>
                        <li>메뉴이름  가격  수량  총가격</li>
                    </ul>
                    <ul>
                        <li>총 금 액:  0000</li>
                        <li>할 인 액: -0000</li>
                        <li>청구 금액: 0000</li>
                        <li>포인트 잔액: 0000</li>
                        <li>주문일 : {todayformat}</li>
                    </ul>
                    <button>Next</button>
                </div>
            </ReservationBoard>
        </div>
    );
};

export default Reservation;