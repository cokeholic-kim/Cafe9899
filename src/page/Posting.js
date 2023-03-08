import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        button{
            background-color: #333;
            color: #fff;
            margin-right: 8px;
            padding: 10px 40px;
        }
        .buttons{
            text-align:center;
        }

        .postimage{
            margin: 0 auto;
            width: 500px;
            position:relative;
            img{
                text-align:center;
                width:500px;
                height:100%;
                border:1px solid #ccc;
            }
            .bg{
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
                width:400px;
                text-align:center
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
        ul{
            display:flex;
            flex-wrap:wrap;
            li{margin:0 10px}
        }


    }


`

const Posting = () => {
    const navigate = useNavigate()
    const hashtagInput = useRef()
    const [formData,setFormData] = useState({
        p_desc:"",
        p_hashtag:[],
        p_img:"",
    })

    const onChangeImage = (e) =>{
        console.log("실행")
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
    const onChange = (e)=> {
        const {name,value} = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        const {p_hashtag} = formData
        const newFormData = {
            ...formData,
            p_hashtag:JSON.stringify(p_hashtag)
        }
        console.log(newFormData)
        axios.post(`${API_URL}/posts`,newFormData)
        .then(res=>{
            console.log(res)
            alert("등록되었습니다.")
            navigate('/')
        })
        .catch(e=>console.log(e))

    }
    
    return (
        <Poststyle>
            <div className='inner'>
                <Title title="Posting"/>
                <form onKeyDown={preventEnter} onSubmit={onSubmit}>
                    <table>
                        <tbody>
                                <tr>
                                    <td>상품 이미지</td>
                                    <td>
                                        <label htmlFor="file">
                                            <div className="btn-upload">파일 업로드하기</div>
                                        </label>
                                        <input id='file' type="file" name="p_img" onChange={onChangeImage}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>설명</td>
                                    <td><textarea name="p_desc" rows={7} cols={60} value={formData.p_desc} onChange={onChange}/></td>
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
                                        <div className='postimage'>
                                            <div className='bg'></div>
                                            <img src={`${API_URL}/upload/post/${formData.p_img}`} alt=''/>
                                            <p>{formData.p_hashtag.map(tag=>`#${tag} `)}</p>
                                        </div>
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="buttons">
                                        <button type="submit">등록</button>
                                        <button type="reset">취소</button>
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