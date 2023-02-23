import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/esm/locale"
import styled from 'styled-components';

const MyDatePicker = styled(DatePicker)`
    width:100%;
    height:3rem;
    font-size:1.6rem;
    font-weight:bold;
    background-color:transparent;
    color:white;
    border: 1px solid;
`

const ReservationBoard = styled.div`
    display:flex;

`

const Reservation = () => {
    const [pickupDate,setPickupDate] = useState(new Date());

    const dateFormat = (pickupDate) => {
        if(pickupDate){
          const month = pickupDate.toLocaleString("ko",{month:"long"});
          const monthformat = String(month).length ===1 ? '0'+month: month;
          const date = pickupDate.getDate();
          const dayformat = String(date).length ===1 ? '0'+date :date ;
          return `${month} ${dayformat}일`
        }
    }

    return (
        <div>
            <h1>장바구니</h1>
            <h3>가져갈 날짜와 시간을 선택해주세요</h3>
            <ReservationBoard>
                <MyDatePicker
                    selected={pickupDate}
                    onChange={(date)=>{
                        setPickupDate(date) 
                        console.log(pickupDate)}}
                    locale={ko}
                    inline
                />
                <div>
                    <p>{dateFormat(pickupDate)}</p>
                    <ul>
                        <li>10:00</li>
                        <li>11:00</li>
                        <li>12:00</li>
                        <li>13:00</li>
                        <li>14:00</li>
                        <li>15:00</li>
                    </ul>
                </div>
                <div>
                    <h2>Service Details</h2>
                    <p>
                        메뉴이름<br/>
                        픽업일자<br/>
                        <span>
                        주문한사람 이름<br/>
                        갯수<br/>
                        가격
                        </span>
                    </p>
                    <button>Next</button>
                </div>
            </ReservationBoard>
        </div>
    );
};

export default Reservation;