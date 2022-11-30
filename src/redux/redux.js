import { combineReducers } from 'redux'
import {configureStore} from "@reduxjs/toolkit";

const SELECTITEM ="SELECTITEM";
const LOGIN ="LOGIN";
const LOGOUT ="LOGOUT";

let initialState ={
    slectedItem:{},
    user:{
        loggedIn:false,
        userProfile:{}
    }
}
// SELECTED ITEM ACTIONS
export const selectProductAction = (payload)=>{
    return {
        type:SELECTITEM,
        payload
    }
}

// USER ACTIONS
export const loginAction =(payload)=>{
    return {
        type:LOGIN,
        payload
    }
}
export const logoutAction =(payload)=>{
    return {
        type:LOGOUT,
        payload
    }
}
const fullStateReducer =(state = initialState, action)=>{
    switch (action.type) {
        case SELECTITEM:
            return {
                ...state,
                slectedItem : action.payload
            }
        case LOGIN:
            return {
                ...state,
                user:{...state.user,
                    loggedIn:true,
                    userProfile:action.payload
                }
            }
        case LOGOUT:
            return {
                ...state,
                user:{...state.user,
                    loggedIn:false,
                    userProfile:{}
                }
            }
        default:
            return state
    }
}

export const store = configureStore({reducer:fullStateReducer})
