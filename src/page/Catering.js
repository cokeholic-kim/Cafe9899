import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../components/Banner';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';

const CateringitemStyle = styled.div`
    width:22%;
    margin:1.5%;
    text-align:center;
    background-color:rgba(221,251,225,0.4);
    border-radius:30px;
    min-height:20vh;
    padding:40px;
    div{
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
        button{
            margin-top:10px;
            width:130px;
            height:40px;
            border:none;
            background-color:#333;
            color:#fff;
            font-weight:700;
            font-size:18px;
        }
    }
`


const Cateringitem = ({img,price,desc,name})=>{
    return(
        <CateringitemStyle>
            <div>
                <img src={`${API_URL}/upload/menu/${img}`} alt=""/>
                <h3>{name}</h3>
                <p>{desc}</p>
                <h4>{price} 원</h4>
                <Link to="/Reservation"><button>주문하기</button></Link>
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
`

async function menuFetch(){
    const response = await axios.get(`${API_URL}/getMenu`);
    return response.data
}

const Catering = () => {

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
        </Caterstyle>
    );
};

export default Catering;