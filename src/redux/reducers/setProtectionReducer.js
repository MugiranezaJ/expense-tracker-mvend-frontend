import { SET_PROTECT } from "../actions/setProtectionAction"

const initialState = {
    isProtected: false
}

export function setProtectionReducer(state= initialState, action){
    switch(action.type){
        case SET_PROTECT:
            return {...state, isProtected:action.protected}
        default:
            return state;
    }
  }