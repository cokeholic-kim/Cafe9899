const SET_LOGIN = "SET_LOGIN";
const SET_LOGOUT = "SET_LOGOUT";
const SET_ID ="SET_ID";

export const setLogin= () =>({
    type:SET_LOGIN
})
export const setLogout= ()=>({
    type:SET_LOGOUT
})
export const setId= (id)=>({
    type:SET_ID,
    id:id
})

const initialState = {
    isLogin:false,
    updateId:""
}

export const goToHome = (navigate) => () =>{
    navigate('/')
}

export default function logincheck(state=initialState,action){
    switch(action.type){
        case SET_LOGIN:
            return {
                ...state,
                isLogin:true
            };
        case SET_LOGOUT:
            return {
                ...state,
                isLogin:false
            };
        case SET_ID:
            return {
                ...state,
                updateId:action.id
            };
        default:
            return state;
    }
}

