import Axios from './axiosConfig'
import {CREATE_EXPENSE_PENDING, CREATE_EXPENSE_SUCCESS, CREATE_EXPENSE_ERROR} from '../ActionTypes/Types'
export const CLOSE_SNACKBAR = 'SNACKBAR'



export const createExpenseAction = (values) => dispatch => {
  dispatch({
    type: CREATE_EXPENSE_PENDING
  })
  
  return Axios.post(`/expense/`, values)
    .then(res => {
      dispatch({
        type: CREATE_EXPENSE_SUCCESS,
        payload: res.data.message
      })
      }
    )
    .catch(err => {
      dispatch({
        type: CREATE_EXPENSE_ERROR,
        error: err.response.data.error
      })
    })
}

export const closeExpenseSnackbar = () => dispatch =>{
  dispatch({
      type: CLOSE_SNACKBAR,
  });
}