import Axios from './axiosConfig'

export const FETCH_EXPENSE_PENDING = 'FETCH_EXPENSE_PENDING'
export const  FETCH_EXPENSE_SUCCESS = 'FETCH_EXPENSE_SUCCESS'
export const FETCH_EXPENSE_ERROR = 'FETCH_EXPENSE_ERROR'
export const CLOSE_EXPENSE_MODEL = 'CLOSE_EXPENSE_MODEL'


export const getExpenses = (categoryId) => dispatch => {
  dispatch({
    type: FETCH_EXPENSE_PENDING
  })
  return Axios.get(`/expense/`, {params: {categoryId}})
    .then(res => {
      dispatch({
        type: FETCH_EXPENSE_SUCCESS,
        payload: res.data.data,
        total: res.data.total_amount,
      })
      }
    )
    .catch(err => {
      dispatch({
        type: FETCH_EXPENSE_ERROR,
        error: err
      })
    })
}

export const closeExpenseModel = () => dispatch =>{
  dispatch({
      type: CLOSE_EXPENSE_MODEL,
  });
}