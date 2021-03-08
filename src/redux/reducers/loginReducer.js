import {USER_LOGIN, LoGIN_LOADING, CLOSE_SNACKBAR} from '../actions/loginAction';

const initialState ={
    loading: false,
    success: false,
    snackBarMessage: false,
    error: '',
}

export const loginReducer = (state = initialState, action) =>{
    switch (action.type) {
        case USER_LOGIN:
            if(action.error){
                return {
                    ...state,
                    loading: false,
                    success: false,
                    snackBarMessage: true,
                    error: action.error
                }
            }
            return {
                ...state,
                loading: false,
                success: true
            }
        case LoGIN_LOADING:
            return {
                ...state,
                loading: true,
                snackBarMessage: false
            }
        case CLOSE_SNACKBAR:
            return {
                ...state,
                snackBarMessage: false
            }
        default:
            return state;
    }

}