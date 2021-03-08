import {CREATE_CATEGORY_PENDING, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR} from '../ActionTypes/Types'
import {CLOSE_SNACKBAR} from '../actions/createCategoryAction'

const initialState = {
  pending: false,
  error: null,
  message: null,
  snackbarMessage: false,
  snackbarError: false
}

export function createCategoryReducer(state = initialState, action){
  switch(action.type){
    case CREATE_CATEGORY_PENDING:
      return {
        ...state,
        pending: true
      }
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        pending: false,
        message: action.payload,
        snackbarMessage: true
      }
    case CREATE_CATEGORY_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
        snackbarError: true
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarError: false,
        snackbarMessage: false
      }
    default:
      return state
  } 
 

}
