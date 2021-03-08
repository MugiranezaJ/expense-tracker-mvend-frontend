import Axios from './axiosConfig'

export const FETCH_EXPENSE_PENDING = 'FETCH_EXPENSE_PENDING'
export const  FETCH_EXPENSE_SUCCESS = 'FETCH_EXPENSE_SUCCESS'
export const FETCH_EXPENSE_ERROR = 'FETCH_EXPENSE_ERROR'

export const getAllExpenses = () => dispatch => {
  dispatch({
    type: FETCH_EXPENSE_PENDING
  })
  return Axios.get(`/expense/`)
    .then(res => {
      dispatch({
        type: FETCH_EXPENSE_SUCCESS,
        payload: res.data.rows,
        total: res.data.count,
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