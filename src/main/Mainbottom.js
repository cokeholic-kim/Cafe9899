import React from 'react';
import styled from 'styled-components';

const MainSub = styled.div`
    &{
        position:relative;
        z-index:2;
        width:100%;
        height:350px;
        display:flex;
        &>div{width:50%}
        img{width:100%; height:100%}
        div:nth-of-type(2){
            position:relative;
            background-color:white;
            div{
                position:absolute;
                left:50%;
                top:50%;
                transform:translate(-50%,-50%);
                text-align:center;
                p{margin: 20px 0;}
                button{
                    width:100px;
                    height:30px;
                    background:none;
                    border:3px solid #333;
                    font-weight:800;
                }
            }
        }
    }
`


const Mainbottom = () => {
    return (
            <MainSub>
                <div>
                    <img src='../imgs/muffin.jpg' alt="muffin"/>
                </div>
                <div>
                    <div>
                        <h2>OUR MENU</h2>
                        <h3>enjoy n' fresh</h3>
                        <p>매일굽는 신선한 빵과 쿠키 맛있는 음료들이 기다리고있습니다.</p>
                        <button>MENU</button>
                    </div>
                </div>
            </MainSub>
    );
};

export default Mainbottom;