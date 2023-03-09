
//타입정의
const SET_ORDER = "SET_ORDER"
const SET_CANCEL = "SET_CANCEL"

export const setOrder = (data) =>({
    type: SET_ORDER,
    data
})

export const setCancel = () =>({
    type: SET_CANCEL
})

const initialState = {
    orders:[]
}

export default function orderAdd(state = initialState,action){
    switch(action.type){
        case SET_ORDER:
            return{
                orders:[...action.data]
            }
        case SET_CANCEL:
            return{
                orders:[]
            }
        default:
            return state
    }

}