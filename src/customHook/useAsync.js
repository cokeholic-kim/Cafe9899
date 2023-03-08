import { useEffect, useReducer } from "react";

const initialState = {
    loading:false,
    data:null,
    error:null,
}

function reducer(state,action){
    switch(action.type){
        case "LOADING":
            return{
                loading:true,
                data:null,
                error:null,
            }
        case "SUCCESS":
            return{
                loading:false,
                data:action.data,
                error:null,
            }
        case "ERROR":
            return{
                loading:false,
                data:null,
                error:action.error,
            }
        default:
            return state;
    }
}

const useAsync = (Callback,deps=[])=>{
    const [state,dispatch] = useReducer(reducer,initialState);
    // 데이터요청
    const fetchData = async ()=>{
        dispatch({type:"LOADING"})
        try{
            const data = await Callback();
            dispatch({
                type:"SUCCESS",
                data
            })
        }
        catch(e){
            dispatch({
                type:"ERROR",
                error:e
            })
        }
    }
    useEffect(()=>{
        fetchData()
    },[...deps])
    return state
}

export default useAsync;