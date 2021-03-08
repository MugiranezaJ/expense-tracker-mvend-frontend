import {DELETE_LOADING, DELETE_SUCCESS, DELETE_ERROR} from '../ActionTypes/Types';
import {DELETE_CATEGORY_LOADING, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_ERROR} from '../ActionTypes/Types';
import {CLOSE_SNACKBAR} from '../actions/deleteAction';

const initialState ={
    loading: false,
    success: false,
    snackBarMessage: false,
    snackBarError:false,
    error: '',
    message: '',
}

const initialStateCategory = {
    loading: false,
    success: false,
    snackBarMessage: false,
    snackBarError:false,
    error: '',
    message: '',
}

export const deleteExpenseReducer = (state = initialState, action) =>{
    switch (action.type) {
        case  DELETE_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                snackBarError: true,
                snackBarMessage: false,
                error: action.error
            }
        case DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                snackBarMessage: true,
                snackBarError: false,
                message: action.message
            }
        case CLOSE_SNACKBAR:
            return {
                ...state,
                snackBarMessage: false,
                snackBarError: false
            }
        default:
            return state;
    }

}

export const deleteCategoryReducer = (state = initialStateCategory, action) =>{
    switch (action.type) {
        case DELETE_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                snackBarError: true,
                snackBarMessage: false,
                error: action.error
                }
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                snackBarError: false,
                snackBarMessage: true,
                message: action.message
            }
        case CLOSE_SNACKBAR:
            return {
                ...state,
                snackBarMessage: false,
                snackBarError: false
            }
        default:
            return state;
    }

}