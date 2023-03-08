import axios from 'axios';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Title from '../components/Title';
import { API_URL } from '../config/apiurl';

const Poststyle = styled.div`
    table{
        border-collapse: collapse;
        width: 100%;
        min-height:40vh;
        tr{
            display: table-row;
            vertical-align: inherit;
            border-color: inherit; 
        }
        td{
            border-bottom: 1px solid #eee;
            padding: 10px;
        }
        input[type=text] {
            background-color: #eee;
            border: none;
            line-height: 32px;
            margin: 4px 0;
            outline: none;
            width: 100%;
        }
        #file{
                display:none;
        }
        .btn-upload {
            width: 150px;
            height: 30px;
            background: #fff;
            border: 1px solid rgb(77,77,77);
            border-radius: 10px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                background: rgb(77,77,77);
                color: #fff;
            }
        }
        div{
            text-align:center;
            img{
                text-align:center;
                margin-top:20px;
                width:500px;
                border:1px solid #ccc;
            }
        }
        ul{
            display:flex;
            flex-wrap:wrap;
            li{margin:0 10px}
        }

    }


`

const Posting = () => {
    const hashtagInput = useRef()
    const [formData,setFormData] = useState({
        p_hashtag:[],
        p_img:"",
    })

    const onChangeImage = (e) =>{
        const imageFormData = new FormData();
        imageFormData.append('imgpost',e.target.files[0]);
        axios.post(`${API_URL}/uploadPost`,imageFormData,{
            headers:{'content-type':'multipart/formdata'}
        }).then(res=>{
            console.log(res.data.imageURL)
            setFormData({
                ...formData,
                p_img:res.data.imageURL
            })
        })
        .catch(e=>console.log(e))
    }
    const preventEnter = (e)=>{
        if(e.keyCode === 13){
            e.preventDefault()
        }
    }

    const onChangeHash = (e) =>{
        if(e.keyCode === 13){
            const {p_hashtag} = formData;
            p_hashtag.push(e.target.value)
            hashtagInput.current.value = "";
            setFormData({
                ...formData,
                p_hashtag:[...p_hashtag]
            })
        }
    }
    
    return (
        <Poststyle>
            <div className='inner'>
                <Title title="Posting"/>
                <form onKeyDown={preventEnter}>
                    <table>
                        <tbody>
                                <tr>
                                    <td>상품 이미지</td>
                                    <td>
                                        <label htmlFor="file">
                                            <div className="btn-upload">파일 업로드하기</div>
                                        </label>
                                        <input id='file' type="file" name="p_img" onKeyDown={onChangeImage}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>해시태그</td>
                                    <td>
                                        <label htmlFor='hash'>입력한후 Enter를 눌러주세요</label>
                                        <input id='hash' type="text" name="p_hashtag" ref={hashtagInput} onKeyDown={onChangeHash}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <ul>
                                            {formData.p_hashtag.map((tag,index)=><li key={index}>#{tag}</li>)}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                    {formData.p_img && 
                                        <div>
                                            <img src={`${API_URL}/upload/post/${formData.p_img}`} alt=''/>
                                        </div>
                                    }
                                    </td>
                                </tr>

                        </tbody>
                    </table>
                </form>
            </div>
        </Poststyle>
    );
};

export default Posting;