import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import useAsync from '../customHook/useAsync';
import { AiFillCaretUp,AiFillCaretDown } from "react-icons/ai";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setOrder } from '../modules/oreder';

async function menuFetch(number){
    const response = await axios.get(`${API_URL}/getOneMenu/${number}`);
    return response.data
}

const Detailstyle = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 0;
    display: flex;
    #productImg{
        width: 50%;
        padding: 40px;
        img{
            width:100%;
        }
    }
    #buyInfo{
        width: 50%;
        padding: 40px 20px;
        display: flex;
        flex-direction: column;
        #prodInfo{
            width: 100%;
            margin-bottom: 20px;
            h3{
                width:100%;
                border-top: 3px solid #222831;
                padding: 20px 10px;
                font-size: 18px;
            }
            nav{
                padding: 0 10px;
            }
        }
        #buyPrice{
            width:100%;
            table{
                border-collapse: collapse;
                margin-top: 10px;
                margin-bottom: 40px;
                width: 100%;
                border-top: 2px solid #393E46;
                tbody{height:100px}
                tr{
                    border-bottom: 1px solid #e8e8e8;
                    height:50px;
                    td:nth-child(1){
                        width: 50%;
                        text-align: left;
                    }
                    td:nth-child(2){
                        width: 25%;
                        text-align: center;
                    }

                }
                #amountbox{
                    width: 100%;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    input{
                        width: 25%;
                        padding: 4px 6px;
                        outline: 0;
                        border: 0;
                        border: 1px solid #ccc;
                    }
                    nav{
                        display: flex;
                        flex-direction: column;
                        button{
                            border: 0;
                            background-color: #e8e8e8;
                            color: #393E46;
                            font-size: 10px;
                            width: 20px;
                            height: 12.5px;
                            &:nth-of-type(1){
                                border-top: 1px solid #ccc;
                                border-right: 1px solid #ccc;
                                border-bottom: 1px solid #ccc;
                            }
                            &:nth-of-type(2){
                                border-right: 1px solid #ccc;
                                border-bottom: 1px solid #ccc;
                            }
                        }
                    }
                }
            }
        }
        #buyBtn{
            width: 100%;
            padding: 20px 10px;
            display: flex;
            justify-content: center;
            button{
                margin: 0 10px;
                padding: 15px 40px;
                font-weight: bold;
                color: #222831;
                background-color: #fff;
                border: 3px solid #e8e8e8;
                transition:0.5s;
                &:hover{
                    background-color: black;
                    color:white;
                }
            }
        }
    }
`
const MenuComponent = ({data,formdata,setFormData,increase,decrease,btnClick})=>{
    useEffect(()=>{
        setFormData({
            ...formdata,
            name:data.m_name,
            price:data.m_price,
            desc:data.m_desc,    
        })
    },[])
    return(
        <Detailstyle>            
            <div id="productImg">
                <img src={`${API_URL}/upload/menu/${data.m_img}`} alt="" />
            </div>
            <div id="buyInfo">
                <div id="prodInfo">
                    <h3>{data.m_name}</h3>
                    <nav>
                        <p>
                            <span>판매가</span><span><strong>{data.m_price} 원</strong></span>
                        </p>
                    </nav> 
                </div>
                <div id="buyPrice">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <span>상품명</span>
                                </td>
                                <td>
                                    <span>상품수</span>
                                </td>
                                <td>
                                    <span>가격</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>{data.m_name}</span>
                                </td>
                                <td id="amountbox">
                                    <input type="text" name="count" id="amount" value={formdata.count} readOnly/>
                                    <nav>
                                        <button onClick={increase}><AiFillCaretUp/></button>
                                        <button onClick={decrease}><AiFillCaretDown/></button>
                                    </nav>
                                </td>
                                <td>
                                    <span>{data.m_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span> 
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colSpan="3">
                                    TOTAL : <span><strong>{(data.m_price * formdata.count).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원</strong></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="buyBtn">
                    <button onClick={()=>btnClick([formdata])}>바로구매</button>
                </div>
            </div>
        </Detailstyle>    

    )
}
const MenuDetail = () => {
    const navigate = useNavigate()
    const {m_number} = useParams()
    const dispatch = useDispatch()
    const [formdata,setFormData] = useState({
        name:"",
        price:"",
        desc:"",
        count:0
    })
    const increase = ()=>{
        setFormData({
            ...formdata,
            count:formdata.count+1
        })
    }
    const decrease = ()=>{
        setFormData({
            ...formdata,
            count:formdata.count-1
        })
    }
    const btnClick = (data)=>{
        dispatch(setOrder(data))
        navigate("/Reservation")
    }
    const {loading,error,data} = useAsync(()=>menuFetch(m_number),[])
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null
    return (
        <MenuComponent 
        data={data[0]} 
        formdata={formdata} 
        setFormData={setFormData}
        increase={increase}
        decrease={decrease}
        btnClick={btnClick}
        />
    );
};

export default MenuDetail;