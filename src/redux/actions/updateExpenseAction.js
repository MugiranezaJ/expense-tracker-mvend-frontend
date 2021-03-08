import Axios from './axiosConfig'

export const UPDATE_EXPENSE_PENDING = 'UPDATE_EXPENSE_PENDING'
export const UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS'
export const UPDATE_EXPENSE_ERROR = 'UPDATE_EXPENSE_ERROR'
export const CLOSE_SNACKBAR = 'SNACKBAR'


export const updateExpenseAction = ( expenseId,values) => dispatch => {
  dispatch({
    type: UPDATE_EXPENSE_PENDING
  })
  
  return Axios.put(`/expense/${expenseId}`, {toBeUpdated:values})
    .then(res => {
      dispatch({
        type: UPDATE_EXPENSE_SUCCESS,
        payload: res.data.message
      })
      }
    )
    .catch(err => {
      dispatch({
        type: UPDATE_EXPENSE_ERROR,
        error: err.response.data.error
      })
    })
}

export const closeSnackbar = () => dispatch =>{
  dispatch({
      type: CLOSE_SNACKBAR,
  });
}