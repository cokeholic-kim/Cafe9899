import React from 'react';
import styled from 'styled-components';

const MainTopstyle = styled.div`
    &{
        background-color:#fffbdb;
        text-align:center;
        width:100%;
        height:100vh;
        position:relative;
        img{
            position:absolute;
            top:50%;
            left:60%;
            transform:translate(-50%,-50%);
            width:70%;
        }
        div{
            position:absolute;
            top:50%;
            left:55%;
            transform:translate(-50%,-50%);
            color: #fff;
            width:100%;
            p{font-size:60px;}
            h1{font-size:75px; width:100%}
            button{
                width:150px;
                height:35px;
                border:3px solid #fff;
                color:#fff;
                font-weight:700;
                font-size:20px;
                background:none;
            }
        }

    }
`


const Maintop = () => {
    return (
            <MainTopstyle>
                <img src='../imgs/scone.png' alt="scone"/>
                <div>
                    <p>Hand Crafted</p>
                    <h1>Bread and Cookies</h1>
                    <button>MENU</button>
                </div>
            </MainTopstyle>
    );
};

export default Maintop;