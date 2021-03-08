import Axios from './axiosConfig'
import {CREATE_CATEGORY_PENDING, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR} from '../ActionTypes/Types'

export const CLOSE_SNACKBAR = 'SNACKBAR'

export const createCategoryAction = (values) => dispatch => {
  dispatch({
    type: CREATE_CATEGORY_PENDING
  })
  
  return Axios.post(`/expense/category`, values)
    .then(res => {
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: res.data.message
      })
      }
    )
    .catch(err => {
      dispatch({
        type: CREATE_CATEGORY_ERROR,
        error: err.response.data.error
      })
    })
}

export const closeCategorySnackbar = () => dispatch =>{
  dispatch({
      type: CLOSE_SNACKBAR,
  });
}