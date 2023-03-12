import React from 'react';
import styled from 'styled-components';
import { API_URL } from '../config/apiurl';

const Listimg = styled.li`
    &{
        height:100%;
        flex: 0 0 25%;
        position:relative;
        img{
            width:100%;
            height:100%;
        }
        div{
            position:absolute;
            left:0;
            top:0;
            width:100%;
            height:100%;
            transition:0.3s;
        }
        p{
            color:#fff;
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%,-50%);
            transition:0.3s;
            color:rgba(0,0,0,0);
            width:80%;
        }
        &:hover{
                p{
                    font-size:18px;
                    color:#fff;
                }
                div{
                    background-color:rgba(0,0,0,0.5)
                }
            }

    }
`

const Sliderimgs = ({onClick,data}) => {
    const hashes = JSON.parse(data.p_hashtag)
    return (
        <Listimg onClick={()=>onClick(data)}>
                <img src={`${API_URL}/upload/post/${data.p_img}`} alt=""/>
                <div>
                </div>
                <p>{hashes.map(tag=>`#${tag} `)}</p>
        </Listimg>
);
};

export default Sliderimgs;