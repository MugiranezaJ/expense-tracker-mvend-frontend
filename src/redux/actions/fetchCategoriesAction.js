import Axios from './axiosConfig'

export const FETCH_CATEGORY_PENDING = 'FETCH_CATEGORY_PENDING'
export const  FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS'
export const FETCH_CATEGORY_ERROR = 'FETCH_CATEGORY_ERROR'

export const getCategories = () => dispatch => {
  dispatch({
    type: FETCH_CATEGORY_PENDING
  })
  return Axios.get(`/expense/category/`)
    .then(res => {
      const data = []
      res.data.map(category => (data.push(Object.assign({}, category.category, {total_amount:category.total_amount}))))
      dispatch({
        type: FETCH_CATEGORY_SUCCESS,
        payload: data
      })
      }
    )
    .catch(err => {
      dispatch({
        type: FETCH_CATEGORY_ERROR,
        error: err
      })
    })
}