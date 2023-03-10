import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../components/Banner';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';
import { setOrder } from '../modules/oreder';

const CateringitemStyle = styled.div`
    width:22%;
    margin:1.5%;
    text-align:center;
    background-color:rgba(221,251,225,0.4);
    border-radius:30px;
    min-height:20vh;
    padding:40px;
    > div{
        height:100%;
        img{
            width: 100%;
            border-radius:20px;
        }
        h3{
            font-size:30px;
            font-weight:500;
        }
        p{
            margin-top:10px;
        }
        h4{
            margin-top:10px;
        }
        .countbutton{
            width:100%;
            background-color:white; 
            display:flex;
            align-items:center;
            button{
                width:30%;
                background:none;
                :nth-of-type(1){
                    border:none;
                    border-right:1px solid #cbd2de;
                }
                :nth-of-type(2){
                    border:none;
                    border-left:1px solid #cbd2de;
                }
            }
            em{
                display:block;  
                width:40%;
            }
        }
    }
`


const Cateringitem = ({img,price,desc,name})=>{
    const count = useRef()
    const dispatch = useDispatch()
    const orders = useSelector(state=>state.orderAdd.orders)
    // dispatch 해줄 새로운배열
    let neworders = [...orders]
    const Increase = ()=>{
        if(count.current.innerText > 9){
            alert("10개 이상의 주문은 전화부탁드립니다.")
        }
        else{
            count.current.innerText++
            if(Number(count.current.innerText) === 1){
                neworders.push({
                    name,
                    price,
                    desc,
                    count:Number(count.current.innerText)
                })
                console.log("배열에 추가")
                console.log(neworders)
                dispatch(setOrder(neworders))
            }else{
                // 배열값을 받아서 같은 상품의이름을 가진 객체가 있으면 수정
                let index = neworders.findIndex(e => e.name === name);
                neworders[index] = {
                    ...neworders[index],
                    count:Number(count.current.innerText)
                }
                console.log(neworders)
                dispatch(setOrder(neworders))
            }
        }
    }
    const Decrease = ()=>{
        if(count.current.innerText>0){
            count.current.innerText--
            let index = neworders.findIndex(e => e.name === name);
            neworders[index] = {
                ...neworders[index],
                count:Number(count.current.innerText)
            }
            dispatch(setOrder(neworders))
            if(Number(count.current.innerText) === 0){
                console.log("배열에서 빼주기")
                let delorders = neworders.filter(e=>e.name !== name)
                dispatch(setOrder(delorders))
            }
        }
    }

    return(
        <CateringitemStyle>
            <div>
                <img src={`${API_URL}/upload/menu/${img}`} alt=""/>
                <h3>{name}</h3>
                <p>{desc}</p>
                <div className='countbutton'>
                    <button onClick={Decrease}>-</button>
                    <em ref={count}>0</em>
                    <button onClick={Increase}>+</button>
                </div>
                <h4>{price} 원</h4>
            </div>
        </CateringitemStyle>
    )
}

const DescStyle = styled.div`
    margin-top:40px;
    height:25vh;
    text-align:center;
    p{
        width:40%;
        margin:30px auto 0 auto;
    }
`

const Caterstyle = styled.div`
    .item-box{
        display:flex;
        flex-wrap:wrap;
    }
    >button{
        text-align:center;
        display:block;
        margin:20px auto;
        width:200px;
        height:60px;
        border:none;
        background-color:#333;
        color:#fff;
        font-weight:700;
        font-size:18px;
    }


`

async function menuFetch(){
    const response = await axios.get(`${API_URL}/getMenu`);
    return response.data
}

const Catering = () => {
    const navigate = useNavigate()
    const orders = useSelector(state=>state.orderAdd.orders)
    const Login = useSelector(state=>state.logincheck.isLogin)
    const onBtnClick = ()=>{
        if(Login){
            if(orders.length === 0){
                alert("상품을 선택해 주세요")
            }else{
                navigate("/Reservation")
            }
        }else{
            alert("로그인이 필요합니다.")
            navigate("/Login")
        }
    }
    const {loading,error,data} = useAsync(()=>menuFetch(),[])
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null  
    return (
        <Caterstyle>
            <Banner bannerColor="#ABEBB3" TopTitle="CATERING FOR SPECIALDAY" BottomTitle="CATERING"/>
            <DescStyle>
                <h2>THE BEST DESSERT'S PACK</h2>
                <h3>For the best party!</h3>
                <p>
                    I'm a paragraph. Click here to add your own text and edit me. It’s easy. 
                    Just click “Edit Text” or double click me to add your own content and make changes to the font. 
                    Feel free to drag and drop me anywhere you like on your page. 
                    I’m a great place for you to tell a story and let your users know a little more about you.
                </p>
            </DescStyle>
            <div className='item-box'>
                {data.map(m=><Cateringitem key={m.m_number} 
                name={m.m_name} img={m.m_img} 
                price={m.m_price} desc={m.m_desc}/>)}
            </div>
            <button onClick={onBtnClick}>주문하기</button>:
        
            
        </Caterstyle>
    );
};

export default Catering;