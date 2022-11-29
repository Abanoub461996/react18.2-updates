import {configureStore} from "@reduxjs/toolkit";

const SELECTITEM ="SELECTITEM";
let initialState ={product:{}}
export const selectProductAction = (payload)=>{
    return {
        type:SELECTITEM,
        payload
    }
}

const productsReducer =(state = initialState, action)=>{
    if(action.type === SELECTITEM){
        return {
            ...state,
            product : action.payload
        }
    }else{
        return state
    }
}
export const store = configureStore({reducer:productsReducer})
