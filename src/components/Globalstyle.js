import { createGlobalStyle } from "styled-components";


const Globalstyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    a{text-decoration:none; color:inherit;}
    li{list-style:none}
    .inner {
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    }
    /* .banner{
        text-align:center;
        height:300px;
        padding-top:4%;
        color:#fff;
        background-color:#96F2E0;
        p{font-size:30px;font-weight:700;}
        h1{letter-spacing:10px; font-size:45px;}
    } */


`

export default Globalstyle