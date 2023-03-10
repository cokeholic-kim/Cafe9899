import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoitemStyle = styled.div`
text-align:center;
    >div{
        width:800px;
        padding:150px 0;
        margin:0 auto;
        img{
            width:100%;
        }
    }
    a {
        button{
            padding: 20px 10px;
            margin: 30px 0;
            border-radius:20px;
            border-width:5px;
            background-color:white;
            font-weight:700;
            font-size:28px;
            &:hover{
                border-color:skyblue;
            }
        }        
    }
`
const Noitem = () => {
    return (
        <NoitemStyle>
            <div>
                <img src='../imgs/no_item.png'/>
            </div>
            <Link to="/Catering"><button>상품 담으러 가기</button></Link>
        </NoitemStyle>
    );
};


export default Noitem;