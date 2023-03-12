import React from 'react';
import styled from 'styled-components';

const FlowSectionStyle = styled.div`
    &{
        /* background-color:#D6F9D8; */
        height:50vh;
        position:relative;
        overflow:hidden;
        .flowback{
            div{
                text-align:center;
                img{
                    width:100%;
                    height:auto;
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

const FlowSection = ({imgname,p,header}) => {
    return (
        <FlowSectionStyle>
            <div className='flowback'>
                <div>
                    <img src={`../imgs/${imgname}`} alt="디저트 이미지"/>
                </div>
            </div>
            <div>
                <p>{p}</p>
                <h1>{header}</h1>
                <button>MENU</button>
            </div>
        </FlowSectionStyle>
    );
};

export default FlowSection;