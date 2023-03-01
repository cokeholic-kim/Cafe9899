import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../components/Banner';

const CateringitemStyle = styled.div`
    width:50%;
    margin:30px auto;
    text-align:center;
    background-color:#DDFBE1;
    height:20vh;
    position:relative;
    div{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
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


const Cateringitem = ()=>{
    return(
        <CateringitemStyle>
            <div>
                <h3>상품이름</h3>
                <p>상품설명</p>
                <h4>가격</h4>
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

const Catering = () => {
    return (
        <div>
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
            <Cateringitem/>
            <Cateringitem/>
        </div>
    );
};

export default Catering;