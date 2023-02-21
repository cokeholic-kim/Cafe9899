import React from 'react';
import styled from 'styled-components';

const FlowSectionStyle = styled.div`
    &{
        background-color:#D6F9D8;
        height:50vh;
        position:relative;
        .flowback{
            position: relative;
            top:-90%;
            height:170vh;
            div{
                position:sticky;
                top:18%;
                text-align:center;
                img{
                    padding:50px;
                    width:60%;
                }
            }
        }
        div:nth-of-type(2){
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            width:90%;
            color:#fff;
            position:absolute;
            text-align:center;
        }
    }
`

const FlowSection = () => {
    return (
        <FlowSectionStyle>
            <div className='flowback'>
                <div>
                    <img src='../imgs/scone.png'/>
                </div>
            </div>
            <div>
                <p>ENJOY</p>
                <h1>DAIRY FREE</h1>
                <button>MENU</button>
            </div>
        </FlowSectionStyle>
    );
};

export default FlowSection;