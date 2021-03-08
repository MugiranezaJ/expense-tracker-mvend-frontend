import Axios from './axiosConfig'
import {DELETE_LOADING, DELETE_SUCCESS, DELETE_ERROR} from '../ActionTypes/Types'
import {DELETE_CATEGORY_LOADING, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_ERROR} from '../ActionTypes/Types'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export const deleteExpenseAction = (expenseId) => dispatch => {
    dispatch({
        type: DELETE_LOADING
    });
    return Axios.delete(`/expense/${expenseId}`)
    .then((res) => {
        dispatch({
            type: DELETE_SUCCESS,
            message: res.data.message
        })
    })
    .catch(err=>{
        if(err.message === 'Network Error'){
            dispatch({
                type: DELETE_ERROR,
                error: err.message
            })
        }
        if(err.response){
            dispatch({
                type: DELETE_ERROR,
                error: err.response.data.error
            })
        }
    });
}

export const deleteCategoryAction = (categoryId) => dispatch => {
    dispatch({
        type: DELETE_CATEGORY_LOADING
    });
    return Axios.delete(`/expense/category/${categoryId}`)
    .then((res) => {
        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            message: res.data.message
        })
    })
    .catch(err=>{
        if(err.message === 'Network Error'){
            dispatch({
                type: DELETE_CATEGORY_ERROR,
                error: err.message
            })
        }
        if(err.response){
            dispatch({
                type: DELETE_CATEGORY_ERROR,
                error: err.response.data.error
            })
        }
    });
}

export const closeSnackbar = () => dispatch =>{
    dispatch({
        type: CLOSE_SNACKBAR,
    });
}