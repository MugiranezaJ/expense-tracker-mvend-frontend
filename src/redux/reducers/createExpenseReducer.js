import {CREATE_EXPENSE_PENDING, CREATE_EXPENSE_SUCCESS, CREATE_EXPENSE_ERROR} from '../ActionTypes/Types'
import {CLOSE_SNACKBAR} from '../actions/createExpenseAction'

const initialState = {
  pending: false,
  error: null,
  message: null,
  snackbarMessage: false,
  snackbarError: false
}

export function createExpenseReducer(state = initialState, action){
  switch(action.type){
    case CREATE_EXPENSE_PENDING:
      return {
        ...state,
        pending: true
      }
    case CREATE_EXPENSE_SUCCESS:
      return {
        ...state,
        pending: false,
        message: action.payload,
        snackbarMessage: true
      }
    case CREATE_EXPENSE_ERROR:
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
