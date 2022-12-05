import {configureStore} from "@reduxjs/toolkit";

const SELECTITEM ="SELECTITEM";
const REGISTER ="REGISTER";
const LOGIN ="LOGIN";
const LOGOUT ="LOGOUT";
const ADDTOWISHLIST ="ADDTOWISHLIST";
const REMOVEFROMWISHLIST="REMOVEFROMWISHLIST";
let initialState ={
    slectedItem:{},
    user:{
        loginToken:"",
        userProfile:{}
    },
    wishList:[]
}
// SELECTED ITEM ACTIONS
export const selectProductAction = (payload)=>{
    return {
        type:SELECTITEM,
        payload
    }
}

// USER ACTIONS
export const registerAction =(payload)=>{
    return {
        type:REGISTER,
        payload
    }
}
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
// SELECTED ITEM ACTIONS
export const addToWishlist = (payload)=>{
    return {
        type:ADDTOWISHLIST,
        payload
    }
}
export const removeFromWishList = (payload)=>{
    return {
        type:REMOVEFROMWISHLIST,
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
        case ADDTOWISHLIST:
        return {
            ...state,
            wishList : [...state.wishList,action.payload]
        }
        case REMOVEFROMWISHLIST:
            return {
            ...state,
            wishList : state.wishList.filter((item)=>(item.id !== action.payload.id))
        }
        case REGISTER:
            return {
                ...state,
                user:{...state.user,
                    loginToken:action.payload.loginToken,
                    ...state.user.userProfile,
                    userProfile:action.payload.values
                }
            }
        case LOGIN:
            return {
                ...state,
                user:{...state.user,
                    loginToken:action.payload.loginToken,
                    ...state.user.userProfile,
                    userProfile:action.payload.values
                }
            }
        case LOGOUT:
            return {
                ...state,
                user:{...state.user,
                    loginToken:"",
                    userProfile:{}
                }
            }
        default:
            return state
    }
}

export const store = configureStore({reducer:fullStateReducer})
